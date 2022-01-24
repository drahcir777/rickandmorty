import React from "react";

import { Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import { Home } from '../screens/Home'
import { Favorite } from '../screens/Favorites'

import { BottomMenu } from '../components/ButtomMenu'

import { UserStackRoutes } from './user.stack.router'

const { Navigator, Screen } = createBottomTabNavigator()

export function UserTabeRoutes() {
    const { COLORS } = useTheme()
    return (
        <Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: COLORS.SECONDARY_900,
                tabBarInactiveTintColor: COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    padding: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >

            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Home" color={color} />
                    )
                }}
            />

            <Screen
                name="favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu title="Favorites" color={color} />
                    )
                }}
            />
        </Navigator>
    )
}