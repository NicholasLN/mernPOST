import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

import reducers from "./Reducers/reducers";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
// Create a store with Thunk middleware
const store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);
export { store, persistor };
