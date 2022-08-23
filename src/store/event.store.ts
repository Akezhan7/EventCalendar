import { makeAutoObservable } from "mobx";
import UserService from "../api/UserService";
import IEvents from "../interfaces/event.interface";
import IUser from "../interfaces/user.interface";

export class EventStore {
    
    events = [] as IEvents[];
    guests = [] as IUser[];

    constructor () {
        makeAutoObservable (this);
    }

    fetchGuests = async () => {
        try {
            const response = await UserService.getUsers ();
            this.guests = response.data;
        } catch (e) {
            console.log (e)
        }
    }

    createEvent = async (event: IEvents) => {
        try {
            const allEvents = localStorage.getItem ('events') || '[]';
            const json = JSON.parse(allEvents) as IEvents[];
            json.push (event);
            this.events = json;
            localStorage.setItem ('events', JSON.stringify(json))
        } catch (e) {
            console.log (e);
        }
    }

    fetchEvents = async (username: string) => {
        try {
            const allEvents = localStorage.getItem ('events') || '[]';
            const json = JSON.parse(allEvents) as IEvents[];
            const currentUserEvents = json.filter (ev => ev.author === username || ev.guest === username);
            this.events = currentUserEvents;
        } catch (e) {
            console.log (e);
        }
    }

}