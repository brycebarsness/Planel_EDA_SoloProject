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
function Dashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState("Functional Component");
  const classes = useStyles();

  const displayAllJob = useSelector((state) => state.setAllJobsReducer);
  return (
    <div>
      <h2>{heading}</h2>
      <h3 className={classes.root}> Click Job For Details</h3>

      {displayAllJob.map((job) => {
        return (
          <table key={job.id}>
            <tbody>
              <tr>
                <td>{job.id}</td>
                <td>{job.user_id}</td>
                <td>{job.contractor}</td>
                <td>{job.street_address}</td>
                <td>{job.city}</td>
                <td>{job.state}</td>
                <td>{job.zip}</td>
                <td>{job.start_date}</td>
                <td>{job.outside_corners}</td>
                <td>{job.inside_corners}</td>
                <td>{job.status}</td>
                <td>{job.complete}</td>
                <td>{job.comments}</td>
                <td>{job.finish_date}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default Dashboard;
