import React from "react";
import { AuthStore } from "./store/auth.store";
import { EventStore } from "./store/event.store";

interface IStoreContext {
    authStore: AuthStore;
    eventStore: EventStore;
}

const authStore = new AuthStore ();
const eventStore = new EventStore ();

export const StoreContext = React.createContext<IStoreContext> ({
    authStore,
    eventStore
})