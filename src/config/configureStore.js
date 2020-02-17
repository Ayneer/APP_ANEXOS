import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
//Para usar metodos de forma asincrona
import thunk from 'redux-thunk';
import reducers from '../reducers';
import Api from '../API';

export default function configureStore() {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers({
      ...reducers,
    }),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(Api))
    ),
  );
}