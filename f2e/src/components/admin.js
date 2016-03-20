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
        this.onDelQuestion=this.onDelQuestion.bind(this);
    }

    render() {

        const {questions,title,editQuestion,delQuestion}=this.props;     
         console.log('render',questions);
        // const arr=Object.assign([],questions).sort((a,b)=>a.order>b.order);
         //console.log('render',arr);
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
                        {questions.map((item,index)=>{
                            switch(item.type-0){
                                case 1:
                                    return <PublicLayout {...item} o={index}  txt="单选题" key={item.order} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.onDelQuestion(order)}/>;
                                case 2:
                                    return <PublicLayout {...item} o={index}  txt="多选题" key={item.order} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.onDelQuestion(order)}/>;
                                case 3:
                                    return <FillIn {...item} o={index} key={item.order} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.onDelQuestion(order)}/>;
                                case 4:
                                    return <PublicLayout {...item} o={index}  txt="排序选题" key={item.order} edit={(order,option)=>editQuestion(order,option)} del={(order)=>this.onDelQuestion(order)}/>;
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

    shouldComponentUpdate(nextProps, nextState) {
        console.log('update',nextProps.questions===this.props.questions)
        if(nextProps.orders.length>0&&nextProps.questions===this.props.questions){
            return false
        }  
        return true;
    }

    componentDidMount() {
        const {targetQ}=this.refs;
        const drake = dragula([targetQ],{
            copy:false
        });        
        drake.on('drop',(el,target,source,sibling)=>{
            this.onUpdateOrders();                
        });

    }

    onUpdateOrders(){
        const {updateOrders}=this.props;
        const {targetQ}=this.refs;
        const divs=targetQ.getElementsByClassName('panel');
        const arr=[];
        for(let i=0;i<divs.length;i++){
            arr.push(divs[i].getAttribute('data-order')-0);
        }     
        console.log(arr);
        updateOrders(arr);
    }

    onDelQuestion(order){
        console.log('删除:',order);
        const {targetQ}=this.refs;
        const {delQuestion,questions,updateQuestion}=this.props;
        const newQ=questions.filter(item=>item.order!==order);
        console.log('newQ',newQ)
        //targetQ.innerHTML='';
        updateQuestion(newQ);
        setTimeout(()=>{            
             //delQuestion(order);
            //
            //this.onUpdateOrders();
         },1000)
      
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
