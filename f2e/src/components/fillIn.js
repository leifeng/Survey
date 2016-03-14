import React,{Component} from 'react';
import {Input} from 'antd';
export default class FillIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title,index}=this.props;
        return (
            <div>
                <div>{index-0+1}. {title}</div>
                <Input placeholder="默认尺寸"/>

            </div>
        )
    }
}