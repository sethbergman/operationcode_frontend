import React, { Component } from 'react';

const store = (id) => ({ inc, dec, evolve });
const decCount = evolve({ count: dec });
const incCount = evolve({ count: inc });

export default class configureStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: this.id.setState;
      })
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);

  increase() {
    this.setState(incCount);
  }

  decrease() {
    this.setState(decCount);
  }
}
