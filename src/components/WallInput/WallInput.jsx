import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, ButtonGroup, makeStyles } from "@material-ui/core";

function WallInput(props) {
  const newJob = useSelector((store) => store.setOneJobReducer);

  console.log(newJob);
  const [wallToAdd, setWallToAdd] = useState({
    job_id: newJob.id,
    length: "",
  });
  const dispatch = useDispatch();
  function handleWallSubmit(event) {
    if (wallToAdd) {
      event.preventDefault();
      dispatch({
        type: "POST_NEW_WALL",
        payload: {
          job_id: newJob.id,
          length: wallToAdd.length,
        },
      });
      setWallToAdd({
        length: "",
      });
    } else {
      alert("Please select wall length");
    }
  }

  const handleWallChange = (key) => (event) => {
    setWallToAdd({ ...wallToAdd, [key]: event.target.value });
  };
  function handleWalllUpdate(event) {
    console.log("in handleWallUpdate", props.updateWall);
    if (props.updateWall) {
      event.preventDefault();
      dispatch({
        type: "UPDATE_WALL",
        payload: {
          id: props.updateWall.id,
          job_id: newJob.id,
          length: wallToAdd.length,
        },
      });
      props.setUpdateWall(null);
    } else {
      handleWallSubmit(event);
    }
  }

  return (
    <div>
      <p>Enter Wall Info Below</p>
      <form onSubmit={handleWalllUpdate} autoComplete="off">
        <TextField
          variant="outlined"
          label="length"
          onChange={handleWallChange("length")}
          value={wallToAdd.length}
        />
        <ButtonGroup>
          <Button variant="outlined" type="submit" color="default">
            Submit
          </Button>
          <Button
            onClick={() => props.setToggleWallForm(false)}
            variant="outlined"
            color="secondary"
          >
            Close
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}

export default WallInput;
