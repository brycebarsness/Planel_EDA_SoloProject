import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";

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
    <table>
      <caption>Panel Size and Quantity</caption>
      <thead>
        <tr>
          <th>Panel Size (length)</th>
          <th>Quantity</th>
          <th>UPDATE/DELETE</th>
        </tr>
      </thead>
      {wallPanelsPerWall.map((wallPanel, i) => (
        <tr key={i}>
          <td>{wallPanel.panel_id}</td>
          <td>{wallPanel.quantity}</td>
          <td>
            <button> UPDATE </button>
            <button> DELETE </button>
          </td>
        </tr>
      ))}
    </table>
  );
}
export default PanelDetailsPage;
