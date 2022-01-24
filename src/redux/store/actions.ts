import { FavoritesTypes } from '../types'

export const storeFavorite = (data: any) => ({
    type: FavoritesTypes.STORE_FAVORITE,
    payload: data
});

export const removeFavorite = (data: any) => ({
    type: FavoritesTypes.REMOVE_FAVORITE,
    payload: data
});