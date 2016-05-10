import React from 'react';
import connect from 'react-redux/lib/components/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import { Affix, Button,Input,Icon,Row,Col } from 'antd';
import DatePicker  from "antd/lib/date-picker";
import Checkbox  from "antd/lib/checkbox";
import notification  from "antd/lib/notification";

import DragMain from './admin/dragMain.js';
import * as actions from '../actions/adminActions';

const guid=()=> {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
const getQuery=(name)=>{
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return encodeURI(r[2]);
    return null;
}

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.onAddQ=this.onAddQ.bind(this);
        this.onTitleChange=this.onTitleChange.bind(this);
        this.onPost=this.onPost.bind(this);
        this.onChangeEndTime=this.onChangeEndTime.bind(this);
        this.disabledEndDate=this.disabledEndDate.bind(this);
        this.onIsLogin=this.onIsLogin.bind(this);
        this.onIp=this.onIp.bind(this);
        this.onRepeat=this.onRepeat.bind(this);
    }

    render() {
        const {initData,loading}=this.props;
        return (
            <div className="main">
                <Row>
                  <Affix offset={180}>
                    <Col span="3">
                        <div className="leftSide">
                            <ul className="qs" onClick={this.onAddQ}>
                                <li><Button type="dashed" data-type="1" size="large"><Icon type="plus-circle-o" />单选题</Button></li>
                                <li><Button type="dashed" data-type="2" size="large"><Icon type="check-circle-o" />多选题</Button></li>
                                <li><Button type="dashed" data-type="3" size="large"><Icon type="question-circle-o" />问答题</Button></li>
                                <li><Button type="dashed" data-type="4" size="large"><Icon type="bars" />排序题</Button></li>
                            </ul>
                        </div>
                    </Col>
                  </Affix>
                    <Col span="15" offset="1">
                        <div className="rightQuestion">
                            <div><Input size="large" placeholder="问卷标题" onChange={this.onTitleChange} value={initData.title}/></div>
                            <div className="targetQ">
                                <DragMain/>
                            </div>
                            <div><lable>注：点击左侧题型添加问题</lable></div>
                            <Button data-s="1" type="primary" size="large" loading={loading} onClick={this.onPost}><Icon type="save" /> 保存</Button>
                            &nbsp;
                            <Button data-s="2" type="primary" size="large" loading={loading} onClick={this.onPost}><Icon type="export" /> 保存并发布</Button>
                        </div>
                    </Col>
                    <Col span="4" offset="1">
                        <ul className="op">
                            <li><h5>权限设置</h5></li>
                            <li><span>有效期</span></li>
                            <li><DatePicker onChange={this.onChangeEndTime}  placeholder="结束日期" disabledDate={this.disabledEndDate}  value={initData.endTime}/></li>
                            <li><label><Checkbox checked={initData.anonymous} onChange={this.onIsLogin} />匿名提交</label></li>
                            <li><label><Checkbox checked={initData.ipConfine} onChange={this.onIp} />ip限制</label></li>
                            <li><label><Checkbox checked={initData.isRepeat} onChange={this.onRepeat} />重复提交</label></li>
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
    componentDidMount() {
        const {getQuestion}=this.props;
        const sid=getQuery('sid');
        if(sid){
            getQuestion(sid);
        }
    }

    disabledEndDate(endTime) {
        return endTime && endTime.getTime() < Date.now();
    }

    onChangeEndTime(value){
         const {updateSetting}=this.props;
         updateSetting('endTime',value);
    }

    onIsLogin(e){
         const {updateSetting}=this.props;
         updateSetting('anonymous', e.target.checked?1:0);
    }

    onIp(e){
         const {updateSetting}=this.props;
         updateSetting('ipConfine', e.target.checked?1:0);
    }

    onRepeat(e){
         const {updateSetting}=this.props;
         updateSetting('isRepeat', e.target.checked?1:0);
    }

    onTitleChange(e){
        const {editTitle}=this.props;
        editTitle(e.target.value);
    }

    onAddQ(e){
        const {addQuestion}=this.props;
        const target=e.target;
        var t='';
        if(target.nodeName==='BUTTON'){
            t=target.getAttribute('data-type');

        }else{
            t=target.parentNode.getAttribute('data-type');
        }
        addQuestion({
            id:'',
            unique:guid(),
            kind:t,
            title:'',
            options:[],
            answer:''
        });
    }

    onPost(e){
        const target=e.target;console.log(target)
        const {postSurvey,updateLoad,initData}=this.props;
        const btnClick=()=>{
            window.open('http://www.d169.cc:8080/wj.html?id='+initData.id)
        }
        const btn=(<Button type="primary" size="small" onClick={btnClick}>点击查看</Button>);
        updateLoad(true);
        postSurvey(e.target.getAttribute('data-s')-0,(type)=>{
            notification.open({
                message: '保存成功',
                description: '',
                btn
            });
        });
    }

}

function mapStateToProps(state) {
    return {
        initData:state.initData,
        loading:state.loading
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)
