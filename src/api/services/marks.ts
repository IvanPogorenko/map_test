import type {IMarkInfo} from "../../interfaces/IMarkInfo.ts";
import {api} from "../api.ts";
import type {IMarkForm} from "../../interfaces/IMarkForm.ts";

export const marksApi = {
    getMarks: async(): Promise<IMarkInfo[]> => {
        const response = await api.get<IMarkInfo[]>("/markers");
        return response.data;
    },
    addMark: async(marker: Omit<IMarkInfo, 'id'>): Promise<void> => {
        return await api.post("/create-marker", {marker});
    },
    deleteMark: async(id: number): Promise<void> => {
        return await api.delete(`/marker/${id}`);
    },
    updateMark: async(fields: IMarkForm, id: number): Promise<void> => {
        return await api.patch(`/marker/${id}`, {fields});
    },
}