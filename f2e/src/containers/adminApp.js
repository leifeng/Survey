import React from 'react';
import Provider  from 'react-redux/lib/components/Provider';
import reducers from '../reducers/adminReducer';
import Admin from '../components/admin';
import configureStore from '../store/adminStore';

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Admin />
            </Provider>
        )
    }
}