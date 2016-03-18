import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import dragula from 'react-dragula';
import {Button,Input,Icon} from 'antd';
//import SingleChoice from './admin/_singleChoice.js';
//import MultiSelect from './admin/_multiSelect.js';
import FillIn from './admin/_fillIn.js';
import PublicLayout from './admin/_publicLayout.js';
import * as actions from '../actions/adminActions';



class Admin extends Component {
    constructor(props) {
        super(props);
        this.onAddQ=this.onAddQ.bind(this);
        this.onTitleChange=this.onTitleChange.bind(this);
        this.delQ=this.delQ.bind(this);
    }

    render() {

        const {questions,title,editQuestion,delQuestion}=this.props;     
         console.log('render',questions);
         //sort((a,b)=>a.order>b.order).
        return (
            <div className="main">
                <div className="leftSide">
                    <ul className="qs" onClick={this.onAddQ}>
                        <li><a data-type="1">单选题</a></li>
                        <li><a data-type="2">多选题</a></li>
                        <li><a data-type="3">填空题</a></li>
                        <li><a data-type="4">排序题</a></li>
                    </ul>
                </div>
                <div className="rightQuestion">
                    <div><Input size="large" placeholder="标题" onChange={this.onTitleChange} value={title}/></div>
                    <div ref="targetQ" className="targetQ">
                        {questions.sort((a,b)=>a.order>b.order).map((item,index)=>{
                            console.log(index)
                            switch(item.type-0){
                                case 1:
                                    return <PublicLayout {...item} o={index}  txt="单选题" key={index} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.delQ(order)}/>;
                                case 2:
                                    return <PublicLayout {...item} o={index}  txt="多选题" key={index} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.delQ(order)}/>;
                                case 3:
                                    return <FillIn {...item} o={index} key={index} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.delQ(order)}/>;
                                case 4:
                                    return <PublicLayout {...item} o={index}  txt="排序选题" key={index} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.delQ(order)}/>;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }

    onTitleChange(e){
        const {editTitle}=this.props;
        editTitle(e.target.value);
    }

    onAddQ(e){
        const {addQuestion,questions}=this.props;
        const target=e.target;
        if(target.nodeName==='A'){
            const t= target.getAttribute('data-type');                    
            addQuestion({
                type:t,
                title:'',
                options:[],
                order:questions.length
            });
        }
    }


    componentDidMount() {
        const {targetQ}=this.refs;
        const drake = dragula([targetQ],{
            copy:false
        });        
        drake.on('drop',(el,target,source,sibling)=>{
            this.updateOrders();                
        });
    }

    updateOrders(){
        const {editQuestion}=this.props;
        const {targetQ}=this.refs;
        const divs=targetQ.getElementsByClassName('panel');
        const arr=[];
        for(let i=0;i<divs.length;i++){
            arr.push(divs[i].getAttribute('data-order')-0);
        }
        console.log(arr);
        editQuestion(arr);
    }

    delQ(order){
        console.log('删除:',order)
        const {delQuestion}=this.props;
        delQuestion(order);
        // setTimeout(()=>{
        //    this.updateOrders();
        // },10)
      
    }
}

function mapStateToProps(state) {
    return {
        questions: state.questions,
        title:state.title,
        orders:state.orders
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)
