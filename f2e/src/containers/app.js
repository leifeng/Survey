import React,{Component} from 'react';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import Index from '../components/index';
import configureStore from '../store';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}