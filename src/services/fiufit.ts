import { BaseQueryApi, 
         FetchArgs,
         createApi,
         fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@app/store";
import { StatusCodes } from "http-status-codes";
import { Credential, removeCredential, setCredential } from "@state/credential";

const FIUFIT_BASE_URL = "https://fiufit-gateway.fly.dev/v1";
const REFRESH_ENDPOINT = "/session/refresh"; // TODO: fix path

const baseQuery = fetchBaseQuery({
    baseUrl: FIUFIT_BASE_URL,
    prepareHeaders: (headers, api) => {
        const state = api.getState() as RootState;
        const { accessToken } = state.credential;
        
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
    // credentials: "include",
    // mode: "cors",
});

const baseRequestWrapper = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    let baseResponse = await baseQuery(args, api, extraOptions);

    if (baseResponse.error?.status === StatusCodes.UNAUTHORIZED) {
        const sessionQuery: FetchArgs = {
            url: REFRESH_ENDPOINT,
            method: "POST",
            body: {
                refreshToken: "REFRESH_TOKEN",
            },
        } 

        const sessionResponse = await baseQuery(sessionQuery, api, extraOptions);
        const data = sessionResponse.data as Credential;
        if (data) {
            const state = api.getState() as RootState;
            const { user } = state.credential;
            api.dispatch(setCredential({ user, accessToken: data.accessToken }));
            baseResponse = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(removeCredential());
        }
    }
    return baseResponse;
}

export const fiufit = createApi({
    baseQuery: baseRequestWrapper,
    endpoints: (builder) => ({}),  
});
