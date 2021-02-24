import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchWallPanel() {
  try {
    const wallPanel = yield axios.get("/api/wallPanel");
    console.log("GET from fetchWallPanel:", wallPanel.data);
    yield put({ type: "SET_WALL_PANEL", payload: wallPanel.data });
  } catch (err) {
    console.log("error in fetchWallPanel:", err);
  }
}

function* fetchWallPanelSaga() {
  yield takeLatest("FETCH_WALL_PANEL", fetchWallPanel);
}
export default fetchWallPanelSaga;
