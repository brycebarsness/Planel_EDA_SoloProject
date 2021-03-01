import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import {
  TextField,
  Menu,
  MenuItem,
  Button,
  makeStyles,
  Checkbox,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50vw",
    },
  },
}));
// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function DisplayOneJob() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const newJob = useSelector((state) => state.setOneJobReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_ALL_JOBS" }), []);
  // displayWall;
  const displayOneWall = useSelector((state) => state.setOneWallReducer);
  const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  const displayWallPanels = useSelector((state) => state.setWallPanelsReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <caption>Current Job Information</caption>
        <tbody>
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
          </tr>
          <tr>
            <td>{newJob.id}</td>
            <td>{newJob.user_id}</td>
            <td>{newJob.contractor}</td>
            <td>{newJob.street_address}</td>
            <td>{newJob.city}</td>
            <td>{newJob.state}</td>
            <td>{newJob.zip}</td>

            <Moment format="YYYY/MM/DD">
              <td>{newJob.start_date}</td>
            </Moment>

            <td>{newJob.outside_corners}</td>
            <td>{newJob.inside_corners}</td>
            <td>{newJob.status}</td>
            <td>{newJob.complete}</td>
            <td>{newJob.comments}</td>
            <td>
              <Moment format="YYYY/MM/DD">{newJob.finish_date}</Moment>
            </td>
          </tr>
        </tbody>
      </table>
      <p>Current Wall Length: {displayOneWall.length}</p>
      <p>
        <table>
          <caption>Wall Length by Wall ID</caption>
          <thead>
            <tr>
              <th>Wall ID</th>
              <th>Length</th>
              <th>UPDATE/DELETE</th>
            </tr>
          </thead>
          {/* {displayOneWall.map((wall) => (
            <tr key={wall.id}>
              <td>{wall.id}</td>
              <td>{wall.length}</td>
            <td>
                <button> UPDATE </button>
                <button> DELETE </button>
              </td>
            </tr>
          ))} */}
        </table>
      </p>
      <p>
        Current Panel Length: {displayWallPanel.panel_id}
        Current Panel Quantity: {displayWallPanel.quantity}
      </p>

      <table>
        <caption>Panel ID and Quantity by Wall ID</caption>
        <thead>
          <tr>
            <th>Wall ID</th>
            <th>Panel ID</th>
            <th>Quantity</th>
            <th>UPDATE/DELETE</th>
          </tr>
        </thead>
        {displayWallPanels.map((wallPanel) => (
          <tr key={wallPanel.id}>
            <td>{wallPanel.wall_id}</td>
            <td>{wallPanel.panel_id}</td>
            <td>{wallPanel.quantity}</td>
            <td>
              <button> UPDATE </button>
              <button> DELETE </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DisplayOneJob;
