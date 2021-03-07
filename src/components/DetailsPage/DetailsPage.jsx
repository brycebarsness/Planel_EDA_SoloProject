import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallInput from "../WallInput/WallInput";
import { Button, ButtonGroup } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
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
  const [updateWall, setUpdateWall] = useState(null);
  const handleWallUpdate = (id) => {
    setUpdateWall({
      id,
    });
  };
  const [toggleWallForm, setToggleWallForm] = useState(false);
  // const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <tbody>
          <tr>
            <th>Job Number</th>
            <td>{newJob.id}</td>
          </tr>
          <tr>
            <th>User Id</th>
            <td>{newJob.user_id}</td>
          </tr>
          <tr>
            <th>Contractor</th>
            <td>{newJob.contractor}</td>
          </tr>
          <tr>
            <th>Street Address</th>
            <td>{newJob.street_address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{newJob.city}</td>
          </tr>
          <tr>
            <th>State</th>
            <td>{newJob.state}</td>
          </tr>
          <tr>
            <th>Zip Code</th>
            <td>{newJob.zip}</td>
          </tr>
          <tr>
            <th>Start Date </th>
            <Moment format="YYYY/MM/DD">
              <td>{newJob.start_date}</td>
            </Moment>
          </tr>
          <tr>
            <th>Outside Corners</th>
            <td>{newJob.outside_corners}</td>
          </tr>
          <tr>
            <th>Inside Corners</th>
            <td>{newJob.inside_corners}</td>
          </tr>
          <tr>
            <th>Status</th>
            <td>{newJob.status}</td>
          </tr>
          <tr>
            <th>Comments</th>
            <td>{newJob.comments}</td>
          </tr>
          <tr>
            <th>Finish Date</th>
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
        <tfooter> </tfooter>
        <tbody>
          {wallsPerJob.map((wall, i) => (
            <tr key={wall.id}>
              <td>{wall.id}</td>
              <td>{wall.length}</td>
              <td>
                <ButtonGroup>
                  <Button
                    color="default"
                    variant="outlined"
                    onClick={() => handlePanelDetails(wall.id)}
                  >
                    Panels
                  </Button>
                  <Button
                    color="default"
                    variant="outlined"
                    onClick={() => handleWallUpdate(wall.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleWallDelete(wall.id)}
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
        onClick={() => setToggleWallForm(true)}
      >
        Add Wall
      </Button>
      {toggleWallForm && (
        <>
          <WallInput
            setToggleWallForm={setToggleWallForm}
            updateWall={updateWall}
            setUpdateWall={setUpdateWall}
          />
        </>
      )}
    </div>
  );
}

export default DetailsPage;
