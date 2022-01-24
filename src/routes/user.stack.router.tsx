import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { CharactersDetail } from "../screens/CharactersDetail";
import { Favorite } from "../screens/Favorites";

const { Navigator, Screen, Group } = createNativeStackNavigator()


export function UserStackRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="home" component={Home} />
            <Screen name="characterDetail" component={CharactersDetail} />
            <Screen name="favorites" component={Favorite} />
        </Navigator>
    )
}