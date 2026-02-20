export interface IMapSlice {
    center: [number, number];
    zoom: number;
    setView: (center: [number, number], zoom: number) => void;
}