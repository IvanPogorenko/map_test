import type {StateCreator} from "zustand";
import type {IMapSlice} from "./IMapSlice.ts";

export const createMapSlice: StateCreator<IMapSlice> = (set) => ({
    center: [0, 0],
    zoom: 0,
    setView: (center, zoom) => {
        set({center, zoom});
    },
})