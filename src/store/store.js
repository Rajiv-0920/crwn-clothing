import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from './root-reducer'
import storage from 'redux-persist/lib/storage'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

/* DEV for development and PROD for production */
const middlewares = [import.meta.env.DEV && logger, sagaMiddleware].filter(
  Boolean
)

const composeEnhancer =
  import.meta.env.DEV && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
