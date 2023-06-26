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
"new_training": "user_ID"
"training_tagged": {"strength", "speed", "endurance", "lose weight", "gain weight", "sports", ""}
"user_followed": "userID",
"favorite_training": "trainingID",
"training_session_finished": "userID",



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

export function getMetrics(type: string, subtype: string = "", fromDate: string = "", to: string = ""): MetricsData[] {

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

export function getTotalMetrics(type: string, subtype: string = "", fromDate: string = "", to: string = ""): number {
    return getMetrics(type, subtype, fromDate, to).length
}

export function getMetricsDividedByDays(type: string, subtype: string = "", fromDate: string = "", to: string = ""): { date: Date, metrics: MetricsData[] }[] {

    const metrics = getMetrics(type, subtype, fromDate, to);

    let metricsDividedByDays: {date: Date, metrics: MetricsData[]}[] = [];
    let cursorDate = new Date(fromDate);
    const endDate = new Date(to);

    while (cursorDate <= endDate) {
        metricsDividedByDays.push({date: cursorDate, metrics: []});
        cursorDate = addDays(cursorDate, 1);
    }

    metrics.forEach((element: MetricsData) => {
        
        const elementDate = new Date(element.date_time);
        
        const indexMetricsCursorDay = metricsDividedByDays.findIndex(item => sameUTCDay(item.date, elementDate));

        if (indexMetricsCursorDay !== -1) {
            metricsDividedByDays[indexMetricsCursorDay].metrics.push(element);
        }

    });

    return metricsDividedByDays;

}

export function getTotalMetricsDividedByDays(type: string, subtype: string = "", fromDate: string = "", to: string = ""): { date: Date, total_metrics: number }[] {

    const metrics = getMetrics(type, subtype, fromDate, to);

    let metricsDividedByDays: {date: Date, total_metrics: number}[] = [];
    let cursorDate = new Date(fromDate);
    const endDate = new Date(to);

    while (cursorDate <= endDate) {
        metricsDividedByDays.push({date: cursorDate, total_metrics: 0});
        cursorDate = addDays(cursorDate, 1);
    }

    metrics.forEach((element: MetricsData) => {
        
        const elementDate = new Date(element.date_time);
        
        const indexMetricsCursorDay = metricsDividedByDays.findIndex(item => sameUTCDay(item.date, elementDate));

        if (indexMetricsCursorDay !== -1) {
            metricsDividedByDays[indexMetricsCursorDay].total_metrics += 1;
        }

    });

    return metricsDividedByDays;

}

export function getUsersLocations(fromDate = "", toDate = ""): { continent: string, sets: number }[] {
    
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

export function getTrainingsPerType(fromDate = "", toDate = ""): { type: string, sets: number }[] {
    
    const queryParamMetrics: GetMetricsRequest = {
        type: "training_tagged"
    };

    if (fromDate !== "") { queryParamMetrics.fromDate = fromDate; }
    if (toDate !== "") { queryParamMetrics.to = toDate; }

    const { data, isLoading, isFetching } = useGetMetricsQuery(queryParamMetrics);

    let metrics: MetricsData[] = [];
    let metrics_types: { type: string, sets: number }[] = [];

    if (data && data.data) {
        metrics = data.data!;
    }

    metrics_types.push({type: "Velocidad", sets: metrics.filter(item => item.subtype.includes('speed')).length});
    metrics_types.push({type: "Ganar peso", sets: metrics.filter(item => item.subtype.includes('gain weight')).length});
    metrics_types.push({type: "Perder peso", sets: metrics.filter(item => item.subtype.includes('lose weight')).length});
    metrics_types.push({type: "Resistencia", sets: metrics.filter(item => item.subtype.includes('endurance')).length});
    metrics_types.push({type: "Deportes", sets: metrics.filter(item => item.subtype.includes('sports')).length});
    metrics_types.push({type: "Fuerza", sets: metrics.filter(item => item.subtype.includes('strength')).length});

    return metrics_types;

}

export function getTop(type: string, subtype: string = "", fromDate: string = "", to: string = "", sizeOfTop: number = 10): Array<[string, MetricsData[]]> {

    const metrics: MetricsData[] = getMetrics(type, subtype, fromDate, to);
    let top: Array<[string, MetricsData[]]> = []; // cada subtype está asociado a la metrica
    console.log(metrics);
    metrics.forEach((metric) => {
        const index = top.findIndex((entry) => entry[0] === metric.subtype);
        if (index === -1) {
            top.push([metric.subtype, [metric]]);
        } else {
            top[index][1].push(metric);
        }
    });

    // Ordenar el array top basado en el tamaño de MetricsData
    top.sort((a, b) => {
        const sizeA = a[1].length;
        const sizeB = b[1].length;
        return sizeB - sizeA; // Orden descendente (de mayor a menor)
    });

    // Rellenar con elementos vacíos si sizeOfTop es mayor que el tamaño del array
    while (top.length < sizeOfTop) {
        top.push(["", []]);
    }

    //corta el top en el número del size en caso de que sean más la cantidad de elementos
    return top.slice(0, sizeOfTop);

}