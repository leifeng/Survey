import React from 'react';
import connect from 'react-redux/lib/components/connect';
import bindActionCreators from 'redux/lib/bindActionCreators';
import DragDropContext from 'react-dnd/lib/DragDropContext';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actions from '../../actions/adminActions';
import FillIn from './_fillIn.js';
import PublicLayout from './_publicLayout.js';

@DragDropContext(HTML5Backend)
export default class DragMain extends React.Component{

	constructor(props){
		super(props);
		this.onMove=this.onMove.bind(this);
	}

	render(){
		const {questions}=this.props;
		return(
			<div>
                    {questions.map((item,index)=>{
                        const key=item.id+(item.unique?item.unique:'');
                        switch(item.kind-0){
                                case 1:
                                    return <PublicLayout key={key} {...item} index={index} txt="单选题"  onMove={this.onMove}/>;
                                case 2:
                                    return <PublicLayout key={key} {...item} index={index} txt="多选题"  onMove={this.onMove} />;
                                case 3:
                                    return <FillIn key={key} {...item} index={index} txt="填空题"  onMove={this.onMove} />;
                                case 4:
                                    return <PublicLayout key={key} {...item} index={index} txt="排序选题" onMove={this.onMove}/>;
                                default:
                                    return null;
                        }
                    })}
			</div>
			)
	}

	onMove(dragIndex,hoverIndex){
		const {questions,updateQuestion}=this.props;      
		const dragQ=questions[dragIndex];
		updateQuestion(dragIndex,hoverIndex,dragQ);
	}
}

function mapStateToProps(state) {
    return {
        questions: state.initData.questions
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DragMain)