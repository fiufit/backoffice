import { fiufit } from "@services/fiufit";

/* 

Params:

type: string
subtype: string
fromDate: string
to: string



type: subtype

"register": {"mail", "federated_entity", ""}
"login": {"mail", "federated_entity", ""}
"blocked": {clearSubtype}
"password_recover": {clearSubtype}
"location": {anySubtype}
"new_training": {clearSubtype}
"training_tagged": {"strength", "speed", "endurance", "lose weight", "gain weight", "sports", ""}



"": devuelve todos los resultados (no indicar subtype)
anySubtype: "any"
clearSubtype: ""

*/

export interface MetricsData {
    type: string,
    subtype: string,
    date_time: string
}

export interface GetMetricsResponse {
    data?: MetricsData[]
}

export interface GetMetricsRequest {
    params: {
        type?: string,
        subtype?: string,
        fromDate?: string,
        to?: string,
    }
}

const METRICS_ENDPOINT = "/metrics";

export const metricsApi = fiufit.injectEndpoints({
    endpoints: (builder) => ({
        getMetrics: builder.query<GetMetricsResponse, GetMetricsRequest>({
            query: (request) => ({
                url: METRICS_ENDPOINT,
                method: "GET",
                params: request,
            }),
        })
    })
});

export const { useGetMetricsQuery} = metricsApi;

export function getTotalUsers(type: string, subtype: string = "", fromDate: string = "", to: string = ""): number {

    const request: GetMetricsRequest = {
        params: {
            type: type,
        },
    };

    if (subtype !== "") {
        request.params.subtype = subtype;
    }

    if (fromDate !== "") {
        request.params.fromDate = fromDate;
    }

    if (to !== "") {
        request.params.to = to;
    }

    const { data, isLoading, isFetching } = useGetMetricsQuery(request);
    let metrics: MetricsData[] = [];

    if (data && data.data) {
        metrics = data.data!;
    }

    return metrics.length;

}