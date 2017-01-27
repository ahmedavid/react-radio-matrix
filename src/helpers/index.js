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
            else if(i==0){
                a[i][j] = {
                    name:"imagebox",
                    id:parseInt(i+""+j),
                    imageSet:false
                };
            }
            else if(j==0){
                a[i][j] = {
                    name:"imagebox",
                    id:parseInt(i+""+j),
                    imageSet:false
                };
            }
            else if(j==1){
                a[i][j] = {
                    name:"label",
                    id:"row"+(i-1),
                    alias:"row"+(i-1)
                };
            }
            else if(i==1){
                a[i][j] = {
                    name:"label",
                    id:"col"+(j-1),
                    alias:"col"+(j-1)
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