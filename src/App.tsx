import'./App.css'
import MapComponent from "./components/MapComponent/MapComponents.tsx";
import Header from "./components/UI/Header/Header.tsx";
import MarksTableComponent from "./components/MarksTable/MarksTableComponent.tsx";
import {useStore} from "./store/useStore.ts";
import {useEffect} from "react";
import {connectWebSocket} from "./api/websocket.ts";

function App() {

    useEffect(() => {
        useStore.getState().getMarkers();
    }, []);

    useEffect(() => {
        connectWebSocket()
    }, []);

  return (
    <>
        <Header />
        <main className="container">
            <MapComponent />
            <MarksTableComponent />
        </main>
    </>
  )
}

export default App
