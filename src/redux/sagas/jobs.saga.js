import { put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchAllJobs() {
  try {
    console.log("in fetchAllJ");
    const allJobs = yield axios.get("/api/job");
    console.log("GET from fetchAllJobs:", allJobs.data);
    yield put({ type: "SET_ALL_JOBS", payload: allJobs.data });
  } catch (err) {
    console.log("error in fetchAllJobs:", err);
  }
}

function* postNewJob(action) {
  const newJob = action.payload;

  try {
    console.log(newJob);
    const createdJob = yield axios.post("/api/job/addjob", newJob);
    yield put({ type: "SET_ONE_JOB", payload: createdJob.data });
  } catch (err) {
    console.log("error in postNewJob", err);
  }
}

function* fetchOneJob(action) {
  const id = action.payload;
  console.log(action.payload, "XXXXXXXXXXXXX");
  try {
    const job = yield axios.get(`/api/job/details/${id}`);
    yield put({ type: "SET_ONE_JOB", payload: job.data[0] });
    // go ahead and fetch all the walls
    // should also fetch wall panels??
    // in other words: what do we need so that your 'details' page
    // is 100% good to go with all data for the given job
    yield put({ type: "FETCH_WALLS_FROM_JOB", payload: job.data[0].id });
    yield put({ type: "FETCH_WALL_PANELS_FROM_JOB", payload: job.data[0].id });
  } catch (err) {
    console.log("error in fetchOneJob", err);
  }
}

function* deleteJob(action) {
  const id = action.payload;
  try {
    console.log("in delete job", id);
    const response = yield axios.delete(`/api/job/delete/${id}`);
  } catch (err) {
    console.log("error in Delete Job:", err);
  }
}

function* jobsSaga() {
  yield takeEvery("DELETE_JOB", deleteJob);
  yield takeLatest("FETCH_ONE_JOB", fetchOneJob);
  yield takeLatest("POST_NEW_JOB", postNewJob);
  yield takeLatest("FETCH_ALL_JOBS", fetchAllJobs);
}
export default jobsSaga;
