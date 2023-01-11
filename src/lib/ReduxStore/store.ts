import rootReducer from './Reducers';
import InitialState from "./InitialStates";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [ ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, InitialState, composeWithDevTools())

export const persistor = persistStore(store);
export default store;