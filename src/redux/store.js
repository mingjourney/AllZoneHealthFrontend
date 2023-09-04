import { combineReducers, legacy_createStore as createStore } from 'redux'
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FoldReducer } from './reducers/FoldReducer';
import { LoadingReducer } from './reducers/LoadingReducer';
import storage from 'redux-persist/lib/storage'


const reducer = combineReducers(
    { FoldReducer, LoadingReducer }
)
const persistConfig = {
    key: 'gugu',
    storage,
    whitelist: ['FoldReducer']
}
const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persiststore = persistStore(store);
export { store, persiststore };

