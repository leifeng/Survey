import React,{Component} from 'react';
import {Input} from 'antd';
export default class FillIn extends Component {
    constructor(props) {
        super(props);
        this.onChange=this.onChange.bind(this);
    }
    
    onChange(e){
        const {id,setValue}=this.props;
        setValue(id,e.target.value);
    }
    
    render() {
        const {title,index}=this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}. {title}</div>
                <Input placeholder="填入答案" onChange={this.onChange}/>

            </div>
        )
    }
}