import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import axios from "axios";

function Dashboard(props) {
  const jobs = useSelector((state) => state.setAllJobsReducer);
  const dispatch = useDispatch();

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
            <th> Details/Edit</th>
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
              <td>
                <button onClick={handleDetails}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
