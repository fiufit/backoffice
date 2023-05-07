import { fiufit } from "@services/fiufit";

const TRAININGS_ENDPOINT = "/trainings";

export const trainingsApi = fiufit.injectEndpoints({
    endpoints: (builder) => ({
        getTrainings: builder.query({
            query: (request) => ({
                url: TRAININGS_ENDPOINT,
                method: "GET",
                params: request.params,
            }),
        }),
    })
});

export const { useGetTrainingsQuery } = trainingsApi;