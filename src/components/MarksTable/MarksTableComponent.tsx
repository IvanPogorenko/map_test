import MarkInfoComponent from "./MarkInfo/MarkInfoComponent.tsx";
import type {IMarkInfo} from "../../interfaces/IMarkInfo.ts";
import styles from "./MarksTable.module.css";

function MarksTableComponent() {

    const mockMarks: IMarkInfo[] = [
        {
            id: 1,
            color: "purple",
            longitude: 12.1213,
            latitude: 12.2134,
            description: "Описание описание описание описание"
        },
        {
            id: 2,
            color: "purple",
            longitude: 10.1213,
            latitude: 10.2134,
            description: "Описание описание описание описание"
        }
    ]

    return (
        <section className={styles.marks}>
            <h2>Ваши метки</h2>
            {mockMarks.map((mark) => (
                <MarkInfoComponent key={mark.id} markInfo={mark} />
            ))}
        </section>
    );
}

export default MarksTableComponent;