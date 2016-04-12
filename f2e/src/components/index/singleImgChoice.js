import React,{Component} from 'react';
import {Radio} from 'antd';
const RadioGroup = Radio.Group;
export default class SingleImgChoice extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const {id,setValue}=this.props;
        setValue(id,e.target.value);
    }

    render() {
        const {title,answers,index}=this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}. {title}</div>
                <RadioGroup onChange={this.onChange} >
                    {answers.map((item,index)=>{
                        return  <Radio key={index} value={item}><img src="https://p1.ssl.qhimg.com/t01fe63a285d1036c3c.jpg"/></Radio>
                    })}
                </RadioGroup>
            </div>
        )
    }
}