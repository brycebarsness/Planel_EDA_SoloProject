const setWallsPerJobReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_WALLS_JOB":
      return action.payload.data;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setWallsPerJobReducer;
