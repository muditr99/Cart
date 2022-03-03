import React from 'react';

class CartItem extends React.Component {

    constructor () {
        super();
        this.state = {
            price: 999,
            title: 'phone',
            qty: 1,
            img: '',
        }
    }

    render () {
        const { price, title, qty } = this.state;
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
                        <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/512/992/992651.png" />
                        <img alt="decrease" className="action-icons" src="https://cdn-icons.flaticon.com/png/512/2985/premium/2985073.png?token=exp=1646338483~hmac=fc273f04530eac84880fde701365e114" />
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
