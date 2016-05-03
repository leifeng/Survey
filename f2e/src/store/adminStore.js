import createStore from 'redux/lib/createStore';
import compose from 'redux/lib/compose';
import applyMiddleware from 'redux/lib/applyMiddleware';

import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/adminReducer';


const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware)
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);
    if (module.hot) {
        module.hot.accept('../reducers/adminReducer', () => {
            const nextRootReducer = require('../reducers/adminReducer');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}