import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from 'antd';
import SingleChoice from './index/singleChoice.js';
import SingleImgChoice from './index/singleImgChoice.js'
import MultiSelect from './index/multiSelect.js';
import FillIn from './index/fillIn.js';
import Grag from './index/drag.js';
import * as actions from '../actions'
class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {question,setAnswerValue} =this.props;
        return (
            <div>
                <h1 className="title">标题</h1>
                <div className="main">
                    {question.map((item,index)=> {
                        switch (item.type) {
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
                    <Button type="primary" size="large">提交</Button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        const {getQuestionData}=this.props;
        getQuestionData();
    }
}

function mapStateToProps(state) {
    return {
        question: state.initData.questions,
        initData:state.initData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
