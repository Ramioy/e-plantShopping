import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import { useState } from 'react';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false)

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((acc, curr) => acc + (curr.quantity * parseInt(curr.cost.slice(1))), 0);
  };

  const handleContinueShopping = (e) => {
    //alert('Functionality to be added for future reference');
    onContinueShopping(e);
  };

  const handleCheckout = () => {
    setShowMessage(!showMessage)
  }



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if(item.quantity > 0) dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * parseInt(item.cost.slice(1));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button title='Cooming soon!!' onClick={() => handleCheckout()} className="get-started-button1">Checkout</button>
        {showMessage && <div className='cooming-soon' style={{display: !showMessage && 'none'}}>
            <p>This option will be <br/> available soon!</p>
          </div>}
      </div>
    </div>
  );
};

export default CartItem;


