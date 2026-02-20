import {useCallback, useEffect, useRef, useState} from "react";
import {Feature, Map, MapBrowserEvent, Overlay, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import "ol/ol.css";
import styles from './Map.module.css';
import type {IMarkInfo} from "../../interfaces/IMarkInfo.ts";
import {useStore} from "../../store/useStore.ts";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import {Point} from "ol/geom";
import {fromLonLat, toLonLat} from "ol/proj";
import {Fill, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import type {IUser} from "../../interfaces/IUser.ts";
import type {IPopupInfo} from "../../interfaces/IPopupInfo.ts";
import {Button, Form, Input} from "antd";

function MapComponent () {

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null)
    const vectorSourceRef = useRef<VectorSource | null>(null);

    const center = useStore((state) => state.center);
    const zoom = useStore((state) => state.zoom);
    const setView = useStore((state) => state.setView);

    const [popUp, setPopUp] = useState<HTMLDivElement | undefined>(undefined);
    const overlayRef = useRef<Overlay | null>(null);

    const markers: IMarkInfo[] = useStore((state) => state.markers);
    const hiddenUserIds: number[] = useStore(state => state.hiddenUsersMarks);
    const visibleMarkers: IMarkInfo[] = markers.filter(
        mark => !hiddenUserIds.includes(mark.user_id)
    );
    const addMarker = useStore((state) => state.addMarker);
    const updateMarker = useStore((state) => state.updateMarker);

    const user: IUser | null = useStore((state) => state.user);

    const [markOwner, setMarkOwner] = useState<boolean>(false);
    const [popupInfo, setPopupInfo] = useState<IPopupInfo | null>(null);
    const [isNewMarker, setIsNewMarker] = useState(false);

    const [form] = Form.useForm<IPopupInfo>();

    const refCallback = useCallback((element: HTMLDivElement) => {
        if (element) {
            setPopUp(element);
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current) return;

        const vectorSource = new VectorSource();
        const vectorLayer = new VectorLayer({
            source: vectorSource
        });
        vectorSourceRef.current = vectorSource;

        const overlay = new Overlay({
            element: popUp,
            positioning: 'bottom-center',
            stopEvent: true
        })
        overlayRef.current = overlay;

        const view = new View({
            center: fromLonLat(center),
            zoom: zoom
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: view,
            overlays: [overlay]
        });

        const handleMoveEnd = () => {
            const center = view.getCenter();
            const zoom = view.getZoom();
            if (!center || zoom === undefined) return;
            const [lon, lat] = toLonLat(center);
            setView([lon, lat], zoom);
        };

        map.on("moveend", handleMoveEnd);

        mapInstance.current = map;

        return () => {
            mapInstance.current?.setTarget(undefined);
            map.un("moveend", handleMoveEnd);
        };
    }, [popUp]);

    useEffect(() => {
        if (!vectorSourceRef.current) return;

        const vectorSource = vectorSourceRef.current;
        vectorSource.clear();
        visibleMarkers.forEach((marker) => {
            const feature = new Feature({
                geometry: new Point(
                    fromLonLat([marker.longitude, marker.latitude])
                ),
                markerId: marker.id
            });
            feature.setStyle(
                new Style({
                    image: new CircleStyle({
                        radius: 5,
                        fill: new Fill({
                            color: marker.color,
                        })
                    })
                })
            );
            vectorSource.addFeature(feature);
        })

    }, [visibleMarkers]);

    useEffect(() => {
        const map = mapInstance.current;
        const overlay = overlayRef.current;
        if (!map || !overlay) return;

        const handler = (event: MapBrowserEvent<PointerEvent>) => {
            const pixel = event.pixel;
            const feature = map.forEachFeatureAtPixel(pixel, (feature) => {
                return feature;
            });
            const coordinate = event.coordinate;
            overlay.setPosition(coordinate);
            if (feature) {
                const markerId = feature.get('markerId') as number;
                const targetMarker = markers.find(m => m.id === markerId);
                if (targetMarker) {
                    setPopupInfo({
                        id: markerId,
                        longitude: targetMarker.longitude,
                        latitude: targetMarker.latitude,
                        description: targetMarker.description,
                        owner: targetMarker.user_id,
                    })
                    if (user && user.id === targetMarker.user_id) {
                        setMarkOwner(true);
                        setIsNewMarker(false);
                    } else {
                        setMarkOwner(false);
                    }
                }
            } else {
                if (!user) return;
                const [lon, lat] = toLonLat(coordinate);
                setPopupInfo({
                    longitude: lon,
                    latitude: lat,
                    description: '',
                    owner: user.id,
                });
                setMarkOwner(true);
                setIsNewMarker(true);
            }
        };
        map.on('click' , handler);
        return () => {
            map.un('click', handler);
        };

    }, [markers, user]);

    useEffect(() => {
        if (popupInfo) {
            form.setFieldsValue(popupInfo);
        }
    }, [popupInfo, form]);

    const handleSave = () => {
        if (!user || !popupInfo) return;
        const values = form.getFieldsValue();
        addMarker({
            ...values,
            user_id: user.id,
            color: user.color
        })
    }

    const handleUpdate = () => {
        if (!user || !popupInfo?.id) return;
        const values = form.getFieldsValue();
        updateMarker({...values}, popupInfo.id)
    }

    const handleCancel = () => {
        overlayRef.current?.setPosition(undefined);
    }

    return (
        <div ref={mapRef} className={styles.map}>
            <div ref={refCallback}>
                {
                    markOwner ?
                        <Form<IPopupInfo>
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item label="Долгота" name="longitude">
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item label="Широта" name="latitude">
                                <Input type="number" />
                            </Form.Item>
                            <Form.Item label="Описание" name="description">
                                <Input/>
                            </Form.Item>
                            {
                                isNewMarker ?
                                    <Button type="primary" htmlType="button" onClick={handleSave}>
                                        Сохранить
                                    </Button>
                                :
                                    <Button type="primary" htmlType="button" onClick={handleUpdate}>
                                        Обновить
                                    </Button>
                            }
                            <Button htmlType="button" onClick={handleCancel}>
                                Отмена
                            </Button>
                        </Form>
                    :
                        <ul>
                            <li>Создатель: {popupInfo?.owner}</li>
                            <li>Долгота: {popupInfo?.longitude}</li>
                            <li>Широта: {popupInfo?.latitude}</li>
                            <li>Описание: {popupInfo?.description}</li>
                        </ul>
                }
            </div>
        </div>
    );

}

export default MapComponent;