// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_COST, RECEIVE_CURRENCIES, ADD_PRICE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  prices: [],
};

const lastId = (array) => (
  array.reduce((acc, cur) => Math.max(acc, cur.id), 0)
);

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_COST:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length > 0 ? lastId([...state.expenses]) + 1 : 0,
          ...action.data },
      ],
    };
  case RECEIVE_CURRENCIES:
    console.log(action.data);
    return {
      ...state,
      currencies: Object.keys(action.data),
    };
  case ADD_PRICE:
    return {
      ...state,
      prices: [...state.prices,
        { id: state.prices.length > 0 ? lastId([...state.prices]) + 1 : 0,
          ...action.total }],
    };
  default:
    return state;
  }
}

export default wallet;
