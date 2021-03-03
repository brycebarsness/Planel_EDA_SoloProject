import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import jobsSaga from "./jobs.saga.js";
import wallsSaga from "./walls.saga.js";
import panelsSaga from "./panels.saga.js";
import wallPanelsSaga from "./wallpanels.saga";
// import fetchPanelSaga from "./fetchPanel.saga";
// import postPanelSaga from "./postPanel.saga";
// import fetchWallPanelSaga from "./fetchWallPanel.saga";
// import postWallPanelSaga from "./postWallPanel.saga";
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    // fetchWallPanelSaga(),
    // postWallPanelSaga(),
    // postPanelSaga(),
    // fetchPanelSaga(),
    panelsSaga(),
    jobsSaga(),
    wallsSaga(),
    wallPanelsSaga(),
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
  ]);
}
