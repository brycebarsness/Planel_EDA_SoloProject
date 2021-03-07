import React, { useState, useEffect } from "react";
import "./App.css";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function MaterialTable() {
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
    setUpdateJob({
      id,
    });
  }

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "panel_sum", field: "panel_sum" },
    { title: "contractor", field: "contractor" },
    { title: "street_address", field: "street_address" },
    { title: "city", field: "city" },
    { title: "state", field: "state" },
    { title: "zip", field: "zip" },
    { title: "start_date", field: "start_date" },
    { title: "outside_corners", field: "outside_corners" },
    { title: "inside_corners", field: "inside_corners" },
    { title: "status", field: "status" },
    { title: "complete", field: "complete" },
    { title: "comments", field: "comments" },
    { title: "finish_date", field: "finish_date" },
  ];
  const [data, setData] = useState([]); //table data

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div></div>
          <MaterialTable
            title="User data from remote source"
            columns={columns}
            data={data}
            icons={tableIcons}
            editable={{}}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
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
  </ButtonGroup>;
  {
    toggleForm && (
      <>
        <JobInput
          setToggleForm={setToggleForm}
          updateJob={updateJob}
          setUpdateJob={setUpdateJob}
        />
      </>
    );
  }
}

export default MaterialTable;
