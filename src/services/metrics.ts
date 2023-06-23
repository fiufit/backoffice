import { fiufit } from "@services/fiufit";
import { addDays, sameUTCDay } from "@utils/dates";

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

    type?: string,
    subtype?: string,
    fromDate?: string,
    to?: string,

}

const METRICS_ENDPOINT = "/metrics";

export const metricsApi = fiufit.injectEndpoints({
    endpoints: (builder) => ({
        getMetrics: builder.query<GetMetricsResponse, GetMetricsRequest>({
            query: (queryParamsMetrics) => ({
                url: METRICS_ENDPOINT,
                method: "GET",
                params: {...queryParamsMetrics},
            }),
        })
    })
});

export const { useGetMetricsQuery} = metricsApi;

export function getUsers(type: string, subtype: string = "", fromDate: string = "", to: string = ""): MetricsData[] {

    const queryParamMetrics: GetMetricsRequest = {

        type: type,

    };
    
    if (subtype !== "") {
        queryParamMetrics.subtype = subtype;
    }

    if (fromDate !== "") {
        queryParamMetrics.fromDate = fromDate;
    }

    if (to !== "") {
        queryParamMetrics.to = to;
    }

    const { data, isLoading, isFetching } = useGetMetricsQuery(queryParamMetrics);
    let metrics: MetricsData[] = [];

    if (data && data.data) {
        metrics = data.data!;
    }

    return metrics;

}

export function getUsersDividedByDays(type: string, subtype: string = "", fromDate: string = "", to: string = ""): { date: Date, metrics: MetricsData[] }[] {

    const users = getUsers(type, subtype, fromDate, to);

    let metricsDividedByDays: {date: Date, metrics: MetricsData[]}[] = [];
    let cursorDate = new Date(fromDate);
    const endDate = new Date(to);

    while (cursorDate <= endDate) {
        metricsDividedByDays.push({date: cursorDate, metrics: []});
        cursorDate = addDays(cursorDate, 1);
    }

    users.forEach((element: MetricsData) => {
        
        const elementDate = new Date(element.date_time);
        
        const indexMetricsCursorDay = metricsDividedByDays.findIndex(item => sameUTCDay(item.date, elementDate));

        if (indexMetricsCursorDay !== -1) {
            metricsDividedByDays[indexMetricsCursorDay].metrics.push(element);
        }

    });

    return metricsDividedByDays;

}

export function getTotalUsersDividedByDays(type: string, subtype: string = "", fromDate: string = "", to: string = ""): { date: Date, total_users: number }[] {

    const users = getUsers(type, subtype, fromDate, to);

    let metricsDividedByDays: {date: Date, total_users: number}[] = [];
    let cursorDate = new Date(fromDate);
    const endDate = new Date(to);

    while (cursorDate <= endDate) {
        metricsDividedByDays.push({date: cursorDate, total_users: 0});
        cursorDate = addDays(cursorDate, 1);
    }

    users.forEach((element: MetricsData) => {
        
        const elementDate = new Date(element.date_time);
        
        const indexMetricsCursorDay = metricsDividedByDays.findIndex(item => sameUTCDay(item.date, elementDate));

        if (indexMetricsCursorDay !== -1) {
            metricsDividedByDays[indexMetricsCursorDay].total_users += 1;
        }

    });

    return metricsDividedByDays;

}

export function getTotalUsers(type: string, subtype: string = "", fromDate: string = "", to: string = ""): number {

    const queryParamMetrics: GetMetricsRequest = {

        type: type,

    };
    
    if (subtype !== "") {
        queryParamMetrics.subtype = subtype;
    }

    if (fromDate !== "") {
        queryParamMetrics.fromDate = fromDate;
    }

    if (to !== "") {
        queryParamMetrics.to = to;
    }

    const { data, isLoading, isFetching } = useGetMetricsQuery(queryParamMetrics);
    let metrics: MetricsData[] = [];

    if (data && data.data) {
        metrics = data.data!;
    }

    return metrics.length;

}

export function getLocations(fromDate = "", toDate = ""): { continent: string, sets: number }[] {
    
    const queryParamMetrics: GetMetricsRequest = {
        type: "location"
    };

    if (fromDate !== "") { queryParamMetrics.fromDate = fromDate; }
    if (toDate !== "") { queryParamMetrics.to = toDate; }

    const { data, isLoading, isFetching } = useGetMetricsQuery(queryParamMetrics);

    let metrics: MetricsData[] = [];
    let locations: { continent: string, sets: number }[] = [];

    if (data && data.data) {
        metrics = data.data!;
    }

    locations.push({continent: "Latinoamérica", sets: metrics.filter(item => item.subtype.includes('South America')).length}); // faltaria agregar centro america en caso de que exista ese filter
    locations.push({continent: "Asia", sets: metrics.filter(item => item.subtype.includes('Asia')).length});
    locations.push({continent: "África", sets: metrics.filter(item => item.subtype.includes('Africa')).length});
    locations.push({continent: "América del Norte", sets: metrics.filter(item => item.subtype.includes('North America')).length});
    locations.push({continent: "Europa", sets: metrics.filter(item => item.subtype.includes('Europe')).length});
    locations.push({continent: "Oceanía", sets: metrics.filter(item => item.subtype.includes('Oceania')).length});

    return locations;

}