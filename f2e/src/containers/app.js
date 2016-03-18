import React,{Component} from 'react';
import { Provider } from 'react-redux';
import reducers from '../reducers/index';
import Index from '../components/index';
import configureStore from '../store/index';

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