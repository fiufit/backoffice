import { configureStore } from "@reduxjs/toolkit";
import { fiufit } from "@services/fiufit";
import { credential } from "@state/credential";

export const store = configureStore({
    reducer: {
        credential: credential.reducer,
        [fiufit.reducerPath]: fiufit.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fiufit.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
