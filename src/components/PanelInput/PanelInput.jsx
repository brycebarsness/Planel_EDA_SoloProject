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
function PanelInput(props) {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_PANEL" }), []);
  const classes = useStyles();
  const store = useSelector((store) => store);

  const [panelToAdd, setPanelToAdd] = useState("");

  const handleChange = (event) => {
    setPanelToAdd({ panel_length: event.target.value });
  };

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

  return (
    <div>
      <h2> </h2>

      <p>Enter Panel Info Below</p>
      <form
        className={classes.root}
        onSubmit={handlePanelSubmit}
        autoComplete="off"
      >
        <ButtonGroup>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 36 })}
          >
            36
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 30 })}
          >
            30
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 28 })}
          >
            28
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 24 })}
          >
            24
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 20 })}
          >
            20
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 14 })}
          >
            14
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 8 })}
          >
            8
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 4 })}
          >
            4
          </Button>
          <Button
            className="inputButton"
            onClick={() => dispatch({ type: "POST_PANEL", payload: 2 })}
          >
            2
          </Button>
        </ButtonGroup>

        <Button variant="outlined" type="submit" color="error">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PanelInput;
