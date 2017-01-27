import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class ImageBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            files:null
        }
    }
    render() {
        return (
            <div className="imagebox">
                {
                    this.state.files
                        ? <div><div>{this.state.files.map((file,i) => <img width={50} key={i} src={file.preview} />)}</div></div>
                        : <Dropzone className="dropzonne" onDrop={this.onDrop.bind(this)}>
                            <div>+</div>
                          </Dropzone>
                }

            </div>
        );
    }
    onDrop(files){
        this.setState({
            files: files
        });
        this.props.onUpload(this.props.listItem.id);
    }
}

export default ImageBox;