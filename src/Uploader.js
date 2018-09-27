// {
// upload(e){
//     const formData = new FromData;
//     fromData.append("file", e.target.files[0])
//     axios.post("/upload", formData).then(({data}) =>{
//         this.props.setImage(data.imgUrl)
//     })
// }
// }
import React, { Component } from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.upload = this.upload.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    setFile(e) {
        this.file = e.target.files[0];
    }
    upload(e) {
        e.preventDefault();
        console.log(this.file);
        const formData = new FormData();
        formData.append("file", this.file);
        axios.post("/upload", formData).then(({ data }) => {
            this.props.setImage(data);
        });
    }
    render() {
        return (
            <div id="uploader">
                <h1 onClick={this.props.closeModal} id="close">X</h1>
                <div id="innerUploader">
                    <input id="file" name="file" type="file" onChange={this.setFile} />
                    <button id="uploadImgBut" onClick={this.upload}> Upload </button>
                </div>
            </div>
        );
    }
}
