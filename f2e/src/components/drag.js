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
        const {
            options
        } = this.props;
        return ( < div className = 'dragula' > {
                options.map((item, index) => {
                    return <div key = {index }  data-value={item}> {
                        item
                    } < /div>
                })
            } < /div>)
        }

        componentDidMount() {
            const container = ReactDom.findDOMNode(this);
            const drake =  dragula([container]);
            drake.on('drop',function(el,target,source,sibling){
              let div=source.getElementsByTagName('div');
              for(let i=0;i<div.length;i++){
                 console.log(div[i].getAttribute('data-value'));
              }
               
            })
        }
    }

    export default class Grag extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            const {
                title, options,index
            } = this.props;
            return ( < div >
                < div >{index-0+1}.  {
                    title
                } < /div>  < GragItem options = {
                    options
                }
                /> </div >
            )
        }

    }