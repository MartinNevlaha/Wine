import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../shared/utility";

const initialState = {
  wineId: "",
  totalSum: null,
  wineCategory: "",
  eliminated: false,
  comment: "",
  results: {
    lookClarity: null,
    lookOutOfClarity: null,
    smellPurity: null,
    smellPossitiveIntesity: null,
    smellQuality: null,
    tastePurity: null,
    tastePossitiveIntesity: null,
    tasteHarmonicPersistence: null,
    tasteQuality: null,
    generalImpresion: null,
  },
};

const sumResult = (state, value, btnType) => {
  let sum = 0;
  let wineCategory = null;
  const wineRating = [
    "Vynikajúce",
    "Veľmi dobré",
    "Dobré",
    "Priemerné",
    "Podpriemerné",
  ];
  for (const oldValue in state) {
    // btn was presed, we need remove old value, and add new value
    if (oldValue === btnType && state[oldValue] !== null) {
      sum = sum - state[oldValue];
    }
    sum += state[oldValue];
  }
  sum += value;
  if (sum >= 90) {
    wineCategory = wineRating[0];
  } else if (sum >= 85) {
    wineCategory = wineRating[1];
  } else if (sum >= 80) {
    wineCategory = wineRating[2];
  } else if (sum >= 60) {
    wineCategory = wineRating[3];
  } else if (sum < 60) {
    wineCategory = wineRating[4];
  }
  return [sum, wineCategory];
};
const wineId = (state, action) => {
  return updateObj(state, { wineId: action.wineId });
};

const wineEliminate = (state, action) => {
  return updateObj(state, { eliminated: !action.status });
};

const degustatorComment = (state, action) => {
  return updateObj(state, { comment: action.comment });
};

const degustatorPressBtn = (state, action, sum, wineCategory) => {
  let updateResults = updateObj(state.results, {
    [action.btnType]: action.value,
  });
  let updateState = updateObj(state, {
    wineCategory: wineCategory,
    totalSum: sum,
    results: updateResults,
  });
  return updateObj(state, updateState);
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEGUSTATOR_PRESS_BTN:
      const [sum, wineCategory] = sumResult(
        state.results,
        action.value,
        action.btnType
      );
      return degustatorPressBtn(state, action, sum, wineCategory);
    case actionTypes.WINE_ELIMINATE:
      return wineEliminate(state, action);
    case actionTypes.WINE_ID:
      return wineId(state, action);
    case actionTypes.DEGUSTATOR_COMMENT:
      return degustatorComment(state, action);
    case actionTypes.RESET_RESULTS:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
