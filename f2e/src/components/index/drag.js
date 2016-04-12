import React, {
    Component
}
from 'react';
import ReactDom from 'react-dom';
import dragula from 'react-dragula';

class GragItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {answers} = this.props;
        return (
            <div className='dragula'>
                {answers.map((item, index) => {
                    return <div key={index}  data-value={item}>{item}</div>
                })} 
            </div>
            )
    }
    

    componentDidMount(){
            const {id,setValue}=this.props;
            const container = ReactDom.findDOMNode(this);
            const drake =  dragula([container]);
            drake.on('drop',(el,target,source,sibling)=>{
              let div=source.getElementsByTagName('div');
              let arr=[];
              for(let i=0;i<div.length;i++){
                 arr.push(div[i].getAttribute('data-value'));
              }
                setValue(id,arr.join(','));
            })
        
    }
}

export default class Grag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {title, answers,index,setValue,id} = this.props;
        return (
            <div className="question">
                <div className="qt">{index-0+1}.{title} </div>
                <GragItem answers = {answers} setValue={setValue} id={id}/> 
            </div>
        )
    }

}