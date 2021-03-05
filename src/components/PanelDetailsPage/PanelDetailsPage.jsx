import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallPanelInput from "../WallPanelInput/WallPanelInput";
import { TextField, Button, ButtonGroup, makeStyles } from "@material-ui/core";

function PanelDetailsPage() {
  const history = useHistory();
  const wallPanelsPerWall = useSelector(
    (state) => state.setWallPanelsPerWallReducer
  );
  const [updateWallPanel, setUpdateWallPanel] = useState(null);
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch({ type: "FETCH_WALL_PANEL_WALL", payload: id });
  }, [dispatch]);

  const handlePanelDelete = (objectOfIds) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_WALL_PANEL", payload: objectOfIds });
  };
  const handlePanelUpdate = (id) => {
    setUpdateWallPanel({
      id,
      wall_id: "",
      panel_id: "",
      quantity: "",
    });
    console.log(updateWallPanel);
  };
  const [togglePanelForm, setTogglePanelForm] = useState(false);
  return (
    <div>
      {/* <h2>Wall Length: {wallPanelsPerWall.wall_length}</h2> */}
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Panel Size (length)</th>
            <th>Wall Length</th>
            <th>UPDATE/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {wallPanelsPerWall.map((wallPanel, i) => (
            <tr key={wallPanel.wall_panel_id}>
              <td>{wallPanel.wall_panel_quantity}</td>
              <td>{wallPanel.panel_length}</td>
              <td>{wallPanel.wall_length}</td>
              <td>
                <ButtonGroup>
                  <Button
                    variant="outlined"
                    color="default"
                    onClick={() => handlePanelUpdate(wallPanel.wall_panel_id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      handlePanelDelete({
                        wall_panel_id: wallPanel.wall_panel_id,
                        wall_id: wallPanel.wall_id,
                      })
                    }
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        color="default"
        variant="outlined"
        onClick={() => setTogglePanelForm(true)}
      >
        +
      </Button>
      {togglePanelForm && (
        <>
          <WallPanelInput
            setTogglePanelForm={setTogglePanelForm}
            id={id}
            updateWallPanel={updateWallPanel}
            setUpdateWallPanel={setUpdateWallPanel}
          />
        </>
      )}
    </div>
  );
}
export default PanelDetailsPage;
