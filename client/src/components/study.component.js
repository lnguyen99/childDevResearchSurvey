import React from 'react';
import StartStudy from './StartStudy'; 

import axios from 'axios'; 

export default class Study extends React.Component {
  constructor(props) {
    super(props); 

    this.fetchData = this.fetchData.bind(this); 
    this.onChangeStudyList = this.onChangeStudyList.bind(this); 
    this.onChangeParticipantId = this.onChangeParticipantId.bind(this); 
    this.onChangeStudyId = this.onChangeStudyId.bind(this); 
    this.onSubmit = this.onSubmit.bind(this); 
    this.onStart = this.onStart.bind(this); 

    this.state = {
      participantId: '',
      studyId: '', 
      studyName: '', 
      studyDescription: '', 
      studyInstruction: '',
      studyLength: 0, 
      studyConfirmed: false, 
      studyStarted: false, 
      studyList: [], 
    }
  }

  componentDidMount() {
    this.fetchData(); 
  }

  async fetchData() {
    axios.get("/api/study").then(res => this.onChangeStudyList(res.data.studies)
    ).then(() => console.log(this.state.studyList)
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

  onChangeStudyList(e) {
    let studyList = []; 
    e.map(study => studyList.push(`Study ${study.studyId} - ${study.studyName}`))
    this.setState({
      studyList
    }); 
  }

  onChangeParticipantId(e) {
    this.setState({
      participantId: e.target.value
    })
  }

  onChangeStudyId(e) {
    this.setState({
      studyId: e.target.value
    })
  }

  onStart() {
    this.setState({
      studyStarted: true,
    })
  }

  // TODO 
  // randomize number of options shown 

  onSubmit(e) {
    e.preventDefault(); 

    axios
      .post('/api/participants/start', {
        participantId: this.state.participantId, 
        studyId: this.state.studyId
      }).then(res => {
        const study = res.data.study; 
        this.setState({
          studyId: study.id, 
          studyName: study.name,
          studyDescription: study.description,
          studyInstruction: study.instruction,
          studyLength: study.studyLength, 
          studyConfirmed: true
        });
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
        <div className="mt-4">
          {!this.state.studyConfirmed ? (
            <div className="mt-4 mb-4">
              <h3 className="text-center">Welcome!</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group mt-4 mb-4"> 
                  <label><b>Study ID: </b></label>
                  <input type="number"
                      required
                      min="1"
                      className="form-control"
                      value={this.state.studyId}
                      onChange={this.onChangeStudyId}
                      />
                </div>
                <div className="form-group"> 
                  <label><b>Participant ID:</b></label>
                  <input  type="number"
                      required
                      min="1"
                      className="form-control"
                      value={this.state.participantId}
                      onChange={this.onChangeParticipantId}
                      />
                </div>
                <div className="form-group text-center">
                  <input type="submit" value="Submit" className="btn btn-primary mt-4" />
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h3 className="text-center">{this.state.studyName}</h3><br />
              {this.state.studyStarted ? (
                <StartStudy studyId={this.state.studyId} 
                  studyLength={this.state.studyLength}
                  participantId={this.state.participantId}/>
              ) : (
                <div>
                  <h6>Study ID: {this.state.studyId}</h6><br />
                  <h6>Participant ID: {this.state.participantId}</h6><br />
                  <p>{this.state.studyDescription}</p>
                  <p>{this.state.studyInstruction}</p>
                  <br />
                  <div className="text-center">
                    <button onClick={() => this.setState({studyStarted : true})} 
                      className="btn btn-primary">Start the survey
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}