import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchOneWall(action) {
  const id = action.payload;
  try {
    yield axios.get(`/api/wall/${id}`);
    yield put({ type: "SET_ONE_WALL", payload: wall.data[0] });
  } catch (err) {
    console.log("error in fetchOneWall", err);
  }
}

function* postNewWall(action) {
  const newWall = action.payload;
  try {
    const createdWall = yield axios.post("/api/wall/addWall", newWall);
    yield put({ type: "SET_ONE_WALL", payload: createdWall });
  } catch (err) {
    console.log("error in postNewWall", err);
  }
}
function* wallsSaga() {
  yield takeLatest("POST_NEW_WALL", postNewWall);
  yield takeLatest("FETCH_ONE_WALL", fetchOneWall);
}
export default wallsSaga;
