import * as ActionTypes from '../constants/actionTypes';
import { getNextAvailableColour } from '../util';
import { getCourseIdsFromSlots } from '../reducers/entities_reducer';

const initialState = {
  searchHover: 0,
  courseToColourIndex: {},
  uses12HrTime: false,
  highlightNotifs: false, // add yellow styling to notifications
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INIT_STATE:
      return Object.assign({}, state, { uses12HrTime: action.data.uses12HrTime });
    case ActionTypes.HOVER_SEARCH_RESULT:
      return Object.assign({}, state, { searchHover: action.position });
    case ActionTypes.RECEIVE_TIMETABLES: {
      const courses = action.timetables.length > 0 ?
        getCourseIdsFromSlots(action.timetables[0].slots) : [];

      const courseToColourIndex = {};

      courses.forEach((courseId) => {
        // if this course already had a colour, use that. Otherwise get a new one
        courseToColourIndex[courseId] =
          state.courseToColourIndex[courseId] || getNextAvailableColour(courseToColourIndex);
      });

      return { ...state, courseToColourIndex };
    }
    case ActionTypes.SET_HIGHLIGHT_NOTIFS:
      return Object.assign({}, state, { highlightNotifs: action.highlightNotifs });
    default:
      return state;
  }
};

export default ui;
