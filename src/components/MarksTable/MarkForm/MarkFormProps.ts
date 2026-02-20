import type {FormInstance} from "antd";
import type {IMarkForm} from "../../../interfaces/IMarkForm.ts";

export interface MarkFormProps {
    form: FormInstance<IMarkForm>,
    onSave: (value: IMarkForm) => void,
    onCancel?: () => void,
    initialValue?: IMarkForm,
}