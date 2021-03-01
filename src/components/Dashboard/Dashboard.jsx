import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
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
import {
  TextField,
  Menu,
  MenuItem,
  Button,
  makeStyles,
  Checkbox,
  Grid,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  ButtonGroup,
} from "@material-ui/core";
import setAllJobsReducer from "../../redux/reducers/setAllJob.reducer";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "50vw",
    },
  },
}));

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Dashboard(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);

  const classes = useStyles();

  const displayAllJob = useSelector((state) => state.setAllJobsReducer);
  const [heading, setHeading] = useState(displayAllJob.length);
  // useEffect(() => {
  //   api
  //     .get("/job")
  //     .then((res) => {
  //       setData(res.data.data);
  //     })
  //     .catch((error) => {
  //       setErrorMessage(["Cannot load user data"]);
  //       setIserror(true);
  //     });
  // }, []);
  useEffect(
    () => setData(displayAllJob),
    // setErrorMessage(["Cannot load user data"]),
    //  setIserror(true),
    []
  );

  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "user_id", field: "user_id" },
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
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  return (
    <div class={classes.root}>
      <h2>Total Jobs: {heading} </h2>
      {/* <h3 className={classes.root}> Click Job For Details</h3> */}
      <MaterialTable
        title="User list from API"
        columns={columns}
        data={data}
        icons={tableIcons}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
      />

      <table>
        <thead>
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
        </thead>

        {displayAllJob.map((job) => (
          <tr key={job.id}>
            <td>{job.id}</td>
            <td>{job.user_id}</td>
            <td>{job.contractor}</td>
            <td>{job.street_address}</td>
            <td>{job.city}</td>
            <td>{job.state}</td>
            <td>{job.zip}</td>
            <td>
              <Moment format="YYYY/MM/DD">{job.start_date}</Moment>
            </td>
            <td>{job.outside_corners}</td>
            <td>{job.inside_corners}</td>
            <td>{job.status}</td>
            <td>{job.complete}</td>
            <td>{job.comments}</td>
            <td>
              <Moment format="YYYY/MM/DD">{job.finish_date}</Moment>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Dashboard;
