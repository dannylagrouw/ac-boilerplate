import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { of } from 'rxjs/observable/of';

import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';

@Injectable()
export class PizzasEffects {
  @Effect()
  loadPizzas$ = this.actions$
    .ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
      exhaustMap(() =>
        this.pizzaService
          .getPizzas()
          .pipe(
            map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
            catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
          )
      )
    );

  @Effect()
  createPizza$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      exhaustMap(pizza => this.pizzaService.createPizza(pizza).pipe(
        map(createdPizza => new pizzaActions.CreatePizzaSuccess(createdPizza)),
        catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
      ))
    );

  @Effect({dispatch: false})
  createPizzaSuccess$ = this.actions$
    .ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
      map((action: pizzaActions.CreatePizza) => action.payload),
      tap(pizza => this.router.navigate([`/products/${pizza.id}`]))
    );

  constructor(
    private router: Router,
    private pizzaService: fromServices.PizzasService,
    private actions$: Actions
  ) {}
}
