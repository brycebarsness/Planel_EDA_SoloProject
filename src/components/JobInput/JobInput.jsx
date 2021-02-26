import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
function jobInput(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const classes = useStyles();
  const newJob = useSelector((state) => state.setOneJobReducer);
  const user = useSelector((store) => store.user.id);

  // const [isChecked, setIsChecked] = useState(panels.slice().fill(false));
  const [jobToAdd, setJobToAdd] = useState({
    user_id: user,
    contractor: "",
    street_address: "",
    city: "",
    state: "",
    zip: "",
    start_date: "",
    outside_corners: "",
    inside_corners: "",
    status: "",
    complete: "",
    comments: "",
    finish_date: "",
  });

  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: "FETCH_PANEL" }), []);

  const store = useSelector((store) => store);

  function handleJobSubmit(event) {
    if (
      jobToAdd.contractor &&
      jobToAdd.street_address &&
      jobToAdd.city &&
      jobToAdd.state &&
      jobToAdd.zip &&
      jobToAdd.start_date &&
      jobToAdd.outside_corners &&
      jobToAdd.inside_corners &&
      jobToAdd.status &&
      jobToAdd.complete &&
      jobToAdd.comments &&
      jobToAdd.finish_date
    ) {
      event.preventDefault();
      dispatch({
        type: "POST_NEW_JOB",
        payload: { ...jobToAdd },
      });
      clearJobForm();
    } else {
      alert("Please fill out all fields!");
    }
  }
  function clearJobForm() {
    setJobToAdd({
      contractor: "",
      street_address: "",
      city: "",
      state: "",
      zip: "",
      start_date: "",
      outside_corners: "",
      inside_corners: "",
      status: "",
      complete: "",
      comments: "",
      finish_date: "",
    });
  }

  const handleJobTextChange = (key) => (event) => {
    setJobToAdd({ ...jobToAdd, [key]: event.target.value });
  };

  return (
    <div>
      <h2></h2>
      <>
        <p>Enter Job Info Below</p>
        <form
          className={classes.root}
          onSubmit={handleJobSubmit}
          autoComplete="off"
        >
          {/* <TextField
            variant="outlined"
            label="user_id"
            onChange={handleJobTextChange("user_id")}
            value={jobToAdd.user_id}
          /> */}
          <TextField
            variant="outlined"
            label="contractor"
            onChange={handleJobTextChange("contractor")}
            value={jobToAdd.contractor}
          />
          <TextField
            variant="outlined"
            label="street_address"
            onChange={handleJobTextChange("street_address")}
            value={jobToAdd.street_address}
          />
          <TextField
            variant="outlined"
            label="city"
            onChange={handleJobTextChange("city")}
            value={jobToAdd.city}
          />
          <TextField
            variant="outlined"
            label="state"
            onChange={handleJobTextChange("state")}
            value={jobToAdd.state}
          />
          <TextField
            variant="outlined"
            label="zip"
            onChange={handleJobTextChange("zip")}
            value={jobToAdd.zip}
          />
          <TextField
            variant="outlined"
            label="start_date"
            onChange={handleJobTextChange("start_date")}
            value={jobToAdd.start_date}
          />
          <TextField
            variant="outlined"
            label="outside_corners"
            onChange={handleJobTextChange("outside_corners")}
            value={jobToAdd.outside_corners}
          />
          <TextField
            variant="outlined"
            label="inside_corners"
            onChange={handleJobTextChange("inside_corners")}
            value={jobToAdd.inside_corners}
          />
          <TextField
            variant="outlined"
            label="status"
            onChange={handleJobTextChange("status")}
            value={jobToAdd.status}
          />
          <TextField
            variant="outlined"
            label="complete"
            onChange={handleJobTextChange("complete")}
            value={jobToAdd.complete}
          />
          <TextField
            variant="outlined"
            multiline
            rows={4}
            label="comments"
            onChange={handleJobTextChange("comments")}
            value={jobToAdd.comments}
          />
          <TextField
            variant="outlined"
            label="finiish_date"
            onChange={handleJobTextChange("finish_date")}
            value={jobToAdd.finish_date}
          />
          <Button variant="outlined" type="submit" color="error">
            Submit
          </Button>
        </form>
      </>
    </div>
  );
}

export default jobInput;
