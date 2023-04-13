import { RootState } from "@app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
 
interface TokenPayload {
    isAdmin?: boolean,
}

export interface Credential {
    user: string,
    accessToken: string,
    detail?: TokenPayload, 
};

const initialState = {
    user: "",
    accessToken: "",
    detail: { isAdmin: false },
};

export const credential = createSlice({
    name: "credential",
    initialState,
    reducers: {
        setCredential: (state, action: PayloadAction<Omit<Credential, "detail">>) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            const jwt_decoded = jwt_decode(accessToken) as any;
            state.detail = { 
                isAdmin: jwt_decoded["is_admin"], 
            };
        },
        removeCredential: () => {
            return initialState;
        }
    },
});

export const { setCredential, removeCredential } = credential.actions;
export const selectCredential = (state: RootState) => { return state.credential; };
