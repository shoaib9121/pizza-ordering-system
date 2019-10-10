import { IPizza } from '../pizza/pizza.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class Pizza {
    pizzas: IPizza[] = [
        {
            price: 5.00,
            size: 'Small'
        },
        {
            price: 7.00,
            size: 'Medium'
        },
        {
            price: 8.00,
            size: 'Large'
        },
        {
            price: 9.00,
            size: 'Extra Large'
        },
    ]; 
    constructor(){}
}
