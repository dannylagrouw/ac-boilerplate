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
  switch(action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      console.info('red - load pizzas', state, action);
      return {
        ...state,
        loaded: false,
        loading: true,
      }
    }
    default: {
      return state;
    }
  }
}
