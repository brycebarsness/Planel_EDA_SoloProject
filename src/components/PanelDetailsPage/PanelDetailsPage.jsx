import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallPanelInput from "../WallPanelInput/WallPanelInput";

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
  }, []);

  const handlePanelDelete = (wall_panel_id) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_WALL_PANEL", payload: wall_panel_id });
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
                <button
                  onClick={() => handlePanelUpdate(wallPanel.wall_panel_id)}
                >
                  UPDATE
                </button>
                <button
                  onClick={() => handlePanelDelete(wallPanel.wall_panel_id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <WallPanelInput id={id} updateWallPanel={updateWallPanel} />
    </div>
  );
}
export default PanelDetailsPage;
