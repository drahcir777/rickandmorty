import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import {
    Container,
    Content,
    Image,
    Details,
    Name,
    Identification,
    Description,
    Line,
} from './styles';

export type ProductProps = {
    id: string;
    image: string;
    name: string;
    description: string;
}

type Props = RectButtonProps & {
    data: ProductProps;
}

export function CharacterCards({ data, ...rest }: Props) {
    const { COLORS } = useTheme();

    //console.log("Veio", data)
    return (
        <Container>
            <Content {...rest}>
                <Image source={{ uri: data.image }} />

                <Details>
                    <Identification>
                        <Name>{data.name}</Name>
                        <Feather name="chevron-right" size={18} color={COLORS.SHAPE} />
                    </Identification>

                    <Description>{data.description}</Description>
                </Details>
            </Content>
            <Line />
        </Container>
    )
}