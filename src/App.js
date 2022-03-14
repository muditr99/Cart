import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";

import { db } from './firebase';
import { collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
 
class App extends React.Component {

  constructor () {
    super();
    this.state = {
        products: [],
        loading : true
        // products: [
        //     {
        //         price: 99,
        //         title: 'Watch',
        //         qty: 1,
        //         img: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        //         id: 1,
        //     },{
        //         price: 999,
        //         title: 'Mobile Phone',
        //         qty: 10,
        //         img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGhvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        //         id: 2,
        //     },{
        //         price: 999,
        //         title: 'Laptop',
        //         qty: 4,
        //         img: 'https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        //         id: 3,
        //     },
        // ]
    }

    // this.testing();
}

componentDidMount () {
  // const ref = collection(db, 'products');
  // getDocs(ref)
  // .then((snapshot) => {
  //   console.log(snapshot);

  //   snapshot.docs.map((doc) => {
  //     console.log(doc.data());
  //   })

  //   const products = snapshot.docs.map((doc) => {
  //     const data = doc.data();
  //     data['id'] = doc.id;
  //     return data;
  //   })

  //   this.setState({
  //     products : products,
  //     loading : false
  //   })
  // })

  // added listener(onSnapshot) to db products collection
  const ref = collection(db, 'products');
  onSnapshot(ref, (snapshot) => {
    console.log(snapshot);

    snapshot.docs.map((doc) => {
      console.log(doc.data());
    })

    const products = snapshot.docs.map((doc) => {
      const data = doc.data();
      data['id'] = doc.id;
      return data;
    })

    this.setState({
      products : products,
      loading : false
    })
  })
}

handleIncreaseQuantity = (product) => {
    // console.log('hey please inc the quantity of', product);

    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //     products: products,
    // })

    const docRef = doc(db, 'products', products[index].id);

    updateDoc(docRef, {
      qty : products[index].qty + 1,
    })
    .then(() => {
      console.log('Updated Successfully');
    })
    .catch((error) => {
      console.log('error in updating product', error);
    })

}

handleDecreaseQuantity = (product) => {
    // console.log('hey please dec the quantity of', product);

    const { products } = this.state;
    const index = products.indexOf(product);

    if(products[index].qty == 0){
        return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //     products: products,
    // })

    const docRef = doc(db, 'products', products[index].id);

    updateDoc(docRef, {
      qty : products[index].qty - 1,
    })
    .then(() => {
      console.log('Updated Successfully');
    })
    .catch((error) => {
      console.log('error in updating product', error);
    })

}

handleDeleteProduct = (id) => {

    const { products } = this.state;

    // const items = products.filter((item) => item.id != id); // [{}, {}, {}]

    // this.setState({
    //     products: items,
    // })

    const docRef = doc(db, 'products', id);

    deleteDoc(docRef)
    .then(() => {
      console.log('Removed Successfully');
    })
    .catch((error) => {
      console.log('error in removing product', error);
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

  addProduct = () => {
    const ref = collection(db, 'products');

    addDoc(ref, {
      img : '',
      qty : 3,
      price : 900,
      title : 'washing machine' 
    })
    .then((docRef) => {
      console.log(docRef);
    })
  }

   render () {
      const { products, loading } = this.state;
      return (
      <div className="App">
        <Navbar count = {this.getCartCount()} />
        <button onClick={this.addProduct} style={ { padding:20, fontSize:20} }>Add a product</button>
        <Cart
        products = {products}
        onIncreaseQuantity = {this.handleIncreaseQuantity}
        onDecreaseQuantity = {this.handleDecreaseQuantity}
        onDeleteProduct = {this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products ...</h1>}
        <div style = { { fontSize : 20, padding : 10 } }>TOTAL: {this.getCartTotal()} </div>
      </div>
      );
    }
  }

export default App;
