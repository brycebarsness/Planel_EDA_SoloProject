import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";

function DetailsPage() {
  const history = useHistory();
  const store = useSelector((store) => store);

  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_ONE_JOB", payload: id }), []);
  const newJob = useSelector((state) => state.setOneJobReducer);
  let { id } = useParams();
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
    </div>
  );
}

export default DetailsPage;
