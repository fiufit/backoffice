import { RootState } from "@app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CredentialState {
    user: string,
    accessToken: string,
};

const initialState = {
    user: "",
    accessToken: "",
};

export const credential = createSlice({
    name: "credential",
    initialState,
    reducers: {
        setCredential: (state, action: PayloadAction<CredentialState>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
        },
        removeCredential: (state) => {
            state.user = "";
            state.accessToken = "";
        }
    },
});

export const { setCredential, removeCredential } = credential.actions;
export const selectCredential = (state: RootState) => { return state.credential; };
