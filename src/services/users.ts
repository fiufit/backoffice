import { fiufit } from "@services/fiufit";

export interface Pagination {
    page: number,
    page_size: number,
    total_rows: number,
}

export interface Interest {
    Name: string,
}

export interface User {
    ID: string,
    Nickname: string,
    DisplayName: string,
    IsMale: boolean,
    CreatedAt: string,
    DeleteAt: string,
    BornAt: string,
    Height: number,
    Weight: number,
    IsVerifiedTrainer: boolean,
    Followers: unknown, // no estoy seguro de este, pero supongo que será un array de user_ids
    MainLocation: string,
    Latitude: number,
    Longitude: number,
    Interests: Interest[],
    Disabled: boolean,
    PictureUrl: string,
}

export interface GetUsersResponse {
    data?: {
        pagination: Pagination,
        users: User[],
    }
}

export interface GetUserRequest {
    page?: number,
    page_size?: number,
    total_rows?: number,
    name?: string,
    nickname?: string,
    location?: string,
    is_verified?: boolean,
    user_ids?: string,
    disabled?: boolean,
}

export enum CertificateStatus {
    Approved = "approved",
    Pending = "pending",
    Denied = "denied",
}

export function toCertificateStatus(value: string): CertificateStatus {
    switch(value) {
        case CertificateStatus.Approved: return CertificateStatus.Approved;
        case CertificateStatus.Denied: return CertificateStatus.Denied;
        default: return CertificateStatus.Pending;
    }
}

export function validCertificateStatus(value: string): boolean {
  return Object.values(CertificateStatus).includes(value as CertificateStatus);
}

export function certificateIsApproved(status: CertificateStatus): boolean {
    return status == CertificateStatus.Approved;
}

export function certificateIsPending(status: CertificateStatus): boolean {
    return status == CertificateStatus.Pending;
}

export function certificateIsDenied(status: CertificateStatus): boolean {
    return status == CertificateStatus.Denied;
}

export function getStatusTranslation(status: CertificateStatus, _language: string = 'spanish') {
    switch (status) {
        case CertificateStatus.Approved: return "Aprobada";
        case CertificateStatus.Pending: return "Pendiente";
        case CertificateStatus.Denied: return "Denegada";
        default: return "Desconocido";
    }
}

export interface Certificate {
    ID: number,
    CreatedAt: Date,
    UpdatedAt: Date,
    DeletedAt: Date,
    UserID: string,
    User: User,
    Disabled: boolean,
    PictureUrl: string,
    Status: CertificateStatus,
    VideoUrl: string
}

export interface GetCertificateRequest {
    page?: number,
    page_size?: number,
    user_id?: string,
    status?: string, 
}

export interface GetCertificateResponse {
    data?: {
        page: number,
        page_size: number,
        total_rows: number,
        certifications: Certificate[],
    }
}

export interface PutUpdateCertificateStatusRequest {
    id: number,
    status: string,
}

const BASE_URL = "users";

export const users = fiufit.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<GetUsersResponse, GetUserRequest>({
            query: (queryParamsUsers) => ({
                url: BASE_URL,
                method: "GET",
                params: {...queryParamsUsers},
            }),
        }),
        getUserByID: builder.query<User, string>({
            query: (user_id) => ({
                url: `${BASE_URL}/users/${user_id}`,
                method: "GET",
            }),
        }),
        postEnableUser: builder.mutation<{ data: any }, string>({
            query: (user_id) => ({
                url: `${BASE_URL}/${user_id}/enable`,
                method: "POST",
            }),
        }),
        deleteDisableUser: builder.mutation<{ data: any }, string>({
            query: (user_id) => ({
                url: `${BASE_URL}/${user_id}/disable`,
                method: "DELETE",
            }),
        }),
        getCertificates: builder.query<GetCertificateResponse, GetCertificateRequest>({
            query: (queryParamsCertificate) => ({
                url:  `${BASE_URL}/certifications`,
                method: "GET",
                params: {...queryParamsCertificate},
            }),
        }),
        putUpdateUserCertificateStatus: builder.mutation<{ data: any }, PutUpdateCertificateStatusRequest>({
            query: (queryParamsCertificateStatus) => ({
                url: `${BASE_URL}/certifications/${queryParamsCertificateStatus.id}?status=${queryParamsCertificateStatus.status}`,
                method: "PUT",
            }),
        }),
      })
});

export const { useGetUsersQuery, useGetUserByIDQuery, usePostEnableUserMutation, useDeleteDisableUserMutation, useGetCertificatesQuery, usePutUpdateUserCertificateStatusMutation } = users;
