const setOneJobReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ONE_JOB":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setOneJobReducer;
