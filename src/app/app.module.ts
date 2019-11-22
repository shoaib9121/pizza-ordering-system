import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { PizzaSmall } from './concrete-classes/pizza-sizes/pizza-small.model';
import { PizzaMedium } from './concrete-classes/pizza-sizes/pizza-medium.model';
// import { Pizza } from '../app/abstractions/pizza.model';
import { Topping } from '../app/topping/topping.model';

@NgModule({
  declarations: [
    AppComponent,
    PizzaOrderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PizzaSmall, PizzaMedium, Topping],
  bootstrap: [AppComponent]
})
export class AppModule { }
