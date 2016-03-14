import React,{Component} from 'react';
import {connect} from 'react-redux';
import SingleChoice from './singleChoice.js';
import MultiSelect from './multiSelect.js';
import FillIn from './fillIn.js';
import Grag from './drag.js';
import {getQuestionData,getQuestion} from '../actions'
class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {question} =this.props;
        return (
            <div>
                {question.map((item,index)=> {
                    switch (item.type) {
                        case 1:
                            return <SingleChoice {...item} index={index}/>;
                        case 2:
                            return <MultiSelect {...item} index={index}/>;
                        case 3:
                            return <FillIn {...item} index={index}/>;
                        case 4:
                            return <Grag {...item} index={index}/>;
                        default:
                            return null;
                    }
                })}
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
        question: state.question
    }
}
export default connect(
    mapStateToProps,
    {getQuestionData, getQuestion}
)(Index)
