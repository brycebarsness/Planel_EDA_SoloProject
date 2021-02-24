const setPanelReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PANEL":
      return action.payload;
    default:
      return state;
  }
};
export default setPanelReducer;
