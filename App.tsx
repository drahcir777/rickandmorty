import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans'
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display'
import { ThemeProvider } from 'styled-components/native'
import { Provider } from "react-redux";
import store from './src/redux/store'

import { Routes } from './src/routes'

import theme from './src/theme';

import { CharactersDetail } from './src/screens/CharactersDetail';

export default function App() {

    const [fontsLoaded] = useFonts({
        DMSans_400Regular,
        DMSerifDisplay_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <StatusBar style='light' translucent backgroundColor='transparent' />
                <Routes />
            </ThemeProvider>
        </Provider>
    );
}

