import React , {Component} from 'react';
import EditableListItem from './EditableListItem';

class App extends Component{
    constructor(){
        super();

        this.state = {
            rows:5,
            cols:5,
            myArr:[]
        };
    }

    componentWillMount(){
        const {rows,cols} = this.state;
        this.setState({
            myArr:this.create2DArray(rows,cols)
        });
    }
    renderList(){
        return this.state.myArr.map((arr,i)=>{
            return <ul className="flex-container" key={i*234324+333}>
                {arr.map((a,i)=>{
                    if(a === "") return <li key={i*Math.PI}></li>
                    else if(a === false){
                        return(
                            <li key={i*11.1134+4546}>
                                <div className="center-item">
                                    <input type="radio" name="name"/>
                                </div>
                            </li>
                        );
                    }
                    else{
                        return (
                            <EditableListItem key={a.name} listItem={a}/>
                        );
                    }
                })}
            </ul>
        })
    }
    render(){
        console.log("STATE:",this.state)

        return(
            <div id="grid-container">
                <form onSubmit={(e)=>e.preventDefault()}>
                    {this.renderList()}
                </form>
                <button onClick={this.onAddRow.bind(this)} className="add-row"><span className="glyphicon glyphicon-plus"/></button>
                <button onClick={this.onAddColumn.bind(this)} className="add-col"><span className="glyphicon glyphicon-plus"/></button>
            </div>
        );
    }

    create2DArray(rows,cols){
        var a = new Array(rows);
        for (var i = 0; i < rows; i++) {
            a[i] = new Array(cols);
            for (var j = 0; j < cols; j++) {
                if(i==0 && j==0){
                    a[i][j] = "";
                }
                else if(j==0){
                    a[i][j] = {
                        name:"row"+i,
                        alias:"row"+i
                    };
                }
                else if(i==0){
                    a[i][j] = {
                        name:"col"+j,
                        alias:"col"+j
                    };
                }
                else {
                    a[i][j] = false;
                }
            }
        }

        return a
    }

    onAddRow(){
        const {rows,cols} = this.state;
        this.setState({
            myArr:this.create2DArray(rows+1,cols),
            rows:rows+1,
            cols:cols
        })
    }
    onAddColumn(){
        const {rows,cols} = this.state;
        this.setState({
            myArr:this.create2DArray(rows,cols+1),
            rows:rows,
            cols:cols+1
        })
    }
}

export default App;