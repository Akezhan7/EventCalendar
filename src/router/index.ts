import React from "react";
import Login from "../pages/Login";
import Event from "../pages/Event";

export interface IRoute {
    path: string;
    element: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
    {path: '/login', element: Login}
]

export const privateRoutes: IRoute[] = [
    {path: '/', element: Event}
]