import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  loaded: boolean;
  loading: boolean;
  pizzas: Pizza[];
}

const initialState: PizzaState = {
  loaded: false,
  loading: false,
  pizzas: []
};

export function reducer(state = initialState, action: fromPizzas.PizzasAction) {
  function reducerInternal() {
    switch (action.type) {
      case fromPizzas.LOAD_PIZZAS: {
        return {
          ...state,
          loaded: false,
          loading: true
        };
      }
      case fromPizzas.LOAD_PIZZAS_SUCCESS: {
        return {
          ...state,
          pizzas: action.payload,
          loaded: true,
          loading: false
        };
      }
      default: {
        return state;
      }
    }
  }

  const newState = reducerInternal();
  console.info('reducer', { oldState: state, action: action, newState });
  return newState;
}

export const getPizzas = (state: PizzaState) => state.pizzas;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
