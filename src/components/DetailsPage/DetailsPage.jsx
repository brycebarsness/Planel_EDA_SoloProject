import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";

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
  // const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  return (
    <div>
      <h2></h2>
      <table>
        <tbody>
          <tr>
            <td>Job Number</td>
            <td>User Id</td>
            <td>Contractor</td>
            <td>Street Address</td>
            <td>City</td>
            <td>State</td>
            <td>Zip Code</td>
            <td>Start Date </td>
            <td>Outside Corners</td>
            <td>Inside Corners</td>
            <td>Status</td>
            <td>Complete</td>
            <td>Comments</td>
            <td>Finish Date</td>
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
        <caption>Panel Size and Quantity by Wall ID</caption>
        <thead>
          <tr>
            <th>Panel Size (length)</th>
            <th>Quantity</th>
            <th>UPDATE/DELETE</th>
          </tr>
        </thead>
        {wallPanelsPerJob.map((wallPanel, i) => (
          <tr key={i}>
            <td>{wallPanel.length}</td>
            <td>{wallPanel.sum}</td>
            <td>
              <button> UPDATE </button>
              <button> DELETE </button>
            </td>
          </tr>
        ))}
      </table>
      <table>
        <caption>Wall ID, Wall Length Per Job</caption>
        <thead>
          <tr>
            <th>Wall ID</th>
            <th>Wall Length</th>
            <th>UPDATE/DELETE</th>
          </tr>
        </thead>
        {wallsPerJob.map((wall, i) => (
          <tr key={wall.id} onClick={() => handlePanelDetails(wall.id)}>
            <td>{wall.id}</td>
            <td>{wall.length}</td>
            <td>
              <button> UPDATE </button>
              <button> DELETE </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DetailsPage;
