import { IPizza } from '../../pizza/pizza.interface';
import { Topping } from '../../topping/topping.model';
import { Injectable } from '@angular/core';

@Injectable()
// export class SausageTopping extends Topping implements IPizza{
export class SausageTopping extends Topping{
    constructor(public pizza, public name, public price) {
        super();
        console.log('Sausage Topping constructor:', this.pizza);
    }
    
    getTopping(): any {
        let toppings = this.pizza.getToppings();
        Array.prototype.push.apply(toppings, this.name);
        return toppings;
    }
    
    getPrice(): any {
        let prices = this.pizza.getPrice();
        Array.prototype.push.apply(prices, this.price);
        return prices;
    }

}
