import type {IMarkInfo} from "../../../interfaces/IMarkInfo.ts";
import {Button, Form, Input, InputNumber, Popconfirm, Space} from "antd";
import {useState} from "react";
import styles from "./MarkInfo.module.css";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";

function MarkInfoComponent({markInfo}: {markInfo: IMarkInfo}) {

    const [editView, setEditView] = useState<boolean>(false);
    const [form] = Form.useForm();

    const changeView = () => {
        setEditView((prevState) => {
            return !prevState
        });
    }

    const handleSave = async () => {
        try {
            const value: IMarkForm = await form.validateFields();
            console.log(value)
            setEditView(false);
            form.resetFields();
            //request
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        form.resetFields();
        setEditView(false);
    }

    const handleDelete = async () => {
        console.log(markInfo.id);
        //request
    }

    if (editView) {
        return (
            <div className={styles.markInfo}>
                <Form layout="inline" name="mark_info" form={form}>
                    <Form.Item
                        label="Долгота"
                        name="longitude"
                        rules={[
                            {required: true, message: "Не заполнили поле!"},
                            {type: "number", message: "Не тот формат!"}
                        ]}>
                        <InputNumber type="number" value={markInfo.longitude}/>
                    </Form.Item>
                    <Form.Item
                        label="Широта"
                        name="latitude"
                        rules={[
                            {required: true, message: "Не заполнили поле!"},
                            {type: "number", message: "Не тот формат!"}
                        ]}>
                        <InputNumber type="number" value={markInfo.latitude}/>
                    </Form.Item>
                    <Form.Item
                        label="Описание"
                        name="description"
                        rules={[
                            {required: true, message: "Не заполнили поле!"},
                            {type: "string", message: "Не тот формат!"}
                        ]}>
                        <Input type="text" value={markInfo.longitude}/>
                    </Form.Item>
                    <Space>
                        <Button type="primary" htmlType="button" onClick={handleSave}>Сохранить</Button>
                        <Button type="primary" htmlType="button" onClick={handleCancel}>Отменить</Button>
                    </Space>
                </Form>
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