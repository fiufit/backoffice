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
            query: (request) => {
                let url = BASE_URL;
                let queryParamList = [];
                for (const queryParam in request) {
                    queryParamList.push(`${queryParam}=${request[queryParam as keyof GetUserRequest]}`);
                }
                if (queryParamList.length > 0) url += `?${queryParamList.join('&')}`;                
                return url;
            }
        })
      })
});

export const { useGetUsersQuery } = users;
