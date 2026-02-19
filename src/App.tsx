import'./App.css'
import MapComponent from "./components/MapComponent/MapComponents.tsx";
import Header from "./components/UI/Header/Header.tsx";
import MarksTableComponent from "./components/MarksTable/MarksTableComponent.tsx";

function App() {

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
