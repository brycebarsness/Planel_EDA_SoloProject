import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postWallPanel(action) {
  const wallPanel = action.payload;
  try {
    yield axios.post("/api/wallPanel", wallPanel);
    yield put({ type: "FETCH_WALL_PANEL", payload: wallPanel.data[0] });
  } catch (err) {
    console.log("error in post wallPanel", err);
  }
}
function* postWallPanelSaga() {
  yield takeLatest("POST_WALL_PANEL", postWallPanel);
}
export default postWallPanelSaga;
