import { Injectable } from '@angular/core';

@Injectable()
export abstract class Pizza {
    // price;
    // toppings?;
    // constructor(public price, public toppings?){
    constructor(){

    }
    abstract getToppings();
    abstract getPrice();
}
