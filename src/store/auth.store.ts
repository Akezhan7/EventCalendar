import {makeAutoObservable} from 'mobx'
import IUser from '../interfaces/user.interface';
import axios from 'axios';
import UserService from '../api/UserService';

export class AuthStore {

    constructor () {
        makeAutoObservable (this);
    }

    auth = false;
    error = '';
    isLoading = false;
    user = {} as IUser;
    
    isAuth () {
        return this.auth
    }
    

    login = async (username: string, password: string) => {
        try {
            this.isLoading = true;
                setTimeout ( async () => {
                    const response = await UserService.getUsers ();
                    const mockUser = response.data.find (user => user.username === username && user.password === password);
                    if (mockUser) {
                        localStorage.setItem ('auth', 'true');
                        localStorage.setItem ('username', mockUser.username);
                        this.user = mockUser;
                        this.auth = true;
                    } else {
                        this.error = 'Неккоретный логин или пароль';
                        // console.log (this.error);
                    }
                    this.isLoading = false
                }, 1000)

        } catch (e) {
            this.error = 'Произошла ошибка при входе';
        }
    }



    logout () {
        localStorage.removeItem ('auth');
        localStorage.removeItem ('username');
        this.user = {} as IUser;
        this.auth = false;
    }
}