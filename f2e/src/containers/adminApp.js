import React,{Component} from 'react';
import { Provider } from 'react-redux';
import reducers from '../reducers/adminReducer';
import Admin from '../components/admin';
import configureStore from '../store/adminStore';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Admin />
            </Provider>
        )
    }
}