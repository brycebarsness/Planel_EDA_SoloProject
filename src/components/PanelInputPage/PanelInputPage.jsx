import React, { useState } from "react";
import { useSelector } from "react-redux";

function PanelInput(props) {
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_PANEL" }), []);

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
      <h2>{heading}</h2>

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

        <TextField
          variant="outlined"
          label="quantity"
          onChange={handleWall_PanelChange("quantity")}
          value={wall_PanelToAdd.length}
        />

        <TextField
          variant="outlined"
          label="user_id"
          onChange={handleWall_PanelChange("wall_id")}
          value={wall_PanelToAdd.wall_id}
        />
        <TextField
          variant="outlined"
          label="user_id"
          onChange={handleWall_PanelChange("panel_id")}
          value={wall_PanelToAdd.panel_id}
        />
        <Button variant="outlined" type="submit" color="error">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PanelInput;
