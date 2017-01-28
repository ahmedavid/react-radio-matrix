import React , {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import EditableListItem from './EditableListItem';
import ImageBox from './ImageBox';
import {create2DArray,createRow,createCol,copyArr} from '../helpers';


class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            longestRow:0,
            longestCol:0,
            numImg:0,
            rowHistory:6,
            colHistory:6,
            rows:6,
            cols:6,
            myArr:create2DArray(6,6)
        };
    }

    componentWillMount(){
        const {longestRow,longestCol} = this.findLongest();
        this.setState({
            longestRow:longestRow.length,
            longestCol:longestCol.length
        })
    }
    removeRowCol(id){
        const rowRegex = /^row/;
        const colRegex = /^col/;

        console.log("Remove Clicked id:",id)
        const myArr = this.state.myArr;

        if(rowRegex.test(id)){
            let index = -1;
            for(let i=0;i<myArr.length;i++){
                if(index !== -1) break;
                for(let j=0;j<myArr[0].length;j++){
                    if(myArr[i][j].name === "label" && myArr[i][j].id===id){
                        index = i;
                        break;
                    }
                }
            }
            if(index > 0  && myArr.length > 4){
                const res = myArr.splice(index,1)
                if(res.length > 0){
                    this.setState({
                        myArr:myArr,
                        rows:this.state.rows-1
                    });
                }

                const {longestRow,longestCol} = this.findLongest();
                this.setState({
                    longestRow:longestRow.length,
                    longestCol:longestCol.length
                })
                this.countImages()
            }
        }

        if(colRegex.test(id)){
            let index = -1;
            for(let i=0;i<myArr.length;i++){
                if(index !== -1) break;
                for(let j=0;j<myArr[0].length;j++){
                    if(myArr[i][j].name === "label" && myArr[i][j].id===id){
                        index = j;
                        break;
                    }
                }
            }
            if(index > 0  && myArr[0].length > 4){
                for(let i=0;i<myArr.length;i++){
                    myArr[i].splice(index,1)
                }
                this.setState({
                    myArr:myArr,
                    cols:this.state.cols-1
                });

                const {longestRow,longestCol} = this.findLongest();
                this.setState({
                    longestRow:longestRow.length,
                    longestCol:longestCol.length
                })
                this.countImages()
            }
        }

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
    handleUpload(id,file){
        const temp = this.state.myArr.map((arr => {
            return arr.map(a=>{
                if(a.name === "imagebox" && a.id === id){
                    a.imageSet = true;
                    a.file = file;
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
                        return <li key={a.key}></li>;
                    }
                    else if(a.name === "radio"){
                        return(
                            <li key={a.key}>
                                <div className="center-item">
                                    <input type="radio" name="name"/>
                                </div>
                            </li>
                        );
                    }
                    else if(a.name === "imagebox"){
                        return (
                            <li key={a.key}>
                                <div className="center-item">
                                    <ImageBox listItem={a} onUpload={this.handleUpload.bind(this)}/>
                                </div>
                            </li>
                        );
                    }
                    else if(a.name === "remove"){
                        return (
                            <li key={a.key}>
                                <span className="center-item glyphicon glyphicon-remove remove-btn" onClick={this.removeRowCol.bind(this,a.id)}>
                                </span>
                            </li>
                        );
                    }
                    else{
                        return (
                            <EditableListItem key={a.key} listItem={a} onEdit={this.handleEdit.bind(this)}/>
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
                <div className="col-sm-9">
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
                <div className="col-sm-3 left-border">
                    <h3>Summary</h3>
                    <ul>
                        <li>Number of rows : {this.state.rows-3}</li>
                        <li>Number of cols : {this.state.cols-3}</li>
                        <li>Number of images : {this.state.numImg}</li>
                        <li>Longest Row Label : {this.state.longestRow}</li>
                        <li>Longest Col Label : {this.state.longestCol}</li>
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
        const myArr = this.state.myArr;
        const newRow = createRow(this);
        myArr.push(newRow);
        const newRowHistory = this.state.rowHistory + 1;
        const newRows = this.state.rows + 1;
        this.setState({
            myArr:myArr,
            rowHistory:newRowHistory,
            rows:newRows
        });
        const {longestRow,longestCol} = this.findLongest();
        this.setState({
            longestRow:longestRow.length,
            longestCol:longestCol.length
        })
        this.countImages()
    }
    onAddColumn(){
        const newCol = createCol(this);
        const newColHistory = this.state.colHistory + 1;
        const newCols = this.state.cols + 1;
        this.setState({
            myArr:newCol,
            colHistory:newColHistory,
            cols:newCols
        });
        const {longestRow,longestCol} = this.findLongest();
        this.setState({
            longestRow:longestRow.length,
            longestCol:longestCol.length
        })
        this.countImages()
    }
}



export default App;