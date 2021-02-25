import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

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
function* postNewJobSaga() {
  yield takeLatest("POST_NEW_JOB", postNewJob);
}
export default postNewJobSaga;
