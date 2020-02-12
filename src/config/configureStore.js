import { createStore, combineReducers, applyMiddleware  } from 'redux';
//Para usar metodos de forma asincrona
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    applyMiddleware(thunk.withExtraArgument()),
  );
}