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

function* fetchPanelSaga() {
  yield takeLatest("FETCH_PANEL", fetchPanel);
}
export default fetchPanelSaga;
