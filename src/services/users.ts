import { fiufit } from "@services/fiufit";

export interface Pagination {
    page: number,
    page_size: number,
    total_rows: number,
}

export interface User {
    ID: string,
    DisplayName: String,
    Nickname: string,
    Height: number,
    Weight: number,
    Interests: unknown,
    MainLocation: string,
    IsMale: boolean,
    IsVerifiedTrainer: boolean,
    BornAt: string,
    CreatedAt: String,
    DeleteAt: String,
}

interface GetUsersResponse {
    data?: {
        pagination: Pagination,
        users: User[],
    }
}

interface GetUserRequest {
    page?: number,
    page_size?: number,
    total_rows?: number,
    name?: string,
    nickname?: string,
    location?: string,
    is_verified?: boolean,
}

const BASE_URL = "users";
export const users = fiufit.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<GetUsersResponse, GetUserRequest>({
            query: (params) => {
                let queryParamList = [];
                for (const param in params) {
                    queryParamList.push(`${param}=${params[param as keyof GetUserRequest]}`);
                }
                const e = queryParamList.join('&');
                return `${BASE_URL}?${e}`;
            }
        })
      })
});

export const { useGetUsersQuery } = users;
