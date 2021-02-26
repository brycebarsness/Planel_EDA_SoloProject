import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postNewWall(action) {
  const newWall = action.payload;
  try {
    const createdWall = yield axios.post("/api/wall/addWall", newWall);
    yield put({ type: "SET_ONE_WALL", payload: createdWall });
  } catch (err) {
    console.log("error in postNewWall", err);
  }
}
function* postNewWallSaga() {
  yield takeLatest("POST_NEW_WALL", postNewWall);
}
export default postNewWallSaga;
