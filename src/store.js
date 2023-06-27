import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/podcastReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
