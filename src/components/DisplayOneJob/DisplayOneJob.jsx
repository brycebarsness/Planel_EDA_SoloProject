import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const displayAllJob = useSelector((state) => state.setAllJobsReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <tbody>
          <tr>
            <td>{newJob.id}</td>
            <td>{newJob.user_id}</td>
            <td>{newJob.contractor}</td>
            <td>{newJob.street_address}</td>
            <td>{newJob.city}</td>
            <td>{newJob.state}</td>
            <td>{newJob.zip}</td>
            <td>{newJob.start_date}</td>
            <td>{newJob.outside_corners}</td>
            <td>{newJob.inside_corners}</td>
            <td>{newJob.status}</td>
            <td>{newJob.complete}</td>
            <td>{newJob.comments}</td>
            <td>{newJob.finish_date}</td>
          </tr>
        </tbody>
      </table>

      <h3>Click Job For Details</h3>

      {displayAllJob.map((job) => {
        return (
          <div key={job.id}>
            <p>{job.zip}</p>

            <span onClick={() => handleClickPoster(job.id)} />
          </div>
        );
      })}
    </div>
  );
}

export default DisplayOneJob;
