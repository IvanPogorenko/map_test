import styles from "./Header.module.css"
import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import type {IAuth} from "../../../interfaces/IAuth.ts";

function Header() {

    const [user, setUser] = useState<null | string>(null)
    const [open, setOpen] = useState<boolean>(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
    }

    const handleOk = async () => {
        try {
            const values: IAuth = await form.validateFields()
            console.log(values)
            setUser(values.email)
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    }

    return (
        <header className={styles.header}>
            {!user
                ? <Button type={"primary"} onClick={showModal}>Авторизоваться</Button>
                : <span className={styles.header__greetings}>Добро пожаловать, {user}</span>
            }
            <Modal
                title='Авторизация'
                open={open}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="auth_form"
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {required: true, message: "Введите email"},
                            {type: 'email', message: "Неккоректный формат email"}
                        ]}>
                        <Input placeholder="Email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {required: true, message: "Введите пароль"},
                            {min: 6, message: "Минимум 6 символов"}
                        ]}>
                        <Input.Password placeholder="Password"/>
                    </Form.Item>
                </Form>
            </Modal>
        </header>
    );

}

export default Header;