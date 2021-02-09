import React, { useState} from 'react'; 
import axios from 'axios'; 
import { useMountEffect } from './utils/useMountEffect'; 
export default function Dashboard() {
  const [data, setData] = useState([]);

  async function fetchData() {
      axios.get("/api/study").then(res => setData(res.data.studies)
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

  useMountEffect(() => fetchData()); 

  async function downloadData(e) {
    axios.get("/api/participants/download", {
      params: {
        studyId: e.target.id
      }
    }).then((response) => {
      // Downloads the file
      console.log(response)
      let link = document.createElement("a");
      link.download = `study${e.target.id}.csv`;
      let blob = new Blob([response.data], { type: "text/plain" });
      link.href = URL.createObjectURL(blob);
      link.click();
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

  return (
      <div className="container mt-3">
          <h2>Download Data</h2>
          <br />
          <ul>
            {data.map((study) => (
            <li key={study.studyId} >
              <a href='#' 
                className='stretched-link m-3' 
                id={study.studyId} 
                onClick={downloadData}>
                Study {study.studyId} - {study.studyName}
              </a>
            </li>))}
          </ul>
      </div>
  ); 
}