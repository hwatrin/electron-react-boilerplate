import { createStore, combineReducers } from 'redux';
import { persistStore /*persistReducer*/ } from 'redux-persist';
import blocks from './blocks';
import pages from './pages';
import config from './config';

// const persistConfig = {
//   key: 'root',
//   storage: combineReducers
// };
const combinedReducer = combineReducers({
  blocks,
  pages,
  config,
});
// const persistedReducer = persistReducer(persistConfig, combinedReducer);

export default () => {
  let store = createStore(combinedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
