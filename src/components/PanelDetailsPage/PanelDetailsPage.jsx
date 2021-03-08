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
import WallPanelInput from "../WallPanelInput/WallPanelInput";

import { Button, ButtonGroup, CardActions } from "@material-ui/core";

function PanelDetailsPage(props) {
  const history = useHistory();
  const wallPanelsPerWall = useSelector(
    (state) => state.setWallPanelsPerWallReducer
  );
  const [updateWallPanel, setUpdateWallPanel] = useState(null);
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    dispatch({ type: "FETCH_WALL_PANEL_WALL", payload: id });
  }, [dispatch]);

  const handlePanelDelete = (objectOfIds) => {
    // dispatch type delete payload wall_panel_id
    dispatch({ type: "DELETE_WALL_PANEL", payload: objectOfIds });
  };
  const handlePanelUpdate = (id) => {
    setTogglePanelForm(true);
    setUpdateWallPanel({
      id,
      wall_id: "",
      panel_id: "",
      quantity: "",
    });
    console.log(updateWallPanel);
  };
  const [togglePanelForm, setTogglePanelForm] = useState(false);
  return (
    <div>
      <button className="btn" onClick={() => setToggleForm(true)}>
        Add Job
      </button>
      <Card className={"MuiElevatedCard--01"}>
        <CardHeader
          className={"MuiCardHeader-root"}
          title={"Panel Details"}
          subheader={"Per Wall"}
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
                  <TableCell>Quantity</TableCell>
                  <TableCell>Wall Length (feet)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wallPanelsPerWall.map((wallPanel) => (
                  <TableRow key={wallPanel.wall_panel_id}>
                    <TableCell component="th" scope="row">
                      {wallPanel.panel_length}
                    </TableCell>
                    <TableCell>{wallPanel.wall_panel_quantity}</TableCell>
                    <TableCell>{wallPanel.wall_length}</TableCell>

                    <TableCell>
                      <ButtonGroup>
                        <Button
                          variant="outlined"
                          color="default"
                          onClick={() =>
                            handlePanelUpdate(wallPanel.wall_panel_id)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() =>
                            handlePanelDelete({
                              wall_panel_id: wallPanel.wall_panel_id,
                              wall_id: wallPanel.wall_id,
                            })
                          }
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
        <CardActions>
          <button className="btn" onClick={() => setTogglePanelForm(true)}>
            Add Panel
          </button>

          {togglePanelForm && (
            <>
              <WallPanelInput
                setTogglePanelForm={setTogglePanelForm}
                id={id}
                updateWallPanel={updateWallPanel}
                setUpdateWallPanel={setUpdateWallPanel}
              />
            </>
          )}
        </CardActions>
      </Card>
      {/* <button className="btn" onClick={() => setTogglePanelForm(true)}>
        Add Panel
      </button>

      {togglePanelForm && (
        <>
          <WallPanelInput
            setTogglePanelForm={setTogglePanelForm}
            id={id}
            updateWallPanel={updateWallPanel}
            setUpdateWallPanel={setUpdateWallPanel}
          />
        </>
      )} */}
    </div>
  );
}
export default PanelDetailsPage;
