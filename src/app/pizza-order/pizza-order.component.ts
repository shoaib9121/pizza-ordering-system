import { Component, OnInit } from '@angular/core';
import { IPizza } from '../pizza/pizza.interface';
import { Pizza } from '../pizza/pizza.model';
import { Topping } from '../topping/topping.model';
import * as $ from 'jquery';
import { ITopping } from '../topping/topping.interface';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {
  constructor(private pizza: Pizza, private topping: Topping) { }
  pizzas: IPizza[];
  toppings: ITopping[];
  offer1;
  offer2;
  offer3;
  lgdiscount;
  mddiscount;
  smdiscount;
  showDiscounted;
  // toppings: any = {
  //   veg: [
  //     {
  //       name: 'Tomatoes',
  //       rate: 1.00
  //     },
  //     {
  //       name: 'Onions',
  //       rate: 0.50
  //     },
  //     {
  //       name: 'Bell pepper',
  //       rate: 1.00
  //     },
  //     {
  //       name: 'Mushrooms',
  //       rate: 1.20
  //     },
  //     {
  //       name: 'Pineapple',
  //       rate: 0.75
  //     }
  //   ],
  //   nonveg: [
  //     {
  //       name: 'Sausage',
  //       rate: 1.00
  //     },
  //     {
  //       name: 'Pepperoni',
  //       rate: 2.00
  //     },
  //     {
  //       name: 'Barbecue chicken',
  //       rate: 3.00
  //     }
  //   ],

  // }

  // pizzaSizes: any = {
  //   small: {
  //     rate: 5.00
  //   },
  //   medium: {
  //     rate: 7.00
  //   },
  //   large: {
  //     rate: 8.00
  //   },
  //   extralarge: {
  //     rate: 9.00
  //   }
  // }

  orderKeys = Object.keys;
  order: any = {
    small: [],
    medium: [],
    large: [],
    extralarge: []
  };

  ngOnInit() {
    this.pizzas = this.pizza.pizzas;
    this.toppings = this.topping.toppings;
    console.log(this.pizzas)
  }

  chooseToppingItem(e, pizza: IPizza, topping: ITopping) {
    let target = e.currentTarget, checked = target.checked;
    let size = pizza["size"].toLowerCase().replace(' ', ''), order = this.order[size];
    if (order.length < 1) {
      const pizzaItem: IPizza = { price: null, size: null, toppings: [] };
      pizzaItem["size"] = pizza["size"];
      pizzaItem["price"] = pizza["price"];
      pizzaItem["toppings"].push(topping);
      order.push(pizzaItem);
    } else {
      order.forEach((item, i) => {
        let toppings = item["toppings"];
        if (toppings.length < 1) { // NO TOPPINGS THEN ADD
          toppings.push(topping);
        } else { // TOPPINGS EXIST
          if (toppings.some(e => e.name != topping.name) && checked) { // TOPPING ENABLED
            toppings.push(topping);
            this.getPrice(this.order[size], size);
            console.log('toppings pushed', toppings)
          }
          else if (!checked) { // TOPPING DISABLED
            let index = toppings.findIndex(i => i.name === topping.name);
            if (index) toppings.splice(index, 1);
            this.getPrice(this.order[size], size);
            console.log('toppings spliced', toppings)
          }
        }
        order[i]["toppings"] = toppings;
      })
    }
    this.checkPromotions(size);
    console.log('order', this.order);
  }

  getQtyFromOrder(size): void {
    size = size.toLowerCase().replace(' ', '');
    return this.order[size].length;
  }

  pizzaQuantity(e, pizza: IPizza) {
    let size = pizza["size"].toLowerCase().replace(' ', '');
    let order = this.order[size], target = e.currentTarget, type = target.getAttribute('data-type');
    if (type === 'increment') {
      if (order.length > 0) {
        let item = order[0];
        order.push(item);
      } else {  // PUSH DEFAULT PIZZA HERE
        const pizzaItem: IPizza = { price: null, size: null, toppings: [] };
        pizzaItem["size"] = pizza["size"];
        pizzaItem["price"] = pizza["price"];
        order.push(pizzaItem);
      }
    }
    else if (type === 'decrement') {
      if (order.length > 0) { // SPLICE ITEM IN ANY CASE
        let item = order[0];
        order.splice(0, 1);
      }
    }
    this.checkPromotions(size);
    console.log('order', this.order);
  }

  getOfferThree() {
    if (this.order.large.length >= 1) {
      let pep = false, bbq = false, matched = [];
      this.order.large.forEach(deal => {
        if ("toppings" in deal) {
          let toppings = deal["toppings"];
          toppings.forEach(topping => {
            if (topping.name.toLowerCase() === 'pepperoni') pep = true;
            if (topping.name.toLowerCase() === 'barbecue chicken') bbq = true;
          })
        }
      })
      if (pep && bbq) { this.offer3 = "Offer 3 - Applied"; }
      else { this.offer3 = null; }

    } else { this.offer3 = null; }
  }

  getOfferTwo() {
    if (this.order.medium.length == 2) {
      this.order.medium.forEach(deal => {
        if ("toppings" in deal) {
          let toppings = deal["toppings"];
          if (toppings.length == 4) {
            this.offer2 = "Offer 2 - Applied";
          } else { this.offer2 = null; }
        }
      })
    } else { this.offer2 = null; }
  }

  getOfferOne() {
    if (this.order.small.length >= 1) {
      this.order.small.forEach(el => {
        if ("toppings" in el) {
          let toppings = el.toppings;
          if (toppings.length == 2) {
            this.offer1 = "Offer 1 - Applied";
          } else { this.offer1 = null; }
        }
      })
    } else { this.offer1 = null; }
  }

  checkPromotions(size) {
    // OFFER 1
    if (size == 'small')
      this.getOfferOne();

    // OFFER 2
    if (size == 'medium')
      this.getOfferTwo();

    // OFFER 3
    if (size == 'large')
      this.getOfferThree();
  }

  getPrice(orderArr, size) {
    let sumPrice = 0, qty = 0, price;
    if (orderArr.length > 0) {
      switch (size) {
        case 'small':
          sumPrice += this.order.small[0].price;
          break;
        case 'medium':
          sumPrice += this.order.medium[0].price;
          break;
        case 'large':
          sumPrice += this.order.large[0].price;
          break;
        case 'extralarge':
          sumPrice += this.order.extralarge[0].price;
          break;
        default:
          sumPrice += 0.00;
      }
      orderArr.forEach((element, i) => {
        qty++;
        if ('price' in element) {
          price = parseFloat(element['price']);
        }
        let toppings = "toppings" in element ? element["toppings"] : [];
        let pep, pepRate, bbq, bbqRate, sumOfPairDeal;
        if (toppings.length > 0) {
          toppings.forEach(topping => {
            if (size == 'large') {
              if (topping.name.toLowerCase() === 'pepperoni') {
                pepRate = parseFloat(topping.price);
                pep = true; // PEPPERONI INCLUDED
              }
              if (topping.name.toLowerCase() === 'barbecue chicken') {
                bbqRate = parseFloat(topping.price);
                bbq = true; // BBQ INCLUDED
              }
              sumPrice += parseFloat(topping.price);
            } else {
              sumPrice += parseFloat(topping.price);
            }
          })
          if (size == 'large') {
            sumOfPairDeal = pepRate + bbqRate;
            if (pep && bbq) {
              this.lgdiscount = (sumPrice - (sumOfPairDeal)) + (sumOfPairDeal / 2); // CALCULATION FOR 50% DISCOUNT IN CASE OF BOTH PEPPERONI AND BBQ CHICKEN
            }
          }
        }
      });
      sumPrice += (price * (qty - 1)); // DEDUCT DEFAULT SIZE RATE FROM NO.OF QUANTITY AS IT HAS ALREADY BEEN ADDED ONCE IN SWITCH CASE ABOVE
    }

    // HANDLE OFFER 3
    if ((orderArr.length > 0 && size == 'large') && this.offer3 && sumPrice > 0) {
      console.log(this.lgdiscount)
      return `<b>AP: $${sumPrice}</b> <br> <b>DP: $${this.lgdiscount.toFixed(2)}</b>`;
      // return `<span class='strike'> $${sumPrice} </span> <b>DP: $${this.lgdiscount.toFixed(2)}</b>`;
    }
    // HANDLE OFFER 2
    else if (this.offer2 && size == 'medium' && sumPrice > 0) {
      this.mddiscount = (9 * qty).toFixed(2);
      this.showDiscounted = true;
      return `<b>AP: $${sumPrice}</b> <br> <b>DP: $ ${this.mddiscount} </b>`;
      // return `<span class='strike'> $${sumPrice} </span> <b>DP: $ ${(9*qty).toFixed(2)} </b>`;
    }
    // HANDLE OFFER 1
    else if (this.offer1 && size == 'small' && sumPrice > 0) {
      this.smdiscount = this.order.small[0].price;
      this.showDiscounted = true;
      return `<b>AP: $${sumPrice}</b> <br> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
      // return `<span class='strike'> $${sumPrice} </span> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
    }
    else {
      return `<b> ${sumPrice == 0 ? "" : '$' + sumPrice.toFixed(2)} </b>`;
    }
  }
}
