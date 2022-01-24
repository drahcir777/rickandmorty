import { Reducer } from 'redux'
import { FavoritesTypes } from '../types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initial_state = {
    data: [],
    isFavorited: false

};

const reducer: Reducer<any> = (state = initial_state, action) => {
    switch (action.type) {
        case FavoritesTypes.STORE_FAVORITE: {


            state.data.push(action.payload)
            // const data = Object.assign({}, state, {
            //     data: state.data.concat(action.payload),
            // })
            let notIguals = state.data.filter(function (el: number, i: number) {
                return state.data.indexOf(el) === i;
            });
            AsyncStorage.setItem("@favoriteRickAndMorty", JSON.stringify(notIguals)).then()
            console.log("ACTION", notIguals)


            return state

        }

        case FavoritesTypes.REMOVE_FAVORITE:
            return Object.assign({}, state, {
                data: state.data.filter((item: any) => item !== action.payload),
            })

        default: {
            return state;
        }
    }
}

export default reducer;