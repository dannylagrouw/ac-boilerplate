import * as fromToppings from '../actions/toppings.action';

export interface ToppingsState {
  loaded: boolean;
  loading: boolean;
  toppings: string[];
}

const initialState: ToppingsState = {
  loaded: false,
  loading: false,
  toppings: []
};

export function reducer(state = initialState, action: fromToppings.ToppingsAction) {
  switch(action.type) {
    case fromToppings.LOAD_TOPPINGS: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fromToppings.LOAD_TOPPINGS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        toppings: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getToppings = (state: ToppingsState) => state.toppings;
