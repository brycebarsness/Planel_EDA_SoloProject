import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallPanelInput from "../WallPanelInput/WallPanelInput";

function PanelDetailsPage() {
  const history = useHistory();
  const wallPanelsPerWall = useSelector(
    (state) => state.setWallPanelsPerWallReducer
  );
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch({ type: "FETCH_WALL_PANEL_WALL", payload: id });
  }, []);

  return (
    <p>
      <h2>Wall Length: {wallPanelsPerWall.wall_length}</h2>
      <table>
        <caption>Panel Size and Quantity</caption>
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
            <tr key={i}>
              <td>{wallPanel.wall_panel_quantity}</td>
              <td>{wallPanel.panel_length}</td>
              <td>{wallPanel.wall_length}</td>
              <td>
                <button> UPDATE </button>
                <button> DELETE </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <WallPanelInput id={id} />
    </p>
  );
}
export default PanelDetailsPage;
