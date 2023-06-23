import { fiufit } from "@services/fiufit";

const TRAININGS_ENDPOINT = "/trainings";

export const trainingsApi = fiufit.injectEndpoints({
    endpoints: (builder: {
        mutation<T, U>(arg0: { query: (training_id: any) => { url: string; method: string; }; }): any; query: (arg0: { query: (request: any) => { url: string; method: string; params: any; }; }) => any; 
}) => ({
        getTrainings: builder.query({
            query: (request) => ({
                url: TRAININGS_ENDPOINT,
                method: "GET",
                params: request.params,
            }),
        }),
        postEnableTraining: builder.mutation<{ data: any }, string>({
            query: (training_id) => ({
                url: `${TRAININGS_ENDPOINT}/${training_id}/enable`,
                method: "POST",
            }),
        }),
        deleteDisableTraining: builder.mutation<{ data: any }, string>({
            query: (training_id) => ({
                url: `${TRAININGS_ENDPOINT}/${training_id}/disable`,
                method: "DELETE",
            }),
        })
    })
});

export const { useGetTrainingsQuery, usePostEnableTrainingMutation, useDeleteDisableTrainingMutation } = trainingsApi;