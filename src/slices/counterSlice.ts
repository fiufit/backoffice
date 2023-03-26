import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@app/store";

interface CounterState {
    count: number
};

const initialState: CounterState = {
    count: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            ++state.count
        },
        decrement: (state) => {
            --state.count
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload
        }
    }
});

export const selectCount = (state: RootState) => { return state.counter.count };
