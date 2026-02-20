import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";
import {Button, Form, Popconfirm, Space} from "antd";
import {useState} from "react";
import styles from "./MarkInfo.module.css";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";
import {useStore} from "../../../store/useStore.ts";
import MarkFormComponent from "../MarkForm/MarkFormComponent.tsx";

function MarkInfoComponent({markInfo}: {markInfo: IMarkInfo}) {

    const deleteMark = useStore((state) => state.removeMarker);
    const updateMarker = useStore((state) => state.updateMarker);

    const [editView, setEditView] = useState<boolean>(false);
    const [editForm] = Form.useForm<IMarkForm>();

    const changeView = () => {
        setEditView((prevState) => {
            return !prevState
        });
    }

    const handleUpdate = async (value: IMarkForm) => {
        try {
            await updateMarker(value, markInfo.id);
            setEditView(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        setEditView(false);
    }

    const handleDelete= async () => {
        try {
            await deleteMark(markInfo.id);
        } catch (error) {
            console.log(error);
        }
    }

    if (editView) {
        return (
            <div className={styles.markInfo}>
                <MarkFormComponent
                    key={markInfo.id}
                    form={editForm}
                    onCancel={handleCancel}
                    onSave={handleUpdate}
                    initialValue={{
                        longitude: markInfo.longitude,
                        latitude: markInfo.latitude,
                        description: markInfo.description,
                    }}
                />
            </div>
        );
    }

    return (
        <div className={styles.markInfo}>
            <div className={styles.markInfo__option}>Долгота: {markInfo.longitude}</div>
            <div className={styles.markInfo__option}>Широта: {markInfo.latitude}</div>
            <div className={styles.markInfo__option}>Описание: {markInfo.description}</div>
            <div>
                <Space>
                    <Button type="link" onClick={changeView}>Редактировать</Button>
                    <Popconfirm
                        title="Подтвердите удаление записи"
                        onConfirm={handleDelete}
                        okText="Да"
                        cancelText="Отмена"
                    >
                        <Button type="link" danger>Удалить</Button>
                    </Popconfirm>
                </Space>
            </div>
        </div>

    );
}

export default MarkInfoComponent;