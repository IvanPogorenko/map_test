export type WSMessage =
    | WSMarkerCreated
    | WSMarkerUpdated
    | WSMarkerDeleted;

export interface WSMarkerCreated {
    type: "marker_created";
}

export interface WSMarkerUpdated {
    type: "marker_updated";
    id: number;
}

export interface WSMarkerDeleted {
    type: "marker_deleted";
    id: number;
}