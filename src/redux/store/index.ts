import { createStore, Store } from 'redux'
import { FavoritesState } from '../types'

import rootReducer from '../rootReducer'

export interface IState {
    favorites: FavoritesState
}

const store: Store<FavoritesState> = createStore(rootReducer)

export default store