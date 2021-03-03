import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchPanel() {
  try {
    const panel = yield axios.get("/api/panel");
    console.log("GET from fetchPanel:", panel.data);
    yield put({ type: "SET_PANEL", payload: panel.data });
  } catch (err) {
    console.log("error in fetchPanel:", err);
  }
}

function* postPanel(action) {
  const panel = action.payload;
  try {
    console.log(panel);
    yield axios.post("/api/panel", panel);
    yield put({ type: "FETCH_PANEL", payload: panel.data[0] });
  } catch (err) {
    console.log("error in postPanel", err);
  }
}
function* panelsSaga() {
  yield takeLatest("FETCH_PANEL", fetchPanel);
  yield takeLatest("POST_PANEL", postPanel);
}
export default panelsSaga;
