import { fiufit } from "@services/fiufit";

const REGISTER_ENDPOINT = "/admin/register";

export const registration = fiufit.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (request) => ({
                url: REGISTER_ENDPOINT,
                method: "POST",
                body: request.body,
            }),
        }),
    })
});

export const { useRegistrationMutation } = registration;
