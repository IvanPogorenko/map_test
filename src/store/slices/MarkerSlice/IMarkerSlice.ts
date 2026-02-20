import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";

export interface IMarkerSlice {
    markers: IMarkInfo[],
    hiddenUsersMarks: number[],
    error: string | null,
    loading: boolean,
    getMarkers: () => void,
    addMarker: (mark: Omit<IMarkInfo, 'id'>) => void,
    updateMarker: (fields: IMarkForm, id: number) => void,
    removeMarker: (id: number) => void,
    toggleUser: (user_id: number) => void;
    getUniqueUserIds: () => number[];
}