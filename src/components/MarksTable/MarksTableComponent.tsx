import MarkInfoComponent from "./MarkInfo/MarkInfoComponent.tsx";
import type {IMarkInfo} from "../../interfaces/IMarkInfo.ts";
import styles from "./MarksTable.module.css";
import {useStore} from "../../store/useStore.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import MarkFormComponent from "./MarkForm/MarkFormComponent.tsx";
import {Form} from "antd";
import type {IMarkForm} from "../../interfaces/IMarkForm.ts";
import UserVisibilityPanel from "./UserVisibilityPanel/UserVisibilityPanel.tsx";

function MarksTableComponent() {

    const user: IUser | null = useStore((state) => state.user);
    const addMark = useStore((state) => state.addMarker);
    const markers: IMarkInfo[] = useStore(state => state.markers);
    const hiddenUserIds: number[] = useStore(state => state.hiddenUsersMarks);
    const visibleMarkers: IMarkInfo[] = markers.filter(
        mark => !hiddenUserIds.includes(mark.user_id)
    );
    const [addForm] = Form.useForm<IMarkForm>();

    const handleCreate = async (values: IMarkForm) => {
        try {
            if (user){
                const newMark: Omit<IMarkInfo, 'id'> = {
                    ...values,
                    color: user.color,
                    user_id: user.id
                }
                await addMark(newMark);
            }
        } catch (error){
            console.log(error);
        }
    }

    if (!user) {
        return (
            <h2>Авторизуйтесь для просмотра своих меток</h2>
        );
    }

    return (
        <section className={styles.marks}>
            <h2>Ваши метки</h2>
            {visibleMarkers.map((mark) => (
                user.id === mark.user_id ? <MarkInfoComponent key={mark.id} markInfo={mark} /> : null
            ))}
            <h2>Добавить метку</h2>
            <MarkFormComponent
                form={addForm}
                onSave={handleCreate}
            />
            <UserVisibilityPanel markers={markers} />
        </section>
    );
}

export default MarksTableComponent;