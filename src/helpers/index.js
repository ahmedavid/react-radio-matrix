export const create2DArray = (rows,cols) =>{
    var a = new Array(rows);
    for (var i = 0; i < rows; i++) {
        a[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            if(i==0 && j==0 ){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==1 && j==1){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==2 && j==2){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==0 && j==1){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==1 && j==0){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==2 && j==0){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==2 && j==1){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==1 && j==2){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==0 && j==2){
                a[i][j] = {
                    name:"emptycell"
                };
            }
            else if(i==1){
                a[i][j] = {
                    name:"imagebox",
                    id:parseInt(i+""+j),
                    imageSet:false
                };
            }
            else if(j==1){
                a[i][j] = {
                    name:"imagebox",
                    id:parseInt(i+""+j),
                    imageSet:false
                };
            }
            else if(i==0){
                a[i][j] = {
                    name:"remove",
                    id:'col'+(j-2)
                };
            }
            else if(j==0){
                a[i][j] = {
                    name:"remove",
                    id:'row'+(i-2)
                };
            }
            else if(j==2){
                a[i][j] = {
                    name:"label",
                    id:"row"+(i-2),
                    alias:"row"+(i-2)
                };
            }
            else if(i==2){
                a[i][j] = {
                    name:"label",
                    id:"col"+(j-2),
                    alias:"col"+(j-2)
                };
            }
            else {
                a[i][j] = {
                    name:"radio"
                };
            }
        }
    }

    return a
};

export const copyArr = (oldArr,newArr,that) => {
    for (var i = 0; i < that.state.rows; i++) {
        for (var j = 0; j < that.state.cols; j++) {
            if(newArr[i][j].name === "imagebox" && oldArr[i][j].name ==="imagebox"){
                if(newArr[i][j].id === oldArr[i][j].id){
                    newArr[i][j] = oldArr[i][j];
                }
            }
            if(newArr[i][j].name === "label" && oldArr[i][j].name ==="label"){
                if(newArr[i][j].name === oldArr[i][j].name){
                    newArr[i][j] = oldArr[i][j];
                }
            }
        }
    }

    return newArr;
};

export const createRow = (that) => {
    const {myArr,rowHistory,colHistory} = that.state;
    var tempArr = [];
    for(var i=0;i<myArr[0].length;i++){
        if(i===0) {
            tempArr.push( {
                    name:"remove",
                    id:'row'+(rowHistory-2)
            });
        }
        else if(i===1) {
            tempArr.push( {
                name:"imagebox",
                id:parseInt((rowHistory-2)+""+colHistory),
                imageSet:false
            });
        }
        else if(i===2) {
            tempArr.push( {
                name:"label",
                id:"row"+(rowHistory-2),
                alias:"row"+(rowHistory-2)
            });
        }
        else {
            tempArr.push({
                name:"radio"
            });
        }
    }

    return tempArr
};

export const createCol = (that) => {
    const {myArr,rowHistory,colHistory} = that.state;

    for(var i=0;i<myArr.length;i++){
        if(i===0) {
            myArr[i].push( {
                name:"remove",
                id:'col'+(colHistory-2)
            });
        }
        else if(i===1) {
            myArr[i].push( {
                name:"imagebox",
                id:parseInt((rowHistory)+""+(colHistory-2)),
                imageSet:false
            });
        }
        else if(i===2) {
            myArr[i].push( {
                name:"label",
                id:"col"+(colHistory-2),
                alias:"col"+(colHistory-2)
            });
        }
        else {
            myArr[i].push({
                name:"radio"
            });
        }
    }

    return myArr;
};