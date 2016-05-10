import React from 'react';
import Checkbox  from 'antd/lib/checkbox';
const CheckboxGroup = Checkbox.Group;

export default class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        const {id,setValue}=this.props;
        setValue(id,value.join(','));
    }

    render() {
        const {title,options,index}=this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}. {title}</div>
                <CheckboxGroup options={options} onChange={this.onChange} />
            </div>
        )
    }
}
