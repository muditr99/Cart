import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

class App extends React.Component {

  constructor () {
    super();
    this.state = {
        products: [
            {
                price: 99,
                title: 'Watch',
                qty: 1,
                img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                id: 1,
            },{
                price: 999,
                title: 'Mobile Phone',
                qty: 10,
                img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
                id: 2,
            },{
                price: 999,
                title: 'Laptop',
                qty: 4,
                img: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                id: 3,
            },
        ]
    }

    // this.testing();
}

handleIncreaseQuantity = (product) => {
    // console.log('hey please inc the quantity of', product);

    const { products } = this.state;
    const index = products.indexOf(product);

    products[index].qty += 1;

    this.setState({
        products: products,
    })

}

handleDecreaseQuantity = (product) => {
    // console.log('hey please dec the quantity of', product);

    const { products } = this.state;
    const index = products.indexOf(product);

    if(products[index].qty == 0){
        return;
    }

    products[index].qty -= 1;

    this.setState({
        products: products,
    })

}

handleDeleteProduct = (id) => {

    const { products } = this.state;

    const items = products.filter((item) => item.id != id); // [{}, {}, {}]

    this.setState({
        products: items,
    })

}

getCartCount = () => {

  const { products } = this.state;

  let count = 0;

  products.forEach((product) => {
    count += product.qty;
  })

  return count;

}

getCartTotal = () => {

    const { products } = this.state;
  
    let cartTotal = 0;
  
    products.forEach((product) => {
        cartTotal += product.price * product.qty;
    })
  
    return cartTotal;
  
  }

   render () {
      const { products } = this.state;
      return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        <Cart
        products = {products}
        onIncreaseQuantity = {this.handleIncreaseQuantity}
        onDecreaseQuantity = {this.handleDecreaseQuantity}
        onDeleteProduct = {this.handleDeleteProduct}
        />
        <div style = { { fontSize : 20, padding : 10 } }>TOTAL: {this.getCartTotal()} </div>
      </div>
      );
    }
  }

export default App;
