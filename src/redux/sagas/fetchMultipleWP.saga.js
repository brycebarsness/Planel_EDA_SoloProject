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

function* fetchAllJobsSaga() {
  yield takeLatest("FETCH_ALL_JOBS", fetchAllJobs);
}
export default fetchAllJobsSaga;
