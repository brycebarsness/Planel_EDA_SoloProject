import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallInput from "../WallInput/WallInput";

/*

  1. Get redux in shape, so that you confirm all data is good when the this component loads (job, walls, wall panels, panels)
  2. Show info on this job (like in a little summary table up top)
  3. Show all walls in a table format
  4. Show all wall panels in a table format
  5. When adding a new wall, just POST to the API and refresh the job (which will in turn refresh the wall list)
  6. When you select a wall, it sets that wall as the 'active' wall (redux or local state, up to you)
    - conditional rendering: if a wall is selected, show the new panel form
    - when a new panel is added, it is automatically associated with the selected wall
    - when adding a new wall panel, do the POST request, refresh the current job (which will in turn refresh the walls list and wall panels list).
      --> component will update automatically if set up correctly
  7. Show all calculations as needed, if the above is all working calculations should auto-adjust
*/

function DetailsPage() {
  const history = useHistory();
  // const store = useSelector((store) => store);
  const newJob = useSelector((state) => state.setOneJobReducer);
  const wallPanelsPerJob = useSelector(
    (state) => state.setWallPanelsPerJobReducer
  );
  const wallsPerJob = useSelector((state) => state.setWallsPerJobReducer);

  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_ONE_JOB", payload: id });
  }, []);

  const handlePanelDetails = (id) => {
    history.push(`/paneldetails/${id}`); // push to details view
  };
  const handleWallDelete = (id) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_WALL", payload: id });
  };
  // const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <tbody>
          <tr>
            <th>Job Number</th>
            <th>User Id</th>
            <th>Contractor</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Start Date </th>
            <th>Outside Corners</th>
            <th>Inside Corners</th>
            <th>Status</th>
            <th>Complete</th>
            <th>Comments</th>
            <th>Finish Date</th>
          </tr>
          <tr>
            <td>{newJob.id}</td>
            <td>{newJob.user_id}</td>
            <td>{newJob.contractor}</td>
            <td>{newJob.street_address}</td>
            <td>{newJob.city}</td>
            <td>{newJob.state}</td>
            <td>{newJob.zip}</td>

            <Moment format="YYYY/MM/DD">
              <td>{newJob.start_date}</td>
            </Moment>

            <td>{newJob.outside_corners}</td>
            <td>{newJob.inside_corners}</td>
            <td>{newJob.status}</td>
            <td>{newJob.complete}</td>
            <td>{newJob.comments}</td>
            <td>
              <Moment format="YYYY/MM/DD">{newJob.finish_date}</Moment>
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Panel Size (length)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        {wallPanelsPerJob.map((wallPanel, i) => (
          <tr key={i}>
            <td>{wallPanel.length}</td>
            <td>{wallPanel.sum}</td>
          </tr>
        ))}
      </table>
      <table>
        <thead>
          <tr>
            <th>Wall ID</th>
            <th>Wall Length</th>
            <th>UPDATE/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {wallsPerJob.map((wall, i) => (
            <tr key={wall.id}>
              <td>{wall.id}</td>
              <td>{wall.length}</td>
              <td>
                <button onClick={() => handlePanelDetails(wall.id)}>
                  Edit
                </button>
                <button onClick={() => handleWallDelete(wall.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <WallInput />
    </div>
  );
}

export default DetailsPage;
