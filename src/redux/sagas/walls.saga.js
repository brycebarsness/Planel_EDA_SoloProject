import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
// import { response } from "express";

function* fetchOneWall(action) {
  const id = action.payload;
  try {
    yield axios.get(`/api/wall/${id}`);
    yield put({ type: "SET_ONE_WALL", payload: wall.data[0] });
  } catch (err) {
    console.log("error in fetchOneWall", err);
  }
}

function* fetchWallsByJobId(action) {
  const jobId = action.payload;
  try {
    const response = yield axios.get(`/api/wall/job/${jobId}`);
    yield put({ type: "SET_WALLS_JOB", payload: response.data });
  } catch (err) {
    console.log("error in fetchWallsByJobId", err);
  }
}

function* postNewWall(action) {
  const newWall = action.payload;
  try {
    const createdWall = yield axios.post("/api/wall/addWall", newWall);
    yield put({ type: "SET_ONE_WALL", payload: createdWall });
    yield put({
      type: "FETCH_WALLS_FROM_JOB",
      payload: newWall.job_id,
    });
  } catch (err) {
    console.log("error in postNewWall", err);
  }
}

function* deleteWall(action) {
  const id = action.payload;
  try {
    console.log(id);
    const response = yield axios.delete(`/api/wall/delete/${id}`);
    const jobId = yield select((store) => store.setOneJobReducer.id);
    console.log("in delete Wall", id);
    yield put({
      type: "FETCH_WALLS_FROM_JOB",
      payload: jobId,
    });
    yield put({
      type: "FETCH_WALL_PANELS_FROM_JOB",
      payload: jobId,
    });
  } catch (err) {
    console.log("error in Delete Wall:", err);
  }
}

function* wallsSaga() {
  yield takeEvery("DELETE_WALL", deleteWall);
  yield takeLatest("FETCH_WALLS_FROM_JOB", fetchWallsByJobId);
  yield takeLatest("POST_NEW_WALL", postNewWall);
  yield takeLatest("FETCH_ONE_WALL", fetchOneWall);
}

export default wallsSaga;
