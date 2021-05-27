import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardHeader from "@material-ui/core/CardHeader";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import JobInput from "../JobInput/JobInput";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallInput from "../WallInput/WallInput";

import { Button, ButtonGroup } from "@material-ui/core";

function Dashboard(props) {
  const jobs = useSelector((state) => state.setAllJobsReducer);
  const dispatch = useDispatch();
  useEffect(() => dispatch({ type: "FETCH_ALL_JOBS" }), []);
  const history = useHistory();
  const handleDetails = (id) => {
    history.push(`/details/${id}`); // push to details view
  };
  const handleJobDelete = (id) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_JOB", payload: id });
  };

  const [toggleForm, setToggleForm] = useState(false); //state to display form
  const [updateJob, setUpdateJob] = useState(null); // state to allow job edit
  function handleJobUpdate(id) {
    // pass in id from form
    setToggleForm(true); // when true = editable
    setUpdateJob({
      //pass in id
      id,
    });
  }

  return (
    <div>
      <button className="btn" onClick={() => setToggleForm(true)}>
        Add Job
      </button>
      <Card className={"MuiElevatedCard--01"}>
        <CardHeader
          className={"MuiCardHeader-root"}
          title={`Total Jobs: ${jobs.length}`}
          subheader={"Select wall button to add wall"}
          classes={{
            title: "MuiCardHeader-title",
            subheader: "MuiCardHeader-subheader",
          }}
        />
        <CardContent className={"MuiCardContent-root"}>
          <div className={"MuiCardContent-inner"}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Job Number</TableCell>
                  <TableCell>Outside Corners</TableCell>
                  <TableCell>Inside Corners</TableCell>
                  <TableCell>Street Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Zip</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Status </TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Pour Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map((
                  job // display jobs in the table
                ) => (
                  <TableRow key={job.id}>
                    <TableCell component="th" scope="row">
                      {job.id}
                    </TableCell>
                    <TableCell>{job.outside_corners}</TableCell>
                    <TableCell>{job.inside_corners}</TableCell>
                    <TableCell>{job.street_address}</TableCell>
                    <TableCell>{job.city}</TableCell>
                    <TableCell>{job.state}</TableCell>
                    <TableCell>{job.zip}</TableCell>
                    <TableCell>
                      <Moment format="YYYY/MM/DD">{job.start_date}</Moment>
                    </TableCell>
                    <TableCell>{job.status}</TableCell>
                    <TableCell>{job.comments}</TableCell>
                    <TableCell>
                      <Moment format="YYYY/MM/DD">{job.finish_date}</Moment>
                    </TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          color="default"
                          variant="outlined"
                          onClick={() => handleDetails(job.id)} // pushes to details to add wall etc
                        >
                          Walls
                        </Button>

                        <Button
                          color="default"
                          variant="outlined"
                          onClick={() => handleJobUpdate(job.id)} //makes job editable and opens form
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleJobDelete(job.id)} //passes job id for delete
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {toggleForm && ( //form opened on add new job or edit job,
        //pass in props to close form and end edit
        <>
          <JobInput
            setToggleForm={setToggleForm}
            updateJob={updateJob}
            setUpdateJob={setUpdateJob}
          />
        </>
      )}
    </div>
  );
}
export default Dashboard;
