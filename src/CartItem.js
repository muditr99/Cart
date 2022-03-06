import React from 'react';

class CartItem extends React.Component {

    increaseQuantity () {
        // setState form 1
        // this.setState({
        //     qty: this.state.qty + 1,
        // })

        // setState form 2 (async behaviour)
        this.setState((prevState) => {
            return {
                qty: prevState.qty + 1,
            }
        }
        // , () => {
        //     console.log('this.state', this.state);
        // }
        )
    }

    decreaseQuantity = () => {
        const { qty } = this.state; 

        if(qty == 0){
            return;
        }
        this.setState((prevState) => {
            return {
                qty: prevState.qty - 1,
            }
        })
    }

    // testing () {
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('done');
    //         }, 5000)
    //     })

    //     promise.then(() => {
    //         // setState in promise have sync behaviour
    //         this.setState({
    //             qty: 100,
    //         })
    //         console.log('state', this.state);
    //     })
    // }

    render () {
        const { price, title, qty } = this.props.product;
        return (
            <div className='cart-item'>
                <div className='left-block'>
                    <img style = {styles.image} />
                </div>
                <div className='right-block'>
                    <div style = { { fontSize: 25 } }> { title } </div>
                    <div style = { { color: '#777' } }> rs { price } </div>
                    <div style = { { color: '#777' } }> qty: { qty } </div>
                    <div className='cart-item-actions'>
                        {/* buttons */}
                        <img onClick = {() => this.props.onIncreaseQuantity(this.props.product)} alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992651.png" />
                        <img onClick = {() => this.props.onDecreaseQuantity(this.props.product)} alt="decrease" className="action-icons" src="https://cdn-icons.flaticon.com/png/512/2985/premium/2985073.png?token=exp=1646338483~hmac=fc273f04530eac84880fde701365e114" />
                        <img alt="delete" className="action-icons" src="https://cdn-icons.flaticon.com/png/512/2782/premium/2782988.png?token=exp=1646338698~hmac=97d066ed6ebc72f0d4f5b90c3905f6c0" />                    
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    image: {
        height: 110,
        width: 110,
        borderRadius: 4,
        background: '#ccc',
    }
}

export default CartItem;
