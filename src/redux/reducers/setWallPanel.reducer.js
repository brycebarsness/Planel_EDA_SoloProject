const setWallPanelReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_WALL_PANEL":
      console.log("XXXXXXXXXXXXXXXXXXXXXX", action.payload);
      return action.payload.data;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setWallPanelReducer;
