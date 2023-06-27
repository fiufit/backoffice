import { fiufit } from "@services/fiufit";

export interface Pagination {
    page: number,
    page_size: number,
    total_rows: number,
}

export interface User {
    ID: string,
    DisplayName: string,
    Nickname: string,
    Height: number,
    Weight: number,
    Interests: unknown,
    MainLocation: string,
    IsMale: boolean,
    IsVerifiedTrainer: boolean,
    BornAt: string,
    CreatedAt: string,
    DeleteAt: string,
    PictureUrl: string,
    Disabled: boolean,
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
        })
      })
});

export const { useGetUsersQuery, useGetUserByIDQuery, usePostEnableUserMutation, useDeleteDisableUserMutation } = users;
