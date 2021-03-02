const setWallPanelsPerWallReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_WALL_PANELS_WALL":
      console.log("XXXXXXXXXXXXXXXXXXXXXX", action.payload);
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setWallPanelsPerWallReducer;
