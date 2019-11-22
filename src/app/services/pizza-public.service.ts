import { Injectable } from '@angular/core';
import { IPizza } from '../pizza/pizza.interface';
import { PizzaService } from './pizza.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaPublicService implements PizzaService {

  // getPizzas(): IPizza[] {
  //   const pizzas: IPizza[] = [
  //     {
  //       price: 5.00,
  //       size: 'Small'
  //     },
  //     {
  //       price: 7.00,
  //       size: 'Medium'
  //     },
  //     {
  //       price: 8.00,
  //       size: 'Large'
  //     },
  //     {
  //       price: 9.00,
  //       size: 'Extra Large'
  //     },
  //   ];
  //   return pizzas;
  // }
}
