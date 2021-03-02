import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchWallPanels() {
  try {
    console.log("in fetchWallPanels");
    const wallPanels = yield axios.get(`/api/wallpanel/job/${id}`);
    console.log("GET from fetchWallPanels", wallPanels.data);
    yield put({ type: "SET_WALL_PANELS", payload: wallPanels.data });
  } catch (err) {
    console.log("error in fetchWallPanels:", err);
  }
}

function* fetchWallPanelsSaga() {
  yield takeLatest("FETCH_WALL_PANELS", fetchWallPanels);
}

export default fetchWallPanelsSaga;
