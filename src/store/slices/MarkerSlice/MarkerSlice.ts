import type {StateCreator} from "zustand";
import type {IMarkerSlice} from "./IMarkerSlice.ts";
import {marksApi} from "../../../api/services/marks.ts";
import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";
import {sendMessage} from "../../../api/websocket.ts";

export const createMarkerSlice: StateCreator<IMarkerSlice> = (set, get) => {
    return ({
        markers: [],
        hiddenUsersMarks: [],
        error: null,
        loading: false,
        getMarkers: async () => {
            if (get().loading) return;
            set({error: null, loading: true});
            try {
                const data = await marksApi.getMarks()
                set({markers: data})
            } catch (error) {
                set({error: "Ошибка получения марок"});
                throw error;
            } finally {
                set({loading: false});
            }
        },
        addMarker: async (mark: Omit<IMarkInfo, 'id'>) => {
            set({error: null});
            try {
                await marksApi.addMark(mark);
                sendMessage({
                    type: "marker_created"
                })
                await get().getMarkers();
            } catch (error) {
                set({error: "Ошибка добавления"});
                throw error;
            }
        },
        updateMarker: async (fields: IMarkForm, id: number) => {
            set({error: null});
            try {
                await marksApi.updateMark(fields, id);
                sendMessage({
                    type: "marker_updated",
                    id: id,
                })
                await get().getMarkers();
            } catch (error) {
                set({error: 'Ошибка обновления'});
                throw error;
            }
        },
        removeMarker: async (id: number) => {
            set({error: null});
            try {
                await marksApi.deleteMark(id);
                sendMessage({
                    type: "marker_deleted",
                    id: id
                })
                await get().getMarkers();
            } catch (error) {
                set({error: "Ошибка удаления"});
                throw error;
            }
        },
        toggleUser: (userId: number) => {
            const hidden = get().hiddenUsersMarks;
            const isHidden = hidden.includes(userId);
            set({
                hiddenUsersMarks: isHidden ?
                    hidden.filter(id => id !== userId) :
                    [...hidden, userId]
            });
        },
        getUniqueUserIds: () => {
            const markers = get().markers;
            return [...new Set(markers.map(m => m.user_id))];
        },
    });
}