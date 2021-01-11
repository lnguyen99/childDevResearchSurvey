import React from 'react';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
    }
  }

  render() {
    return (
      <div className="text-center mt-5">
        <h1>I'm a ...</h1>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="thumbnail">
              <a href="/log-in">
                <img 
                  src="https://blog.optimalworkshop.com/wp-content/uploads/2020/03/Qualitative-research-methods.png" 
                  alt="Researcher Cap" 
                  className="img-thumbnail"></img>
              </a>
              <div className="caption text-center">
                <h4>Researcher</h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="thumbnail">
              <a href="/survey">
                <img 
                  src="https://blog.optimalworkshop.com/wp-content/uploads/2020/03/19-user-research-tips-from-2019.png" 
                  alt="Participant Cap" 
                  className="img-thumbnail"></img>
              </a>
              <div className="caption text-center">
                <h4>Participant</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}