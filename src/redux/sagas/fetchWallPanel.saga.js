import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchWallPanelWall() {
  try {
    const wallPanel = yield axios.get("/api/wallPanel/wall/:id");
    console.log("GET from fetchWallPanel:", wallPanel.data);
    yield put({ type: "SET_WALL_PANEL", payload: wallPanel.data });
  } catch (err) {
    console.log("error in fetchWallPanel:", err);
  }
}

function* fetchWallPanelWallSaga() {
  yield takeLatest("FETCH_WALL_PANEL_WALL", fetchWallPanelWall);
}
export default fetchWallPanelWallSaga;
