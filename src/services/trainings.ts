import { fiufit } from "@services/fiufit";

const TRAININGS_ENDPOINT = "/trainings";

export const trainingsApi = fiufit.injectEndpoints({
    endpoints: (builder: { query: (arg0: { query: (request: any) => { url: string; method: string; params: any; }; }) => any; }) => ({
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