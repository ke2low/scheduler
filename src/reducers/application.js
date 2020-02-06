const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

// Reducer which manages functions for initial load and when book/cancel happens
const reducer = (state, action) => {
  switch (action.type) {

    case SET_DAY:
      return { ...state, day: action.day };

    case SET_APPLICATION_DATA:
      return {
        ...state,
        ...action.state,
      };

    case SET_INTERVIEW:
      return {
        ...state,
        appointments: action.appointments,
        days: action.days,
      };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default reducer;