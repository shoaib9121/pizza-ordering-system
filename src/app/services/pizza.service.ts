import { Injectable } from '@angular/core';
import { IPizza } from '../pizza/pizza.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class PizzaService {
  // abstract getPizzas(): IPizza[];
}
