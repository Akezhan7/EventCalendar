import axios, { AxiosResponse } from "axios";
import IUser from "../interfaces/user.interface";

export default class UserService {
    static async getUsers ():Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]> ('./users.json');
    }
}