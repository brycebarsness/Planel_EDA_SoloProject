import { put, takeLatest } from "redux-saga/effects";
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
  } catch (err) {
    console.log("error in fetchOneJob", err);
  }
}

function* jobsSaga() {
  yield takeLatest("FETCH_ONE_JOB", fetchOneJob);
  yield takeLatest("POST_NEW_JOB", postNewJob);
  yield takeLatest("FETCH_ALL_JOBS", fetchAllJobs);
}
export default jobsSaga;
