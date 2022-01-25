import { actionTypes } from "../action-types";

const initialState = {
  type: null,
};

export const typeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TYPE:
      return { ...state, type: { ...state.type, ...action.payload } };
    case actionTypes.REMOVE_TYPE:
      return { ...state, type: action.payload };
    default:
      return state;
  }
};
