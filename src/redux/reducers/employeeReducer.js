import { ActionTypes } from "../constants/action-types";

const initialSate = {
  employees: [],
};

export const employeeReducer = (state = initialSate, { type, data }) => {
  switch (type) {
    case ActionTypes.SET_EMPLOYEES:
      return { ...state, employees: data };

    default:
      return state;
  }
};
