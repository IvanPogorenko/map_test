import type {StateCreator} from "zustand";
import type {IUserSlice} from "./IUserSlice.ts";
import {authApi} from "../../../api/services/auth.ts";

export const createUserSlice: StateCreator<IUserSlice> = (set) => ({
    user: null,
    error: null,
    login: async (user) => {
        set({error: null});
        try {
            const userData = await authApi.login(user);
            set({user: userData});
        } catch (error) {
            set({error: "Ошибка авторизации!"});
            throw error;
        }
    }
})