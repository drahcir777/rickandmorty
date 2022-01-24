import React, { useState, useEffect, useRef, useCallback } from 'react'
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

import { useFocusEffect, useNavigation } from '@react-navigation/native';


export function Home() {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [dados, setDados] = useState<any[]>([])
    const [totalCharac, setTotalCharac] = useState(0)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1);

    const navigation = useNavigation();

    const { COLORS } = useTheme();

    useEffect(() => {
        getCharacters()

    }, [page])




    async function getCharacters() {

        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        const data = await response.json()
        setDados([...dados, ...data.results])
    }

    async function loadApi() {
        setPage(page + 1)
    }

    async function fetchCharacter(name: string) {
        console.log("O cara digitou", name)
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${search}`)
        const data = await response.json()
        setDados(data.results)
    }

    function handleSearch() {
        if (search.length > 0) {
            fetchCharacter(search);
            setSearch('')
        }
    }

    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={{}} />
                    <GreetingText>Olá</GreetingText>
                </Greeting>

            </Header>
            <Search
                onChangeText={setSearch}
                value={search}
                onSearch={() => handleSearch()}
                onClear={() => { }}
            />
            <MenuHeader>
                <Title>Personagens</Title>
                <MenuItemsNumber>Total {totalCharac ? totalCharac : null}</MenuItemsNumber>
            </MenuHeader>

            <FlatList
                data={dados}
                keyExtractor={(item) => item.id}
                onEndReached={loadApi}
                onEndReachedThreshold={0.1}
                renderItem={({ item }) => (
                    <CharacterCards
                        data={item}
                        onPress={() => {
                            navigation.navigate('characterDetail', { id: item.id });
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