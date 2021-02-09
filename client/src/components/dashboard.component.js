import React, { Component } from 'react'; 
import axios from 'axios'; 

export default class Dashboard extends Component {
  constructor(props) {
    super(props); 

    this.onChangeData = this.onChangeData.bind(this); 
    this.fetchData = this.fetchData.bind(this); 
    this.downloadData = this.downloadData.bind(this); 

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.fetchData(); 
  }

  onChangeData(e) {
    this.setState({
      data: e
    })
  }

  async fetchData() {
    axios.get("/api/study").then(res => this.onChangeData(res.data.studies)
    ).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }); 
  }

  async downloadData(e) {
    axios.get("/api/participants/download", {
      params: {
        studyId: e.target.id
      }
    }).then((response) => {
      //create fake object url for download 
      let link = document.createElement("a");
      link.download = `study${e.target.id}.csv`;
      let blob = new Blob([response.data], { type: "text/plain" });
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link); 

      // force clicking link 
      link.click();

      // clean up 
      link.parentNode.removeChild(link);
      URL.revokeObjectURL(link.href);      
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }); 
  }

  render() {
    return (
      <div className="container mt-3">
          <h2>Download Data</h2>
          <br />
          <ul>
            {this.state.data.map((study) => (
            <li key={study.studyId}>
              <div type='button'
                style={{color: "blue", margin: "3px"}}
                id={study.studyId} 
                onClick={this.downloadData}>
                Study {study.studyId} - {study.studyName}
              </div>
            </li>))}
          </ul>
      </div>
    ); 
  }; 
}