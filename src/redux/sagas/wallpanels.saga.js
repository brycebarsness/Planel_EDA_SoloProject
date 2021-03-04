import { put, takeEvery, takeLatest, select } from "redux-saga/effects";
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
    const response = yield axios.post("/api/wallPanel", wallPanel);
    yield put({
      type: "FETCH_WALL_PANEL_WALL",
      payload: wallPanel.wall_id,
    });
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
function* deleteWallPanels(action) {
  const objectOfIds = action.payload;
  console.log(objectOfIds);
  try {
    const response = yield axios.delete(
      `/api/wallPanel/delete/${objectOfIds.wall_panel_id}`
    );

    yield put({
      type: "FETCH_WALL_PANEL_WALL",
      payload: objectOfIds.wall_id,
    });
    // yield put({ type: "FETCH_WALL_PANEL_WALL", payload: id });
  } catch (err) {
    console.log("error in deleteWallPanels:", err);
  }
}
function* updateWallPanel(action) {
  const updates = action.payload;
  const id = action.payload.id;
  console.log(action.payload);
  try {
    console.log("in updateWallPanel", id, updates);
    yield axios.put(`/api/wallPanel/${id}`, updates);
    console.log("in update WallPanels", id);
    yield put({ type: "FETCH_WALL_PANEL_WALL", payload: id });
  } catch (err) {
    console.log("error in update WallPanels:", err);
  }
}

function* wallPanelsSaga() {
  yield takeEvery("UPDATE_WALL_PANEL", updateWallPanel);
  yield takeEvery("DELETE_WALL_PANEL", deleteWallPanels);
  yield takeLatest("FETCH_WALL_PANELS_FROM_JOB", fetchWallPanels);
  yield takeLatest("POST_WALL_PANEL", postWallPanel);
  yield takeLatest("FETCH_WALL_PANEL_WALL", fetchWallPanelWall);
}
export default wallPanelsSaga;
