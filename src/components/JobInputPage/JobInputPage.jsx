import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Menu,
  MenuItem,
  Button,
  makeStyles,
  Checkbox,
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
  const panels = useSelector((state) => state.setPanelReducer);
  const newJob = useSelector((state) => state.setOneJobReducer);
  const newWall = useSelector((state) => state.setOneWallReducer);
  const [isChecked, setIsChecked] = useState(panels.slice().fill(false));
  const [jobToAdd, setJobToAdd] = useState({
    user_id: "",
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
  const [wallToAdd, setWallToAdd] = useState({
    job_id: "",
    length: "",
  });
  const [wall_PanelToAdd, setWall_PanelToAdd] = useState({
    wall_id: "",
    panel_id: "",
    quantity: "",
  });
  const [panelToAdd, setPanelToAdd] = useState({
    panel_length: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => dispatch({ type: "FETCH_PANEL" }), []);

  const store = useSelector((store) => store);

  function handleJobSubmit(event) {
    if (
      jobToAdd.user_id &&
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
      user_id: "",
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

  function handlePanelSubmit(event) {
    if (panelToAdd.panel_length) {
      event.preventDefault();
      dispatch({
        type: "POST_PANEL",
        payload: { ...panelToAdd },
      });
      setPanelToAdd({
        panel_length: "",
      });
    }
  }

  function handleWallSubmit(event) {
    if (wallToAdd.length) {
      event.preventDefault();

      dispatch({
        type: "POST_NEW_WALL",
        payload: { ...wallToAdd },
      });

      setWallToAdd({
        length: "",
      });
    } else {
      alert("Please select wall length");
    }
  }

  const handleJobTextChange = (key) => (event) => {
    setJobToAdd({ ...jobToAdd, [key]: event.target.value });
  };
  const handleWallChange = (key) => (event) => {
    setWallToAdd({ ...wallToAdd, [key]: event.target.value });
  };
  const handleWall_PanelChange = (key) => (event) => {
    setWall_PanelToAdd({ ...wall_PanelToAdd, [key]: event.target.value });
  };
  const handlePanelMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [heading, setHeading] = useState("Job Input Page");

  const toggleCheckedPanel = (index, id) => {
    setIsChecked(isChecked.map((check, i) => (i === index ? !check : check)));
    if (panelToAdd.indexOf(id) === -1) {
      setPanelToAdd(id);
    } else {
      setPanelToAdd(panelToAdd.filter((item) => item !== id));
    }
  };

  return (
    <div>
      <h2>{heading}</h2>
      <>
        <p>Enter Job Info Below</p>
        <form
          className={classes.root}
          onSubmit={handleJobSubmit}
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            label="user_id"
            onChange={handleJobTextChange("user_id")}
            value={jobToAdd.user_id}
          />
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

        <p>Enter Panel Info Below</p>
        <form
          className={classes.root}
          onSubmit={handlePanelSubmit}
          autoComplete="off"
        >
          <Button variant="outlined" color="error" onClick={handlePanelMenu}>
            Select Panel Size
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {panels.map((panelItem, i) => {
              return (
                <MenuItem key={panelItem.id}>
                  <Checkbox
                    key={i}
                    checked={isChecked[i]}
                    onClick={() => toggleCheckedPanel(i, panelItem.id)}
                  />
                  {panelItem.name}
                </MenuItem>
              );
            })}
          </Menu>
          <TextField
            variant="outlined"
            label="quantity"
            onChange={handleWall_PanelChange("quantity")}
            value={wall_PanelToAdd.length}
          />
          <Button variant="outlined" type="submit" color="error">
            Submit
          </Button>
        </form>

        <p>Enter Wall Info Below</p>
        <form
          className={classes.root}
          onSubmit={handleWallSubmit}
          autoComplete="off"
        >
          <TextField
            variant="outlined"
            label="length"
            onChange={handleWallChange("length")}
            value={wallToAdd.length}
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
