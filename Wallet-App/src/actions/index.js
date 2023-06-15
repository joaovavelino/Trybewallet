// Coloque aqui suas actions
import requestCurrencies from '../api/api';

export const SAVE_EMAIL = 'SAVE_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_COST = 'ADD_COST';
export const ADD_PRICE = 'ADD_PRICE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  data: currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await requestCurrencies();
    console.log(response);
    return dispatch(receiveCurrencies(response));
  };
}

export const addCost = (data) => ({
  type: ADD_COST,
  data,
}
);

export const updatePrice = (price) => ({
  type: ADD_PRICE,
  total: price,
});
