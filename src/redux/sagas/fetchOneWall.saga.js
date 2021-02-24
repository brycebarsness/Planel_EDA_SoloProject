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
function* fetchOneWallSaga() {
  yield takeLatest("FETCH_ONE_WALL", fetchOneWall);
}
export default fetchOneWallSaga;
