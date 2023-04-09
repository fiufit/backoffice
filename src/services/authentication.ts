import { fiufit } from "@services/fiufit";

const SIGNIN_ENDPOINT = "/session";

export const authentication = fiufit.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (request) => ({
                url: SIGNIN_ENDPOINT,
                method: "POST",
                body: request.body,
            }),
        }),
    })
});

export const { useSigninMutation } = authentication;
