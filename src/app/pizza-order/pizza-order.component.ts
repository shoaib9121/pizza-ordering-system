import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {
  constructor() { }
  offer1;
  offer2;
  offer3;
  lgdiscount;
  mddiscount;
  showStriked;
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
      rate: 5
    },
    medium: {
      rate: 7
    },
    large: {
      rate: 8
    },
    extralarge: {
      rate: 9
    }
  }

  order: any = {
    small: [],
    medium: [],
    large: [],
    extralarge: []
  };

  ngOnInit() {
  }

  chooseItem(e, obj) {
    let target = e.currentTarget,
      id = target.getAttribute('id'),
      value = target.value,
      checked = target.checked,
      size = target.getAttribute('data-size');
    // console.log(`checked: ${e.currentTarget.checked}, val: ${e.currentTarget.value}, size: ${size}`)
    let item = {
      id: id,
      name: obj.name,
      rate: value,
      checked: checked,
      size: size
    }

    if (item.checked) {
      this.order[size].push(item)
    } else {
      let index;
      let checkItem = this.order[size].find((element, i) => {
        if (element.id === item.id) {
          index = i;
          return element;
        }
      });
      this.order[size].splice(index, 1)
    }
    // console.log(this.order.large)
    this.checkPromotions();
  }

  checkPromotions() {
    // OFFER 1
    if (this.order.medium.length >= 2) {this.offer1 = "Offer 1";} else { this.offer1 = "";}

    // OFFER 3
    if (this.order.large.length >= 4) {
      let pep = false, bbq = false, matched = [];

      this.order.large.forEach(el => {
        if (el.name.toLowerCase() === 'pepperoni') pep = true;
        if (el.name.toLowerCase() === 'barbecue chicken') bbq = true;
      })
      if (pep && bbq) {this.offer3 = "Offer 3";}
      else {this.offer3 = "";}
    } else {this.offer3 = "";}

  }

  getPrice(array, size) {
    let sumPrice = 0;
    if (array.length > 0) {
      switch (size) {
        case 'small':
          sumPrice += 5.00;
          break;
        case 'medium':
          sumPrice += 7.00;
          break;
        case 'large':
          sumPrice += 8.00;;
          break;
        case 'extralarge':
          sumPrice += 9.00;;
          break;
        default:
          sumPrice += 0.00;;
      }

    }

    array.forEach(element => {
      sumPrice += parseFloat(element.rate);
    });

    // HANDLE OFFER 3
    if ((array.length > 0 && size == 'large') && this.offer3 && sumPrice > 0) {
      this.lgdiscount = (sumPrice / 2).toFixed(2);
      console.log(this.lgdiscount)
      sumPrice = sumPrice;
      return `<b>DP: $${this.lgdiscount}</b>`;
      // return `<span class='strike'> $${sumPrice} </span> $${this.lgdiscount}`;
    }
    // HANDLE OFFER 1
    else if (this.offer1 && size == 'medium' && sumPrice > 0) {
      this.mddiscount = (sumPrice - 5).toFixed(2);
      this.showStriked = true;
      return `<b>DP: $${this.mddiscount} </b>`;
      // return `<span class='strike'> $${sumPrice} </span> $${this.mddiscount}`;
    }
    else {
      return `<b> ${sumPrice == 0 ? "" : '$'+sumPrice} </b>`;
    }
  }
}
