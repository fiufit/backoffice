import { RootState } from "@app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    admin: {
        email: "",
        password: "",
    },
    show: false,
};

export const createAdminModal = createSlice({
    name: "createAdminModal",
    initialState,
    reducers: {
        open: (state) => {
            return { ...state, show: true };
        },
        close: (state) => {
            return { ...state, show: false };
        },
    },
});

export const { open, close } = createAdminModal.actions;
export const selectCreateAdminModal = (state: RootState) => { return state.createAdminModal; };
