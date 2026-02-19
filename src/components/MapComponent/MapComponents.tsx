import {useEffect, useRef} from "react";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import "ol/ol.css";
import styles from './Map.module.css';

function MapComponent () {

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<Map | null>(null)

    useEffect(() => {
        if (!mapRef.current) return;
        mapInstance.current = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 0
            })
        });
        return () => {
            mapInstance.current?.setTarget(undefined);
        };
    }, []);

    return (
        <div ref={mapRef} className={styles.map}></div>
    );

}

export default MapComponent;