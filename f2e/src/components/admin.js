import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button,Input,Icon,Row,Col,DatePicker,Checkbox } from 'antd';
import ColorPicker from 'react-color';
import DragMain from './admin/dragMain.js';
import * as actions from '../actions/adminActions';

const guid=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

class Admin extends Component {
    constructor(props) {
        super(props);
        this.onAddQ=this.onAddQ.bind(this);
        this.onTitleChange=this.onTitleChange.bind(this);
        this.onPost=this.onPost.bind(this);
        this.onChangeStartTime=this.onChangeStartTime.bind(this);
        this.onChangeEndTime=this.onChangeEndTime.bind(this);
        this.disabledStartDate=this.disabledStartDate.bind(this);
        this.disabledEndDate=this.disabledEndDate.bind(this);
        this.onIsLogin=this.onIsLogin.bind(this);
        this.onIp=this.onIp.bind(this);
        this.onRepeat=this.onRepeat.bind(this);
    }

    render() {

        const {title,loading,options}=this.props;
        return (
            <div className="main">
                <Row>
                    <Col span="3">
                        <div className="leftSide">
                            <ul className="qs" onClick={this.onAddQ}>
                                <li><Button type="dashed" data-type="1" size="large"><Icon type="plus-circle-o" />单选题</Button></li>
                                <li><Button type="dashed" data-type="2" size="large"><Icon type="check-circle-o" />多选题</Button></li>
                                <li><Button type="dashed" data-type="3" size="large"><Icon type="question-circle-o" />填空题</Button></li>
                                <li><Button type="dashed" data-type="4" size="large"><Icon type="bars" />排序题</Button></li>                       
                            </ul>
                        </div>
                    </Col>
                    <Col span="15" offset="1">
                        <div className="rightQuestion">
                            <div><Input size="large" placeholder="标题" onChange={this.onTitleChange} value={title}/></div>
                            <div className="targetQ">
                                <DragMain/>
                            </div>
                            <Button type="primary" size="large" loading={loading} onClick={this.onPost}>
                            保存
                            </Button>
                        </div>
                    </Col>
                    <Col span="4" offset="1">
                        <ul className="op">
                            <li><h5>权限设置</h5></li>
                            <li><DatePicker onChange={this.onChangeStartTime}  placeholder="开始日期" disabledDate={this.disabledStartDate} value={options.startTime}/></li>
                            <li><DatePicker onChange={this.onChangeEndTime}  placeholder="结束日期" disabledDate={this.disabledEndDate}  value={options.endTime}/></li>
                            <li><label><Checkbox defaultChecked={options.isLogin} onChange={this.onIsLogin} />匿名提交</label></li>
                            <li><label><Checkbox defaultChecked={options.ip} onChange={this.onIp} />ip限制</label></li>
                            <li><label><Checkbox defaultChecked={options.repeat} onChange={this.onRepeat} />重复提交</label></li>
                        </ul>
                        <ul className="style">
                            <li><h5>样式设置</h5></li>
                            <li><ColorPicker type="sketch" /></li>

                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }

    disabledStartDate(startTime) {
        const {endTime}=this.props.options;
        if (!startTime || !endTime) {
          return false;
        }
        return startTime.getTime() >= endTime.getTime();
    }

    disabledEndDate(endTime) {
        const {startTime}=this.props.options;
        if (!endTime || !startTime) {
          return false;
        }
        return endTime.getTime() <= startTime.getTime();
    }

    onChangeStartTime(value){
         const {updateOptions}=this.props;
         updateOptions('startTime',value);
    }

    onChangeEndTime(value){
         const {updateOptions}=this.props;
         updateOptions('endTime',value);
    }

    onIsLogin(e){
         const {updateOptions}=this.props;
         updateOptions('isLogin', e.target.checked);
    }

    onIp(e){
         const {updateOptions}=this.props;
         updateOptions('ip', e.target.checked);
    }

    onRepeat(e){
         const {updateOptions}=this.props;
         updateOptions('repeat', e.target.checked);
    }

    onTitleChange(e){
        const {editTitle}=this.props;
        editTitle(e.target.value);
    }

    onAddQ(e){
        const {addQuestion,questions}=this.props;
        const target=e.target;
        var t='';
        if(target.nodeName==='BUTTON'){
            t=target.getAttribute('data-type');

        }else{
            t=target.parentNode.getAttribute('data-type');
        }
        addQuestion({
            unique:guid(),
            type:t,
            title:'',
            options:[],
            sort:questions.length+1
        });
    }

    onPost(){
        const {postSurvey}=this.props;
        postSurvey();
    }

}

function mapStateToProps(state) {
    return {
        title:state.title,
        loading:state.loading,
        options:state.options,
        questions:state.questions
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)
