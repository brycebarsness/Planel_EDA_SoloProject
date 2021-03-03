import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchWallPanelWall(action) {
  const wallId = action.payload;
  try {
    const wallPanel = yield axios.get(`/api/wallPanel/wall/${wallId}`);
    console.log("GET from fetchWallPanel:", wallPanel.data);
    yield put({ type: "SET_WALL_PANELS_WALL", payload: wallPanel.data });
  } catch (err) {
    console.log("error in fetch Wall Panel Wall:", err);
  }
}

function* postWallPanel(action) {
  const wallPanel = action.payload;
  try {
    const createdWall_Panel = yield axios.post("/api/wallPanel", wallPanel);
    yield put({ type: "SET_WALL_PANEL", payload: createdWall_Panel });
    // yield put({ type: "SET_WALL_PANEL", payload: createdWall_Panel });
    // "SET_WALL_PANELS";
  } catch (err) {
    console.log("error in post wallPanel", err);
  }
}

function* fetchWallPanels(action) {
  const jobId = action.payload;
  try {
    console.log("in fetchWallPanels");
    const wallPanels = yield axios.get(`/api/wallPanel/job/${jobId}`);
    console.log("GET from fetchWallPanels", wallPanels.data);
    yield put({ type: "SET_WALL_PANELS_JOB", payload: wallPanels.data });
  } catch (err) {
    console.log("error in fetchWallPanels:", err);
  }
}

function* wallPanelsSaga() {
  yield takeLatest("FETCH_WALL_PANELS_FROM_JOB", fetchWallPanels);
  yield takeLatest("POST_WALL_PANEL", postWallPanel);
  yield takeLatest("FETCH_WALL_PANEL_WALL", fetchWallPanelWall);
}
export default wallPanelsSaga;
