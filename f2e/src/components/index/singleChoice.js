import React from 'react';
import Radio from 'antd/lib/radio';
const RadioGroup = Radio.Group;
export default class SingleChoice extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        const {id,setValue}=this.props;
        setValue(id,e.target.value);
    }

    render() {
        const {title,options,index}=this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}. {title}</div>
                <RadioGroup onChange={this.onChange} >
                    {options.map((item,index)=>{
                        return  <Radio key={index} value={item}>{item}</Radio>
                    })}
                </RadioGroup>
            </div>
        )
    }
}
