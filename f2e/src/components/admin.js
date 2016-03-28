import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button,Input,Icon} from 'antd';
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
    }

    render() {

        const {title,loading}=this.props;
        return (
            <div className="main">
                <div className="leftSide">
                    <ul className="qs" onClick={this.onAddQ}>
                        <li><Icon type="check-circle-o" /><a data-type="1">单选题</a></li>
                        <li><Icon type="check" /><a data-type="2">多选题</a></li>
                        <li><Icon type="question-circle-o" /><a data-type="3">填空题</a></li>
                        <li><Icon type="bars" /><a data-type="4">排序题</a></li>
                    </ul>
                </div>
                <div className="rightQuestion">
                    <div><Input size="large" placeholder="标题" onChange={this.onTitleChange} value={title}/></div>
                    <div className="targetQ">
                        <DragMain/>
                    </div>
                    <Button type="primary" size="large" loading={loading} onClick={this.onPost}>
                    保存
                    </Button>
                </div>
            </div>
        )
    }

    onTitleChange(e){
        const {editTitle}=this.props;
        editTitle(e.target.value);
    }

    onAddQ(e){
        const {addQuestion}=this.props;
        const target=e.target;console.log(target.nodeName)
        if(target.nodeName==='A'){
            const t=target.getAttribute('data-type');
            addQuestion({
                id:guid(),
                type:t,
                title:'',
                options:[]
            });
        }
    }

    onPost(){
        const {postSurvey}=this.props;
        postSurvey();
    }

}

function mapStateToProps(state) {
    return {
        title:state.title,
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
