import { Action } from '@ngrx/store';

export const ANOTHER_ACTION = '[Feature] Another Action';
export const LOAD_TOPPINGS = '[Feature] Load Toppings';
export const LOAD_TOPPINGS_SUCCESS = '[Feature] Load Toppings Success';
export const LOAD_TOPPINGS_FAIL = '[Feature] Load Toppings Fail';

export class AnotherAction implements Action {
  readonly type = ANOTHER_ACTION;
  constructor(public payload: any) {}
}

export class LoadToppings implements Action {
  readonly type = LOAD_TOPPINGS;
  constructor() {}
}

export class LoadToppingsSuccess implements Action {
  readonly type = LOAD_TOPPINGS_SUCCESS;
  constructor(public payload: string[]) {}
}

export class LoadToppingsFail implements Action {
  readonly type = LOAD_TOPPINGS_FAIL;
  constructor(public payload: any) {}
}

// action types
export type ToppingsAction = AnotherAction | LoadToppings | LoadToppingsFail | LoadToppingsSuccess;
