import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Platform, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'


import { useNavigation, useRoute } from '@react-navigation/native';

import { ProductNavigationProps } from '../../@types/navigation'
import { ButtonBack } from '../../components/ButtonBack';
import { Photo } from '../../components/Photo';



import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
    Form,
    Label,
    InputGroup,
    InputGroupHeader,
    MaxCharacters,
} from './styles';

import { Description, Details, Identification, Name } from '../../components/CharacterCard/styles'
import { Feather } from '@expo/vector-icons';
import { Character } from '../../types/charactersTypes';
import { useDispatch, useSelector } from 'react-redux';
import { storeFavorite } from '../../redux/store/actions';
import { IState } from '../../redux/store';


export function CharactersDetail() {
    const [detail, setDetail] = useState<any[]>([])
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceSizeP, setPriceSizeP] = useState('');
    const [priceSizeM, setPriceSizeM] = useState('');
    const [priceSizeG, setPriceSizeG] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const navigation = useNavigation();

    const route = useRoute();

    const { id } = route.params as ProductNavigationProps;

    const favorites = useSelector((state: IState) => state.favorites);


    console.log("Favoritos", favorites.data)
    const dispatch = useDispatch()


    useEffect(() => {
        loadCharacterDetail()
    }, [])

    const handleAddToFavorites = useCallback(async (data) => {
        // console.log("product", data)
        await AsyncStorage.setItem("@favoriteRickAndMorty", JSON.stringify([data]))

        dispatch(storeFavorite(data))
        navigation.navigate('favorites');
    }, [dispatch])

    async function loadCharacterDetail() {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const data = await response.json()
        setDetail(data)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Header>
                    <ButtonBack onPress={() => navigation.goBack()} />
                    <Title>Details</Title>
                    <TouchableOpacity onPress={() => { }}>

                    </TouchableOpacity>
                </Header>
                <Upload>
                    <Photo uri={detail?.image} />
                    <PickImageButton
                        title="Add Favorite"
                        type="secundary"
                        onPress={() => { handleAddToFavorites(detail?.id) }}
                    />
                </Upload>
                <Form>
                    <InputGroup>
                        <Label>Name</Label>
                        <Details>
                            <Identification>
                                <Name>{detail?.name}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Location</Label>
                        </InputGroupHeader>

                        <Details>
                            <Identification>
                                <Name>{detail.location?.name}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>
                    </InputGroup>

                    <InputGroup>
                        <Label>Origin</Label>

                        <Details>
                            <Identification>
                                <Name>{detail.origin?.name}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>

                    </InputGroup>

                    <InputGroup>
                        <Label>Species</Label>

                        <Details>
                            <Identification>
                                <Name>{detail?.species}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>

                    </InputGroup>

                    <InputGroup>
                        <Label>Status</Label>

                        <Details>
                            <Identification>
                                <Name>{detail?.status}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>

                    </InputGroup>

                    <InputGroup>
                        <Label>Gender</Label>

                        <Details>
                            <Identification>
                                <Name>{detail?.gender}</Name>
                                <Feather name="chevron-right" size={18} />
                            </Identification>

                            <Description></Description>
                        </Details>

                    </InputGroup>

                    <InputGroup>
                        <Label>Episode</Label>

                        {detail?.episode?.map((ep: [], index: number) => {
                            return (
                                <Details key={index}>
                                    <Identification>
                                        <Name>{ep}</Name>
                                        <Feather name="chevron-right" size={18} />
                                    </Identification>

                                    <Description></Description>
                                </Details>
                            )
                        })}

                    </InputGroup>
                </Form>
            </Container>
        </ScrollView>
    );
}