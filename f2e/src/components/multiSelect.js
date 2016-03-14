import React,{Component} from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        console.log(value)
    }

    render() {
        const {title,options,index}=this.props;
        return (
            <div>
                <div>{index-0+1}. {title}</div>
                <CheckboxGroup options={options} onChange={this.onChange} />
            </div>
        )
    }
}
