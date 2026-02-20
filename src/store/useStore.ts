import type {IMarkerSlice} from "./slices/MarkerSlice/IMarkerSlice.ts";
import type {IUserSlice} from "./slices/UserSlice/IUserSlice.ts";
import {create} from "zustand";
import {createMarkerSlice} from "./slices/MarkerSlice/MarkerSlice.ts";
import {createUserSlice} from "./slices/UserSlice/UserSlice.ts";
import type {IMapSlice} from "./slices/MapSlice/IMapSlice.ts";
import {createMapSlice} from "./slices/MapSlice/MapSlice.ts";
import {persist} from "zustand/middleware";


type StoreState = IMarkerSlice & IUserSlice & IMapSlice;

export const useStore = create<StoreState>()(
    persist(
        (...args) => ({
            ...createMarkerSlice(...args),
            ...createUserSlice(...args),
            ...createMapSlice(...args),
        }),
        {
            name: "app-storage",
            partialize: (state) => ({
                center: state.center,
                zoom: state.zoom,
            })
        }
    )
);