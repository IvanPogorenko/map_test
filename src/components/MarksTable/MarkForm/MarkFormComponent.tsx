import {Button, Form, Input, InputNumber, Space} from "antd";
import type {MarkFormProps} from "./MarkFormProps.ts";
import {useEffect} from "react";

function MarkFormComponent ({form, onSave, onCancel, initialValue}: MarkFormProps){

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSave(values);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        form.resetFields();
        if (onCancel) {
            onCancel();
        }
    }
    
    useEffect(() => {
        if (initialValue){
            form.setFieldsValue(initialValue);
        }
    }, [form, initialValue])

    return (
        <Form layout="inline" form={form}>
            <Form.Item
                label="Долгота"
                name="longitude"
                rules={[
                    {required: true, message: "Не заполнили поле!"},
                    {type: "number", message: "Не тот формат!"}
                ]}>
                <InputNumber type="number"/>
            </Form.Item>
            <Form.Item
                label="Широта"
                name="latitude"
                rules={[
                    {required: true, message: "Не заполнили поле!"},
                    {type: "number", message: "Не тот формат!"}
                ]}>
                <InputNumber type="number"/>
            </Form.Item>
            <Form.Item
                label="Описание"
                name="description"
                rules={[
                    {required: true, message: "Не заполнили поле!"},
                    {type: "string", message: "Не тот формат!"}
                ]}>
                <Input type="text"/>
            </Form.Item>
            <Space>
                <Button type="primary" htmlType="button" onClick={handleSubmit}>Сохранить</Button>
                <Button type="primary" htmlType="button" onClick={handleCancel}>Отменить</Button>
            </Space>
        </Form>
    );

}

export default MarkFormComponent;