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
function WallPanelInput(props) {
  const panels = useSelector((state) => state.setPanelReducer);
  const newWall = useSelector((state) => state.setOneWallReducer);
  const classes = useStyles();
  const [wall_PanelToAdd, setWall_PanelToAdd] = useState({
    wall_id: newWall,
    panel_id: panels,
    quantity: "",
  });
  const handleWall_PanelChange = (key) => (event) => {
    setWall_PanelToAdd({ ...wall_PanelToAdd, [key]: event.target.value });
  };

  function handleWallPanelSubmit(event) {
    const dispatch = useDispatch();
    if (wall_PanelToAdd.quantity) {
      event.preventDefault();
      dispatch({
        type: "POST_WALL_PANEL",
        payload: { ...wall_PanelToAdd },
      });
      setWallPanelToAdd({
        quantity: "",
      });
    } else {
      alert("Please select panel quantity");
    }
  }
  return (
    <div>
      <form
        className={classes.root}
        onSubmit={handleWallPanelSubmit}
        autoComplete="off"
      >
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
    </div>
  );
}

export default WallPanelInput;