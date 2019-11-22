import { IPizza } from '../../pizza/pizza.interface';
import { Topping } from '../../topping/topping.model';
import { Injectable } from '@angular/core';

@Injectable()
// export class PepperoniTopping extends Topping implements IPizza{
export class PepperoniTopping extends Topping{
    constructor(public pizza, public name, public price) {
        super();
        console.log('Pepperoni Topping constructor:', this.pizza);
    }
    
    getTopping(): any {
        let toppings = this.pizza.toppings();
        Array.prototype.push.apply(toppings, this.name);
        return toppings;
    }
    
    getPrice(): any {
        let prices = this.pizza.price();
        Array.prototype.push.apply(prices, this.price);
        return prices;
    }

}
