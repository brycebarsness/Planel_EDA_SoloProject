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
function DetailsPage() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const newJob = useSelector((state) => state.setOneJobReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_ONE_JOB" }), []);
  const displayOneWall = useSelector((state) => state.setOneWallReducer);
  const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <tbody>
          <tr>
            <td>Job Number</td>
            <td>User Id</td>
            <td>Contractor</td>
            <td>Street Address</td>
            <td>City</td>
            <td>State</td>
            <td>Zip Code</td>
            <td>Start Date </td>
            <td>Outside Corners</td>
            <td>Inside Corners</td>
            <td>Status</td>
            <td>Complete</td>
            <td>Comments</td>
            <td>Finish Date</td>
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
        Current Panel Length/quantity: {displayWallPanel.panel_id}
        {displayWallPanel.quantity}
      </p>
    </div>
  );
}

export default DetailsPage;
