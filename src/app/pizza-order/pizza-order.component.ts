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

  order: any = {
    small: [],
    medium: [],
    large: [],
    extralarge: []
  };

  ngOnInit() {
    this.pizzas = this.pizza.pizzas;
    this.toppings = this.topping.toppings;
    // console.log('pizzas', this.pizzas);
    // console.log('toppings', this.toppings);
  }

  chooseToppingItem(e, pizza:IPizza, topping:ITopping) {
    let target = e.currentTarget, checked = target.checked;
    let size = pizza["size"].toLowerCase();
    if(this.order[size].length<1){
      const pizzaItem:IPizza = {price: null, size: null, topping: []};
      pizzaItem["size"] = pizza["size"];
      pizzaItem["price"] = pizza["price"];
      pizzaItem["topping"].push(topping)
      this.order[size].push(pizzaItem)
    }else{
      this.order[size].forEach(item=>{
        let toppings = item["topping"];
        if (toppings.some(e => e.name != topping.name) && checked) {
          toppings.push(topping);
          console.log('toppings pushed', toppings)
        }
        else if(!checked){
          let index = toppings.findIndex(i => i.name === topping.name);
          if(index) toppings.splice(index,1);
          console.log('toppings spliced', toppings)
        }
      })
    }
    console.log('order', this.order);
    
  }

  // chooseToppingItem(e, obj) {
  //   let target = e.currentTarget,
  //     id = target.getAttribute('id'),
  //     value = target.value,
  //     checked = target.checked,
  //     size = target.getAttribute('data-size');
  //   // console.log(`checked: ${e.currentTarget.checked}, val: ${e.currentTarget.value}, size: ${size}`)
  //   let item = {
  //     id: id,
  //     name: obj.name,
  //     rate: value,
  //     checked: checked,
  //     size: size
  //   }

  //   if (item.checked) {
  //     this.order[size].forEach((val, i) => {
  //       this.order[size][i].toppings.push(item)
  //     })
  //   } else {
  //     let index;
  //     let checkItem = this.order[size][0]["toppings"].find((element, j) => {
  //       if (element.id === item.id) {
  //         index = j;
  //         return element;
  //       }
  //     });
  //     this.order[size].forEach((val, k) => {
  //       this.order[size][k].toppings.splice(index, 1)
  //     })
  //   }
  //   console.log(this.order.medium)
  //   this.checkPromotions();
  // }

  pizzaQuantity(e){

  }

  plusminus(e) {
    let target = e.currentTarget;
    let parent = $(target).parents('.quantity-btns');
    let size = target.getAttribute('data-field');
    let type = target.getAttribute('data-type');
    var input = parent.find("input[name='" + size + "']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
      if (type == 'minus') {

        if (currentVal > input.attr('min')) {
          currentVal--;
          input.val(currentVal).change();
          this.orderQuantity(size, currentVal, type)
        }
        if (parseInt(input.val()) == input.attr('min')) {
          $(this).attr('disabled', true);
        }

      } else if (type == 'plus') {

        if (currentVal < input.attr('max')) {
          currentVal++;
          input.val(currentVal).change();
          this.orderQuantity(size, currentVal, type)
        }
        if (parseInt(input.val()) == input.attr('max')) {
          $(this).attr('disabled', true);
        }
      }
      this.checkPromotions();
    } else {
      input.val(0);
    }

  }

  orderQuantity(size, currentVal, type) {
    if (type == 'plus') {
      var cloneDeal = JSON.parse(JSON.stringify(this.order[size]));
      if (cloneDeal.length > 0) {
        this.order[size].push(cloneDeal[0]);
      } else { // NO TOPPING ADDED BY DEFAULT
        this.order[size].push({
          rate: this.pizzaSizes[size].rate,
          toppings: []
        });
      }
    } else {
      this.order[size].splice(0, 1);
      if (this.order[size].length == 0) {
        let els = document.getElementsByClassName(size + '-checkbox');
        console.log('els', els)
        Array.prototype.forEach.call(els, function (el, i) {
          el.checked = false;
        });
      }
    }
    // console.log(this.order)
  }

  checkPromotions() {
    // OFFER 1
    if (this.order.small.length >= 1) {
      this.order.small.forEach(el => {
        if ('toppings' in el) {
          let toppings = el.toppings;
          if (toppings.length == 2) {
            this.offer1 = "Offer 1 - Applied";
          } else { this.offer1 = null; }
        }
      })
    } else { this.offer1 = null; }

    // OFFER 2
    if (this.order.medium.length == 2) {
      this.order.medium.forEach(deal => {
        if ('toppings' in deal) {
          let toppings = deal.toppings;
          if (toppings.length == 4) {
            this.offer2 = "Offer 2 - Applied";
          } else { this.offer2 = null; }
        }
      })
    } else { this.offer2 = null; }

    // OFFER 3
    if (this.order.large.length >= 1) {
      let pep = false, bbq = false, matched = [];
      this.order.large.forEach(deal => {
        if ('toppings' in deal) {
          let toppings = deal.toppings;
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

  getPrice(orderArr, size) {
    let sumPrice = 0, qty = 0, rate;
    if (orderArr.length > 0) {
      switch (size) {
        case 'small':
          sumPrice += this.pizzaSizes.small.rate;
          break;
        case 'medium':
          sumPrice += this.pizzaSizes.medium.rate;
          break;
        case 'large':
          sumPrice += this.pizzaSizes.large.rate;
          break;
        case 'extralarge':
          sumPrice += this.pizzaSizes.extralarge.rate;
          break;
        default:
          sumPrice += 0.00;
      }
      orderArr.forEach((element, i) => {
        qty++;
        if ('rate' in element) {
          rate = parseFloat(element['rate']);
        }
        let toppings = 'toppings' in element ? element.toppings : [];
        let pep, pepRate, bbq, bbqRate, sumOfPairDeal;
        if (toppings.length > 0) {
          toppings.forEach(topping => {
            if (size == 'large') {
              if (topping.name.toLowerCase() === 'pepperoni') {
                pepRate = parseFloat(topping.rate);
                pep = true;
              }
              if (topping.name.toLowerCase() === 'barbecue chicken') {
                bbqRate = parseFloat(topping.rate);
                bbq = true;
              }
              sumPrice += parseFloat(topping.rate);
            } else {
              sumPrice += parseFloat(topping.rate);
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
      sumPrice += (rate * (qty - 1)); // DEDUCT DEFAULT SIZE RATE FROM NO.OF QUANTITY AS IT HAS ALREADY BEEN ADDED ONCE IN SWITCH CASE ABOVE
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
      this.smdiscount = this.pizzaSizes.small.rate;
      this.showDiscounted = true;
      return `<b>AP: $${sumPrice}</b> <br> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
      // return `<span class='strike'> $${sumPrice} </span> <b>DP: $${this.smdiscount.toFixed(2)} </b>`;
    }
    else {
      return `<b> ${sumPrice == 0 ? "" : '$' + sumPrice.toFixed(2)} </b>`;
    }
  }
}
