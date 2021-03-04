import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, makeStyles, ButtonGroup } from "@material-ui/core";

function WallPanelInput(props) {
  const newWall = useSelector((state) => state.setOneWallReducer);

  const [panelToAdd, setPanelToAdd] = useState("");

  const [wall_PanelToAdd, setWall_PanelToAdd] = useState({
    wall_id: newWall.id,
    panel_id: panelToAdd,
    quantity: "",
  });
  const handleWall_PanelChange = (key) => (event) => {
    setWall_PanelToAdd({ ...wall_PanelToAdd, [key]: event.target.value });
  };
  const dispatch = useDispatch();
  function handleWallPanelSubmit(event) {
    if (wall_PanelToAdd.quantity) {
      event.preventDefault();
      dispatch({
        type: "POST_WALL_PANEL",
        payload: {
          wall_id: newWall.id || props.id,
          panel_id: panelToAdd,
          quantity: wall_PanelToAdd.quantity,
        },
      });
      setWall_PanelToAdd({
        quantity: "",
      });
    } else {
      alert("Please select panel quantity");
    }
  }

  function handleWallPanelUpdate(event) {
    console.log("in handleWallPanelUpdate", props.updateWallPanel);
    if (props.updateWallPanel) {
      event.preventDefault();
      dispatch({
        type: "UPDATE_WALL_PANEL",
        payload: {
          id: props.updateWallPanel.id,
          wall_id: newWall.id || props.id,
          panel_id: panelToAdd,
          quantity: wall_PanelToAdd.quantity,
        },
      });
    } else {
      handleWallPanelSubmit(event);
    }
  }
  return (
    <div>
      <form onSubmit={handleWallPanelUpdate} autoComplete="off">
        <p>Enter Panel Info Below</p>

        <ButtonGroup>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(1)}
          >
            36
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(2)}
          >
            30
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(3)}
          >
            24
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(4)}
          >
            18
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(5)}
          >
            12
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(6)}
          >
            8
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(7)}
          >
            6
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(8)}
          >
            4
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(9)}
          >
            2
          </Button>
          <Button
            color="secondary"
            className="inputButton"
            onClick={() => setPanelToAdd(9)}
          >
            1
          </Button>
        </ButtonGroup>

        <p>Panel Length: {panelToAdd}</p>
        <TextField
          variant="outlined"
          label="quantity"
          onChange={handleWall_PanelChange("quantity")}
          value={wall_PanelToAdd.length}
        />
        <Button variant="outlined" type="submit" color="secondary">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default WallPanelInput;
