import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PizzaOrderComponent } from './pizza-order/pizza-order.component';
import { Pizza } from '../app/pizza/pizza.model';
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
  providers: [Pizza, Topping],
  bootstrap: [AppComponent]
})
export class AppModule { }
