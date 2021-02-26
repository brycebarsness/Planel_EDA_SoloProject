const setAllJobsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_JOBS":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setAllJobsReducer;
