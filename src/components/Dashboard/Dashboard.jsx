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

  const [toggleForm, setToggleForm] = useState(false);
  const [updateJob, setUpdateJob] = useState(null);
  function handleJobUpdate(id) {
    setToggleForm(true);
    setUpdateJob({
      id,
    });
  }

  return (
    <div>
      {/* <h2>Select Add Job to add job</h2> */}
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
                  <TableCell>Panels</TableCell>
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
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell component="th" scope="row">
                      {job.id}
                    </TableCell>
                    <TableCell>{job.panel_sum}</TableCell>
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
                          onClick={() => handleDetails(job.id)}
                        >
                          Walls
                        </Button>

                        <Button
                          color="default"
                          variant="outlined"
                          onClick={() => handleJobUpdate(job.id)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleJobDelete(job.id)}
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

      {toggleForm && (
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
