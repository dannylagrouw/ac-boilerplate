import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import { ToppingsService } from '../../services/toppings.service';

import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import * as fromPizzas from '../../store/actions/pizzas.action';
import * as fromToppings from '../../store/actions/toppings.action';
import {Observable} from 'rxjs/Observable';
import {map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'product-item',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="selected$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {
  selected$: Observable<Pizza>;
  toppings$: Observable<string[]>;
  pizza$: Observable<Pizza>;

  constructor(
    private pizzaService: PizzasService,
    private toppingsService: ToppingsService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {
    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   const param = this.route.snapshot.params.id;
    //   let pizza;
    //   if (param === 'new') {
    //     pizza = {};
    //   } else {
    //     pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
    //   }
    //   this.pizza = pizza;
    //   this.toppingsService.getToppings().subscribe(toppings => {
    //     this.toppings = toppings;
    //   });
    // });
    //
    this.selected$ = this.store.select(fromStore.getSelectedPizza);
    // this.store.dispatch(new fromPizzas.SelectPizza(this.pizza));

    this.pizza$ = this.route.params.pipe(
      switchMap(params => {
        if (params.id === 'new') {
          this.store.dispatch(new fromPizzas.SelectPizza({}));
          return of({});
        } else {
          return this.store.select(fromStore.getPizzas).pipe(
            map(pizzas => pizzas.find(pizza => pizza.id.toString() === params.id)),
            tap(pizza => this.store.dispatch(new fromPizzas.SelectPizza(pizza)))
          );
        }
      })
    );

    this.toppings$ = this.store.select(fromStore.getToppings);
  }

  onSelect(event: Pizza) {
    this.store.dispatch(new fromPizzas.SelectPizza(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromPizzas.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromPizzas.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromPizzas.DeletePizza(event));
    }
  }
}
