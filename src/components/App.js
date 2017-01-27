import React , {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EditableListItem from './EditableListItem';
import ImageBox from './ImageBox';
import {create2DArray,copyArr} from '../helpers';


class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            longestRow:0,
            longestCol:0,
            numImg:0,
            rows:5,
            cols:5,
            myArr:create2DArray(5,5)
        };
    }

    componentWillMount(){
        const {longestRow,longestCol} = this.findLongest();
        this.setState({
            longestRow:longestRow.length,
            longestCol:longestCol.length
        })
    }
    handleEdit(id,al){
        const temp = this.state.myArr.map((arr => {
            return arr.map(a=>{
                if(a.name === "label" && a.id === id){
                    a.alias = al;
                    return a;
                }
                return a
            })
        }));

        this.setState({
            myArr:temp
        });

        const {longestRow,longestCol} = this.findLongest();
        this.setState({
            longestRow:longestRow.length,
            longestCol:longestCol.length
        })

    }
    handleUpload(id){
        const temp = this.state.myArr.map((arr => {
            return arr.map(a=>{
                if(a.name === "imagebox" && a.id === id){
                    a.imageSet = true;
                    return a;
                }
                return a
            })
        }));

        this.setState({
            myArr:temp
        });

        this.countImages();
    }
    countImages(){
        const result = this.state.myArr.reduce(function(prev,curr){
            return curr.reduce(function(p,c){
                if(c.name === "imagebox" && c.imageSet === true){
                    return p+1;
                }
                return p;
            },prev)
        },0);

        this.setState({numImg:result});

    }
    renderList(){
        return this.state.myArr.map((arr,i)=>{
            return <ul className="flex-container" key={i*234324+333}>
                {arr.map((a,i)=>{
                    if(a.name === "emptycell"){
                        return <li key={i*Math.PI}></li>;
                    }
                    else if(a.name === "radio"){
                        return(
                            <li key={i*11.1134+4546}>
                                <div className="center-item">
                                    <input type="radio" name="name"/>
                                </div>
                            </li>
                        );
                    }
                    else if(a.name === "imagebox"){
                        return (
                            <li key={i*12.1134+546}>
                                <div className="center-item">
                                    <ImageBox listItem={a} onUpload={this.handleUpload.bind(this)}/>
                                </div>
                            </li>
                        );
                    }
                    else{
                        return (
                            <EditableListItem key={a.id} listItem={a} onEdit={this.handleEdit.bind(this)}/>
                        );
                    }
                })}
            </ul>
        })
    }
    render(){
        //ANIMATIONS OPTIONS
        const transitionOptions = {
            transitionName:"fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 500,
        };

        return(
            <div className="row">
                <div className="col-sm-8">
                    <div id="grid-container">
                        <form onSubmit={(e)=>e.preventDefault()}>
                            <ReactCSSTransitionGroup {...transitionOptions}>
                                {this.renderList()}
                            </ReactCSSTransitionGroup>
                        </form>
                        <button onClick={this.onAddRow.bind(this)} className="add-row"><span className="glyphicon glyphicon-plus"/></button>
                        <button onClick={this.onAddColumn.bind(this)} className="add-col"><span className="glyphicon glyphicon-plus"/></button>
                    </div>
                </div>
                <div className="col-sm-4 left-border">
                    <h3>Stats</h3>
                    <ul>
                        <li>Number of rows : {this.state.rows-2}</li>
                        <li>Number of cols : {this.state.cols-2}</li>
                        <li>Number of images : {this.state.numImg}</li>
                        <li>Longest Row : {this.state.longestRow}</li>
                        <li>Longest Col : {this.state.longestCol}</li>
                    </ul>
                </div>
            </div>
        );
    }



    findLongest(){
        const myArr = this.state.myArr;

        const rowRegex = /^row/;
        const colRegex = /^col/;


        var rowArray =[];
        myArr.reduce(function (prev, curr) {
            curr.reduce(function (p, c) {
                if(c.name === "label" && rowRegex.test(c.id)){
                    rowArray.push(c.alias);
                }
            },prev)
        },myArr[0][0]);
        var longestRow = rowArray.reduce(function (a, b) { return a.length > b.length ? a : b; });

        var colArray =[];
        myArr.reduce(function (prev, curr) {
            curr.reduce(function (p, c) {
                if(c.name === "label" && colRegex.test(c.id)){
                    colArray.push(c.alias);
                }
            },prev)
        },myArr[0][0]);
        var longestCol = colArray.reduce(function (a, b) { return a.length > b.length ? a : b; });

        return{longestRow,longestCol}

    }

    onAddRow(){
        const {rows,cols} = this.state;
        const temp = copyArr(this.state.myArr,create2DArray(rows+1,cols),this);
        this.setState({
            myArr:temp,
            rows:rows+1,
            cols:cols
        })
    }
    onAddColumn(){
        const {rows,cols} = this.state;
        const temp = copyArr(this.state.myArr,create2DArray(rows,cols+1),this);
        this.setState({
            myArr:temp,
            rows:rows,
            cols:cols+1
        })
    }
}



export default App;