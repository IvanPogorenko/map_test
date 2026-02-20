import type {IMarkerSlice} from "./slices/MarkerSlice/IMarkerSlice.ts";
import type {IUserSlice} from "./slices/UserSlice/IUserSlice.ts";
import {create} from "zustand";
import {createMarkerSlice} from "./slices/MarkerSlice/MarkerSlice.ts";
import {createUserSlice} from "./slices/UserSlice/UserSlice.ts";


type StoreState = IMarkerSlice & IUserSlice;

export const useStore = create<StoreState>()((...args) => ({
    ...createMarkerSlice(...args),
    ...createUserSlice(...args),
}));