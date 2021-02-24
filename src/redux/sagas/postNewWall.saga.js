import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postNewWall(action) {
  const newWall = action.payload;
  try {
    yield axios.post("/api/wall/addWall", newWall);
    yield put({ type: "FETCH_ONE_WALL", payload: wall.data[0] });
  } catch (err) {
    console.log("error in postNewWall", err);
  }
}
function* postNewWallSaga() {
  yield takeLatest("POST_NEW_WALL", postNewWall);
}
export default postNewWallSaga;
