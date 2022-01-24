import React from "react";

import { NavigationContainer } from '@react-navigation/native'
import { UserStackRoutes } from "./user.stack.router";
import { UserTabeRoutes } from './user.tab.router'
//importar a rota de usuario


export function Routes() {
    return (
        <NavigationContainer>
            <UserStackRoutes />
        </NavigationContainer>
    )
}