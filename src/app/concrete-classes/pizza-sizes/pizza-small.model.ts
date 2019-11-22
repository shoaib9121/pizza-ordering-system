import { IPizza } from '../../pizza/pizza.interface';
import { Pizza } from '../../abstractions/pizza.model';
import { Injectable } from '@angular/core';
import { ITopping } from '../../topping/topping.interface';

@Injectable()
export class PizzaSmall implements IPizza{
    price = 6.00;
    constructor(){
        console.log('PizzaSmall Constructor', this);
    }
    
    getToppings(): any {
        return ['Delicious SM Crust'];
    }
    
    getPrice(): any {
        console.log('PizzaSmall Price:', this.price);
        return this.price;
    }

}
