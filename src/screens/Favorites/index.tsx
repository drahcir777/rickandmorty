import React, { useState, useEffect, useRef, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert, FlatList } from 'react-native'

import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    Title,
    MenuHeader,
    MenuItemsNumber
} from './styles'

import { Search } from '../../components/Search';


import { useTheme } from 'styled-components/native';
import { CharacterCards } from '../../components/CharacterCard';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../redux/store';
import { storeFavorite } from '../../redux/store/actions';
import { ButtonBack } from '../../components/ButtonBack';


export function Favorite() {

    const favorites = useSelector((state: IState) => state.favorites);
    const dispatch = useDispatch()

    const navigation = useNavigation();

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [dados, setDados] = useState<any[]>([])
    const [totalCharac, setTotalCharac] = useState(0)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1);

    const { COLORS } = useTheme();

    useEffect(() => {
        getFavorite()

    }, [page])


    const handleAddProductToCart = useCallback((product) => {
        console.log("product", product)
        dispatch(storeFavorite(product))
    }, [dispatch])

    async function getFavorite() {

        const dados = await AsyncStorage.getItem("@favoriteRickAndMorty")

        console.log("DADINHO", dados)

        const response = await fetch(`https://rickandmortyapi.com/api/character/${dados}`)
        const data = await response.json()
        setDados(data)
    }

    return (
        <Container>
            <Header>
                <ButtonBack onPress={() => navigation.goBack()} />
                <Greeting>
                    <GreetingEmoji source={{}} />
                    <GreetingText>Olá</GreetingText>
                </Greeting>

            </Header>
            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={() => { }}
                onClear={() => setSearch('')}
            />
            <MenuHeader>
                <Title>Favorites</Title>
            </MenuHeader>

            <FlatList
                data={dados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CharacterCards
                        data={item}
                        onPress={() => {
                            handleAddProductToCart(item.id)
                        }}
                    />
                )}

                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24,
                }}
            />

        </Container>
    )
}