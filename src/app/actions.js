import { actionTypes } from "./action-types";

export const Login = ({ email, uid, displayName, photoURL }) => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      email: email,
      uid: uid,
      name: displayName,
      photo: photoURL,
    },
  };
};

export const Logout = () => {
  return {
    type: actionTypes.REMOVE_USER,
    payload: null,
  };
};

export const SelectType = ({ type, id }) => {
  return {
    type: actionTypes.SET_TYPE,
    payload: {
      type: type,
      id: id,
    },
  };
};

export const RemoveType = () => {
  return {
    type: actionTypes.REMOVE_TYPE,
    payload: null,
  };
};
