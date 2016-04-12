import React,{Component} from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        const {id,setValue}=this.props;
        setValue(id,value.join(','));
    }

    render() {
        const {title,answers,index}=this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}. {title}</div>
                <CheckboxGroup options={answers} onChange={this.onChange} />
            </div>
        )
    }
}
