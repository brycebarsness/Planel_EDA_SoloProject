import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

function Dashboard(props) {
  const jobs = useSelector((state) => state.setAllJobsReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_ALL_JOBS" }), []);
  const history = useHistory();
  const handleDetails = (id) => {
    history.push(`/details/${id}`); // push to details view
  };
  const handleJobDelete = (id) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_JOB", payload: id });
  };

  return (
    <div>
      <h2>Total Jobs: {jobs.length} </h2>

      <table>
        <thead>
          <tr>
            <th>Job Number</th>
            <th>User Id</th>
            <th>Contractor</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Start Date </th>
            <th>Outside Corners</th>
            <th>Inside Corners</th>
            <th>Status</th>
            <th>Complete</th>
            <th>Comments</th>
            <th>Finish Date</th>
            <th> Details/Delete</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.user_id}</td>
              <td>{job.contractor}</td>
              <td>{job.street_address}</td>
              <td>{job.city}</td>
              <td>{job.state}</td>
              <td>{job.zip}</td>
              <td>
                <Moment format="YYYY/MM/DD">{job.start_date}</Moment>
              </td>
              <td>{job.outside_corners}</td>
              <td>{job.inside_corners}</td>
              <td>{job.status}</td>
              <td>{job.complete}</td>
              <td>{job.comments}</td>
              <td>
                <Moment format="YYYY/MM/DD">{job.finish_date}</Moment>
              </td>
              <button onClick={() => handleDetails(job.id)}>Details</button>
              <td>
                <button onClick={() => handleJobDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
