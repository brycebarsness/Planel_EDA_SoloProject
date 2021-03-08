import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Moment from "react-moment";
import WallInput from "../WallInput/WallInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardHeader from "@material-ui/core/CardHeader";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { Button, ButtonGroup } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
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
    setToggleWallForm(true);
    setUpdateWall({
      id,
    });
  };
  const [toggleWallForm, setToggleWallForm] = useState(false);

  // const displayWallPanel = useSelector((state) => state.setWallPanelReducer);
  return (
    <div>
      <h2></h2>
      <Grid container alignItems="stretch">
        <Grid item component={Card} xs>
          <CardContent>
            <CardHeader
              className={"MuiCardHeader-root"}
              title={"Job Details"}
              subheader={newJob.contractor}
              classes={{
                title: "MuiCardHeader-title",
                subheader: "MuiCardHeader-subheader",
              }}
            />
            <CardContent className={"MuiCardContent-root"}>
              <div className={"MuiCardContent-inner"}>
                <Table>
                  <TableRow>
                    <TableHead>Job Number</TableHead>
                    <TableCell>{newJob.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>User Id</TableHead>
                    <TableCell>{newJob.user_id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Contractor</TableHead>
                    <TableCell>{newJob.contractor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Street Address</TableHead>
                    <TableCell>{newJob.street_address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>City</TableHead>
                    <TableCell>{newJob.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableCell>{newJob.state}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Zip Code</TableHead>
                    <TableCell>{newJob.zip}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Start Date</TableHead>
                    <TableCell>
                      <Moment format="YYYY/MM/DD">{newJob.start_date}</Moment>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Outside Corners</TableHead>
                    <TableCell>{newJob.outside_corners}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Inside Corners</TableHead>
                    <TableCell>{newJob.inside_corners}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableCell>{newJob.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Comments</TableHead>
                    <TableCell>{newJob.comments}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHead>Finish Date</TableHead>
                    <TableCell>
                      <Moment format="YYYY/MM/DD">{newJob.finish_date}</Moment>
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </CardContent>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs>
          <CardHeader
            className={"MuiCardHeader-root"}
            title={"Panels"}
            subheader={"6 ft. Standard"}
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
                    <TableCell>Panel Size (inches)</TableCell>
                    <TableCell align-right>Quantity</TableCell>
                  </TableRow>
                </TableHead>

                {wallPanelsPerJob.map((wallPanel, i) => (
                  <TableRow key={i}>
                    <TableCell>{wallPanel.length}</TableCell>
                    <TableCell>{wallPanel.sum}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </div>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Wall ID</TableCell>
                  <TableCell>Wall Length</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallsPerJob.map((wall, i) => (
                  <TableRow key={wall.id}>
                    <TableCell>{wall.id}</TableCell>
                    <TableCell>{wall.length}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
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
          </CardActions>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Panel Size (length)</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        {wallPanelsPerJob.map((wallPanel, i) => (
          <TableRow key={i}>
            <TableCell>{wallPanel.length}</TableCell>
            <TableCell>{wallPanel.sum}</TableCell>
          </TableRow>
        ))}
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Wall ID</TableCell>
            <TableCell>Wall Length</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {wallsPerJob.map((wall, i) => (
            <TableRow key={wall.id}>
              <TableCell>{wall.id}</TableCell>
              <TableCell>{wall.length}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
