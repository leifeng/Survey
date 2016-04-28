import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button,Alert,Row,Col} from 'antd';
import SingleChoice from './index/singleChoice.js';
import SingleImgChoice from './index/singleImgChoice.js'
import MultiSelect from './index/multiSelect.js';
import FillIn from './index/fillIn.js';
import Grag from './index/drag.js';
import * as actions from '../actions'

const getQuery=(name)=>{
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return encodeURI(r[2]);
    return null;
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.onPost=this.onPost.bind(this);
    }

    render() {
        const {initData,setAnswerValue,postResult} =this.props;
        const msg=postResult.hidden===0?(<Alert message={postResult.msg} type={postResult.err} showIcon />):null;
        return (
            <div>
           
                <div className="main">
                     <h1 className="title">标题</h1>
                     <h4 className="subtitle">发布人：{initData.author}  共 {initData.num} 人参与</h4>
                    {initData.questions.map((item,index)=> {
                        switch (item.kind) {
                            case 1:
                                return <SingleChoice {...item} index={index} setValue={(id,value)=>setAnswerValue(id,value)} />;
                            case 2:
                                return <MultiSelect {...item} index={index} setValue={(id,value)=>setAnswerValue(id,value)} />;
                            case 3:
                                return <FillIn {...item} index={index} setValue={(id,value)=>setAnswerValue(id,value)} />;
                            case 4:
                                return <Grag {...item} index={index} setValue={(id,value)=>setAnswerValue(id,value)} />;
                            case 5:
                                return <SingleImgChoice {...item} index={index} setValue={(id,value)=>setAnswerValue(id,value)} />;
                            default:
                                return null;
                        }
                    })}
                       <div className="btnList">
                        <div><Button type="primary" size="large" onClick={this.onPost}>提交</Button></div>
                          <div> {msg}</div>
                       </div> 
                   
                </div>
            </div>
        )
    }

    componentDidMount() {
        const {getQuestionData,setId}=this.props;
        const id=getQuery('id');
        getQuestionData(id);
        setId(id)
    }

    onPost(){
        const {postAnswer} =this.props;
        postAnswer();
    }
}

function mapStateToProps(state) {
    return {
        initData:state.initData,
        postResult:state.postResult
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
