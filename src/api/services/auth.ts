import type {IAuth} from "../../interfaces/IAuth.ts";
import type {IUser} from "../../interfaces/IUser.ts";
import {api} from "../api.ts";

export const authApi = {
    login: async (userData: IAuth): Promise<IUser> => {
        const response = await api.post<IUser>('/login', userData);
        return response.data;
    }
}