import { ITopping } from '../topping/topping.interface';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class Topping {
    name;
    price;
    public getTopping(){
        console.log('this in Topping abstract class', this);
        return this;
    }
    abstract getPrice();
}
