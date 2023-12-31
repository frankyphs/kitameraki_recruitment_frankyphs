import { FETCH_FORM } from "../actions/actionType";
const initialState = {
  leftColumnComponents: [],
  rightColumnComponents: [],
};

const templateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM:
      return {
        ...state,
        leftColumnComponents: action.payload.leftColumnComponents,
        rightColumnComponents: action.payload.rightColumnComponents,
      };
    default:
      return state;
  }
};

export default templateReducer;
