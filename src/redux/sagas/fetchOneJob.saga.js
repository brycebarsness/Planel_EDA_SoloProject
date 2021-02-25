import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchOneJob(action) {
  const id = action.payload;
  console.log(action.payload, "XXXXXXXXXXXXX");
  try {
    yield axios.get(`/api/job/${id}`);
    yield put({ type: "SET_ONE_JOB", payload: job.data[0] });
  } catch (err) {
    console.log("error in fetchOneJob", err);
  }
}
function* fetchOneJobSaga() {
  yield takeLatest("FETCH_ONE_JOB", fetchOneJob);
}
export default fetchOneJobSaga;
