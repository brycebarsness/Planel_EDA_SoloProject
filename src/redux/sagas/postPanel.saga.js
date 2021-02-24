import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* postPanel(action) {
  const panel = action.payload;
  try {
    yield axios.post("/api/panel", panel);
    yield put({ type: "FETCH_PANEL", payload: panel.data[0] });
  } catch (err) {
    console.log("error in postPanel", err);
  }
}
function* postPanelSaga() {
  yield takeLatest("POST_PANEL", postPanel);
}
export default postPanelSaga;
