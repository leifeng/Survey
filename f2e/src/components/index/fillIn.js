import React from 'react';
import Input from 'antd/lib/input';
export default class FillIn extends React.Component {
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
                <div className="qt">{index-0+1} {title}</div>
                答：<Input placeholder="填入答案" onChange={this.onChange}/>

            </div>
        )
    }
}