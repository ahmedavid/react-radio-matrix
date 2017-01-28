import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            file:null
        }
    }
    componentWillMount(){
        if(this.props.listItem.file !== null){
            this.setState({
                file:this.props.listItem.file
            });
        }
    }
    render() {
        return (
            <div className="imagebox">
                {
                    this.state.file
                        ? <div><div><img width={50} src={this.state.file.preview} /></div></div>
                        : <Dropzone className="dropzonne" onDrop={this.onDrop.bind(this)} accept="image/*" multiple={false}>
                            <span className="glyphicon glyphicon-plus add-img-btn"></span>
                          </Dropzone>
                }

            </div>
        );
    }
    onDrop(files){
        this.setState({
            file: files[0]
        },function () {
            this.props.onUpload(this.props.listItem.id,this.state.file);
        });

    }
}

export default ImageBox;