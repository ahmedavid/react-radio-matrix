import React , {Component} from 'react';

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
        return this.state.myArr.map(arr=>{
            return <ul className="flex-container" key={arr[0]}>
                {arr.map(a=>{
                    return <li key={a}>{a}</li>
                })}
            </ul>
        })
    }
    render(){
        return(
            <div>
                PROFILE
                <br/>
                {this.renderList()}

                <br/>
                <button onClick={this.onAddRow.bind(this)}>Add Row</button>
                <button onClick={this.onAddColumn.bind(this)}>Add Column</button>
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
                    a[i][j] = "row"+i;
                }
                else if(i==0){
                    a[i][j] = "col"+j;
                }
                else {
                    a[i][j] = "[" + i + "," + j + "]";
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
function mapStateToProps(state) {
    return {};
}

export default App;