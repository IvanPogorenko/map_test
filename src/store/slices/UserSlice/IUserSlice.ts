import type {IUser} from "../../../interfaces/IUser.ts";
import type {IAuth} from "../../../interfaces/IAuth.ts";

export interface IUserSlice {
    user: IUser | null;
    error: string | null;
    login: (user: IAuth) => void;
}