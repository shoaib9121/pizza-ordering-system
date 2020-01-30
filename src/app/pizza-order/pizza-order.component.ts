import { Component, OnInit } from '@angular/core';
import { IPizza } from '../pizza/pizza.interface';
import { Topping } from '../topping/topping.model';
import * as $ from 'jquery';

// PIZZA SIZE CLASSES
import { PizzaMedium } from '../concrete-classes/pizza-sizes/pizza-medium.model';
import { PizzaSmall } from '../concrete-classes/pizza-sizes/pizza-small.model';

// TOPPING CLASSES
import { SausageTopping } from '../concrete-classes/toppings/SausageTopping.model';
import { PepperoniTopping } from '../concrete-classes/toppings/PepperoniTopping.model';
import { timer } from 'rxjs';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {
  // order;
  pizza = {'pizza': null};
  pizzaPackage;
  confirmArrivalTimer:any = undefined;
  confirmArrival:boolean = false;
  constructor() { 
    this.pizza['pizza'] = new PizzaMedium();
    // this.pizza['toppings'] = [];
    // this.pizza['toppings'].push(new SausageTopping(this.pizza['pizza'], 'Sausage', 1.00));
    // this.pizza['toppings'].push(new PepperoniTopping(this.pizza['pizza'], 'Pepperoni', 2.00));

    // this.pizza = new PizzaSmall();
    // this.pizza = new SausageTopping(this.pizza, 'Sausage', 1.00);
    // this.pizza = new PepperoniTopping(this.pizza, 'Pepperoni', 2.00);
    console.log(this.pizza)
  }
  
  clickMe(){
    let seconds = '5';
    // this.confirmArrival = true;
    this.confirmArrivalTimer = seconds;
    localStorage.setItem('confirm_arrival_timer', seconds);
    var timerInterval = setInterval( () => {

      let timerProp = localStorage.getItem('confirm_arrival_timer');
      if(timerProp != null){
        timerProp = JSON.parse(timerProp);
        if(typeof timerProp == 'number'){
          timerProp--;
          this.confirmArrivalTimer = timerProp;
          if(timerProp <= 0 ){
            clearInterval(timerInterval);
            localStorage.removeItem('confirm_arrival_timer');
            // this.confirmArrival = false;
          }else
            localStorage.setItem('confirm_arrival_timer', timerProp);
        }

        console.log('timerProp:', timerProp);
        console.log('confirmArrivalTimer:', this.confirmArrivalTimer);
      }
    }, 1000);
  }
  
  ngOnInit() {
    this.totalPrice();
    // this.allToppings();
  }
  
  allToppings() {
    let toppings = this.pizza.pizza.getTopping();
    // toppings.forEach(item =>{
    // })
    console.log('all toppings :',toppings);
  }

  totalPrice() {
    let sum = 0;
    let prices = this.pizza.pizza.getPrice();
    // prices.forEach(item =>{
    //   sum += item;
    // })
    console.log('total sum:',sum);
  }

  /*//////////////// OLD IMPLEMENTATION ///////////////////*/
  pizzas: IPizza[];
  // toppings: ITopping[];
  // offer1;
  // offer2;
  // offer3;
  // lgdiscount;
  // mddiscount;
  // smdiscount;
  // showDiscounted;
  toppings: any = {
    veg: [
      {
        name: 'Tomatoes',
        rate: 1.00
      },
      {
        name: 'Onions',
        rate: 0.50
      },
      {
        name: 'Bell pepper',
        rate: 1.00
      },
      {
        name: 'Mushrooms',
        rate: 1.20
      },
      {
        name: 'Pineapple',
        rate: 0.75
      }
    ],
    nonveg: [
      {
        name: 'Sausage',
        rate: 1.00
      },
      {
        name: 'Pepperoni',
        rate: 2.00
      },
      {
        name: 'Barbecue chicken',
        rate: 3.00
      }
    ],

  }
  pizzaSizes: any = {
    small: {
      rate: 5.00
    },
    medium: {
      rate: 7.00
    },
    large: {
      rate: 8.00
    },
    extralarge: {
      rate: 9.00
    }
  }

  sizes: any = [
      {
        name: 'small',
        rate: 5.00
      },
      {
        name: 'medium',
        rate: 6.00
      },
      {
        name: 'large',
        rate: 7.00
      },
      {
        name: 'extra large',
        rate: 8.00
      },
      
  ]

  orderKeys = Object.keys;
  order: any = {
    small: [],
    medium: [],
    large: [],
    extralarge: []
  };

  selectTopping(i, j) {
    const topping = this.toppings['nonveg'][i];
    const size = this.sizes[j];
    debugger
  }

  // ngOnInit() {
  //   this.pizzas = this.pizza.pizzas;
  //   this.toppings = this.topping.toppings;
  //   console.log(this.pizzas)
  // }

  // chooseToppingItem(e, pizza: IPizza, topping: ITopping) {
  //   let target = e.currentTarget, checked = target.checked;
  //   let size = pizza["size"].toLowerCase().replace(' ', ''), order = this.order[size];
  //   if (order.length < 1) {
  //     const pizzaItem: IPizza = { price: null, size: null, toppings: [] };
  //     pizzaItem["size"] = pizza["size"];
  //     pizzaItem["price"] = pizza["price"];
  //     pizzaItem["toppings"].push(topping);
  //     order.push(pizzaItem);
  //   } else {
  //     order.forEach((item, i) => {
  //       let toppings = item["toppings"];
  //       if (toppings.length < 1) { // NO TOPPINGS THEN ADD
  //         toppings.push(topping);
  //       } else { // TOPPINGS EXIST
  //         if (toppings.some(e => e.name != topping.name) && checked) { // TOPPING ENABLED
  //           toppings.push(topping);
  //           this.getPrice(this.order[size], size);
  //           console.log('toppings pushed', toppings)
  //         }
  //         else if (!checked) { // TOPPING DISABLED
  //           let index = toppings.findIndex(i => i.name === topping.name);
  //           if (index) toppings.splice(index, 1);
  //           this.getPrice(this.order[size], size);
  //           console.log('toppings spliced', toppings)
  //         }
  //       }
  //       order[i]["toppings"] = toppings;
  //     })
  //   }
  //   this.checkPromotions(size);
  //   console.log('order', this.order);
  // }

  // getQtyFromOrder(size): void {
  //   size = size.toLowerCase().replace(' ', '');
  //   return this.order[size].length;
  // }

  // pizzaQuantity(e, pizza: IPizza) {
  //   let size = pizza["size"].toLowerCase().replace(' ', '');
  //   let order = this.order[size], target = e.currentTarget, type = target.getAttribute('data-type');
  //   if (type === 'increment') {
  //     if (order.length > 0) {
  //       let item = order[0];
  //       order.push(item);
  //     } else {  // PUSH DEFAULT PIZZA HERE
  //       const pizzaItem: IPizza = { price: null, size: null, toppings: [] };
  //       pizzaItem["size"] = pizza["size"];
  //       pizzaItem["price"] = pizza["price"];
  //       order.push(pizzaItem);
  //     }
  //   }
  //   else if (type === 'decrement') {
  //     if (order.length > 0) { // SPLICE ITEM IN ANY CASE
  //       let item = order[0];
  //       order.splice(0, 1);
  //     }
  //   }
  //   this.checkPromotions(size);
  //   console.log('order', this.order);
  // }

  // getOfferThree() {
  //   if (this.order.large.length >= 1) {
  //     let pep = false, bbq = false, matched = [];
  //     this.order.large.forEach(deal => {
  //       if ("toppings" in deal) {
  //         let toppings = deal["toppings"];
  //         toppings.forEach(topping => {
  //           if (topping.name.toLowerCase() === 'pepperoni') pep = true;
  //           if (topping.name.toLowerCase() === 'barbecue chicken') bbq = true;
  //         })
  //       }
  //     })
  //     if (pep && bbq) { this.offer3 = "Offer 3 - Applied"; }
  //     else { this.offer3 = null; }

  //   } else { this.offer3 = null; }
  // }

  // getOfferTwo() {
  //   if (this.order.medium.length == 2) {
  //     this.order.medium.forEach(deal => {
  //       if ("toppings" in deal) {
  //         let toppings = deal["toppings"];
  //         if (toppings.length == 4) {
  //           this.offer2 = "Offer 2 - Applied";
  //         } else { this.offer2 = null; }
  //       }
  //     })
  //   } else { this.offer2 = null; }
  // }

  // getOfferOne() {
  //   if (this.order.small.length >= 1) {
  //     this.order.small.forEach(el => {
  //       if ("toppings" in el) {
  //         let toppings = el.toppings;
  //         if (toppings.length == 2) {
  //           this.offer1 = "Offer 1 - Applied";
  //         } else { this.offer1 = null; }
  //       }
  //     })
  //   } else { this.offer1 = null; }
  // }

  // checkPromotions(size) {
  //   // OFFER 1
  //   if (size == 'small')
  //     this.getOfferOne();

  //   // OFFER 2
  //   if (size == 'medium')
  //     this.getOfferTwo();

  //   // OFFER 3
  //   if (size == 'large')
  //     this.getOfferThree();
  // }

  // getPrice(orderArr, size) {
  //   let sumPrice = 0, qty = 0, price;
  //   if (orderArr.length > 0) {
  //     switch (size) {
  //       case 'small':
  //         sumPrice += this.order.small[0].price;
  //         break;
  //       case 'medium':
  //         sumPrice += this.order.medium[0].price;
  //         break;
  //       case 'large':
  //         sumPrice += this.order.large[0].price;
  //         break;
  //       case 'extralarge':
  //         sumPrice += this.order.extralarge[0].price;
  //         break;
  //       default:
  //         sumPrice += 0.00;
  //     }
  //     orderArr.forEach((element, i) => {
  //       qty++;
  //       if ('price' in element) {
  //         price = parseFloat(element['price']);
  //       }
  //       let toppings = "toppings" in element ? element["toppings"] : [];
  //       let pep, pepRate, bbq, bbqRate, sumOfPairDeal;
  //       if (toppings.length > 0) {
  //         toppings.forEach(topping => {
  //           if (size == 'large') {
  //             if (topping.name.toLowerCase() === 'pepperoni') {
  //               pepRate = parseFloat(topping.price);
  //               pep = true; // PEPPERONI INCLUDED
  //             }
  //             if (topping.name.toLowerCase() === 'barbecue chicken') {
  //               bbqRate = parseFloat(topping.price);
  //               bbq = true; // BBQ INCLUDED
  //             }
  //             sumPrice += parseFloat(topping.price);
  //           } else {
  //             sumPrice += parseFloat(topping.price);
  //           }
  //         })
  //         if (size == 'large') {
  //           sumOfPairDeal = pepRate + bbqRate;
  //           if (pep && bbq) {
  //             this.lgdiscount = (sumPrice - (sumOfPairDeal)) + (sumOfPairDeal / 2); // CALCULATION FOR 50% DISCOUNT IN CASE OF BOTH PEPPERONI AND BBQ CHICKEN
  //           }
  //         }
  //       }
  //     });
  //     sumPrice += (price * (qty - 1)); // DEDUCT DEFAULT SIZE RATE FROM NO.OF QUANTITY AS IT HAS ALREADY BEEN ADDED ONCE IN SWITCH CASE ABOVE
  //   }

  //   // HANDLE OFFER 3
  //   if ((orderArr.length > 0 && size == 'large') && this.offer3 && sumPrice > 0) {
  //     console.log(this.lgdiscount)
  //     return `<b>AP: $${sumPrice}</b> <br> <b>DP: $${this.lgdiscount.toFixed(2)}</b>`;
  //     // return `<span class='strike'> $${sumPrice} </span> <b>DP: $${this.lgdiscount.toFixed(2)}</b>`;
  //   }
  //   // HANDLE OFFER 2
  //   else if (this.offer2 && size == 'medium' && sumPrice > 0) {
  //     this.mddiscount = (9 * qty).toFixed(2);
  //     this.showDiscounted = true;
  //     return `<b>AP: $${sumPrice}</b> <br> <b>DP: $ ${this.mddiscount} </b>`;
  //     // return `<span class='strike'> $${sumPrice} </span> <b>DP: $ ${(9*qty).toFixed(2)} </b>`;
  //   }
  //   // HANDLE OFFER 1
  //   else if (this.offer1 && size == 'small' && sumPrice > 0) {
  //     this.smdiscount = this.order.small[0].price;
  //     this.showDiscounted = true;
  //     return `<b>AP: $${sumPrice}</b> <br> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
  //     // return `<span class='strike'> $${sumPrice} </span> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
  //   }
  //   else {
  //     return `<b> ${sumPrice == 0 ? "" : '$' + sumPrice.toFixed(2)} </b>`;
  //   }
  // }
}
