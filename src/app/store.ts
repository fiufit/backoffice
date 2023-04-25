import { configureStore } from "@reduxjs/toolkit";
import { fiufit } from "@services/fiufit";
import { createAdminModal } from "@state/createAdminModal";
import { credential } from "@state/credential";

export const store = configureStore({
    reducer: {
        credential: credential.reducer,
        createAdminModal: createAdminModal.reducer,
        [fiufit.reducerPath]: fiufit.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fiufit.middleware)
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
