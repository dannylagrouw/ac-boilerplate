import { Action } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

export const MY_ACTION = '[Feature] My Action';
export const LOAD_PIZZAS = '[Feature] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Feature] Load Pizzas Fail';
export const LOAD_PIZZAS_SUCCESS = '[Feature] Load Pizzas Success';
export const SELECT_PIZZA = '[Feature] Select Pizza';
export const CREATE_PIZZA = '[Feature] Create Pizza';
export const CREATE_PIZZA_SUCCESS = '[Feature] Create Pizza Success';
export const CREATE_PIZZA_FAIL = '[Feature] Create Pizza Fail';

export class MyAction implements Action {
  readonly type = MY_ACTION;
  constructor(public payload: any) {}
}

export class LoadPizzas implements Action {
  readonly type = LOAD_PIZZAS;
  constructor() {}
}

export class LoadPizzasSuccess implements Action {
  readonly type = LOAD_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class LoadPizzasFail implements Action {
  readonly type = LOAD_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export class SelectPizza implements Action {
  readonly type = SELECT_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizza implements Action {
  readonly type = CREATE_PIZZA;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaSuccess implements Action {
  readonly type = CREATE_PIZZA_SUCCESS;
  constructor(public payload: Pizza) {}
}

export class CreatePizzaFail implements Action {
  readonly type = CREATE_PIZZA_FAIL;
  constructor(public payload: any) {}
}

// action types
export type PizzasAction =
  | MyAction
  | LoadPizzas
  | LoadPizzasSuccess
  | LoadPizzasFail
  | SelectPizza
  | CreatePizza
  | CreatePizzaSuccess
  | CreatePizzaFail;
