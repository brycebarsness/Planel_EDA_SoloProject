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
import setAllJobsReducer from "../../redux/reducers/setAllJob.reducer";
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
function Dashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  const classes = useStyles();

  const displayAllJob = useSelector((state) => state.setAllJobsReducer);
  const [heading, setHeading] = useState(displayAllJob.length);
  return (
    <div class={classes.root}>
      <h2>Total Jobs: {heading} </h2>
      {/* <h3 className={classes.root}> Click Job For Details</h3> */}

      <table>
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
        {displayAllJob.map((job) => {
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
          </tr>;
        })}
      </table>
    </div>
  );
}

export default Dashboard;
