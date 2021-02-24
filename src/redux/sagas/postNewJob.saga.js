import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* postNewJob(action) {
  const newJob = action.payload;
  try {
    yield axios.post("/api/job/addjob", newJob);
    yield put({ type: "FETCH_ONE_JOB", payload: job.data[0] });
  } catch (err) {
    console.log("error in postNewJob", err);
  }
}
function* postNewJobSaga() {
  yield takeLatest("POST_NEW_JOB", postNewJob);
}
export default postNewJobSaga;
