import { Injectable } from '@angular/core';

import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';
import * as fromServices from '../../services';
import { Actions, Effect } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class ToppingsEffects {
  @Effect()
  loadToppings$ = this.actions$
    .ofType(toppingsActions.LOAD_TOPPINGS)
    .pipe(
      exhaustMap(() =>
        this.toppingsService
          .getToppings()
          .pipe(
            map(toppings => new toppingsActions.LoadToppingsSuccess(toppings)),
            catchError(error => of(new toppingsActions.LoadToppingsFail(error)))
          )
      )
    );

  constructor(private toppingsService: fromServices.ToppingsService, private actions$: Actions) {}
}
