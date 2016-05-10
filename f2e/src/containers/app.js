import React from 'react';
import Provider  from 'react-redux/lib/components/Provider';
import reducers from '../reducers/index';
import Index from '../components/index';
import configureStore from '../store/index';

const store = configureStore();

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}