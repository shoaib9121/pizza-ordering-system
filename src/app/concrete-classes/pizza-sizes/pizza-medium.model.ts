import { IPizza } from '../../pizza/pizza.interface';
import { Pizza } from '../../abstractions/pizza.model';
import { Injectable } from '@angular/core';
import { ITopping } from '../../topping/topping.interface';

@Injectable()
export class PizzaMedium implements IPizza{
    price = 7.00;
    constructor(){
        console.log('PizzaMedium Constructor:', this);
    }
    
    getToppings(): any {
        return ['Delicious Md Crust'];
    }
    
    getPrice(): any {
        console.log('PizzaMedium Price:', this.price);
        return this.price;
    }

}
