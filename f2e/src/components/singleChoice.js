import React,{Component} from 'react';
import {Radio} from 'antd';
const RadioGroup = Radio.Group;
export default class SingleChoice extends Component {

    constructor() {
        super();
        this.state = {
            value: 1
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        const {title,options,index}=this.props;
        return (
            <div>
                <div>{index-0+1}. {title}</div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    {options.map((item,index)=>{
                        return  <Radio key={index} value={item}>{item}</Radio>
                    })}
                </RadioGroup>
            </div>
        )
    }
}