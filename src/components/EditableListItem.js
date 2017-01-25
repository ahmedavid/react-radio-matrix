import React , {Component,PropTypes} from 'react';

export default class EditableListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            isEditing:false,
            alias:this.props.listItem.alias
        }
    }
    handleKeyPress(e){
        if(e.key === 'Enter'){
            console.log('ALIAS CHANGED:',e.target.value)
            this.setState({isEditing:false,alias:e.target.value});
        }
    }
    handleBlur(){
        this.setState({isEditing:false})
    }
    onEdit(){
        this.setState({
            isEditing:true
        });
    }
    renderListItem(){
        if(this.state.isEditing){
            return <input type="text" className="tiny-input center-item" onKeyPress={this.handleKeyPress.bind(this)} onBlur={this.handleBlur.bind(this)} autoFocus defaultValue={this.state.alias}/>
        }
        return <div onClick={this.onEdit.bind(this)} className="center-item">{this.state.alias}</div>
    }
    render(){
        return(
            <li>
                {this.renderListItem()}
            </li>
        );
    }
}
/*

EditableListItem.PropTypes = {
    listItem:PropTypes.object.isRequired
}*/
