import type {StateCreator} from "zustand";
import type {IMarkerSlice} from "./IMarkerSlice.ts";
import {marksApi} from "../../../api/services/marks.ts";
import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";

export const createMarkerSlice: StateCreator<IMarkerSlice> = (set, get) => {
    return ({
        markers: [],
        error: null,
        getMarkers: async () => {
            set({error: null});
            try {
                const data = await marksApi.getMarks()
                set({markers: data})
            } catch (error) {
                set({error: "Ошибка получения марок"});
                throw error;
            }
        },
        addMarker: async (mark: Omit<IMarkInfo, 'id'>) => {
            set({error: null});
            try {
                await marksApi.addMark(mark);
                get().getMarkers();
            } catch (error) {
                set({error: "Ошибка добавления"});
                throw error;
            }
        },
        updateMarker: async (fields: IMarkForm, id: number) => {
            set({error: null});
            try {
                await marksApi.updateMark(fields, id);
                get().getMarkers();
            } catch (error) {
                set({error: 'Ошибка обновления'});
                throw error;
            }
        },
        removeMarker: async (id: number) => {
            set({error: null});
            try {
                await marksApi.deleteMark(id);
                get().getMarkers();
            } catch (error) {
                set({error: "Ошибка удаления"});
                throw error;
            }
        }
    });
}