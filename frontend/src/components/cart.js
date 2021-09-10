import React, { useEffect, useState } from 'react';
import UserDataService from '../services/user';
import { TextField } from '@material-ui/core';

function Cart(props) {

  const initialCartState = {
    cartArray: [],
    itemsInCart: 0
  }

  const [cart, setCart] = useState(initialCartState);
  const [newItem, setNewItem] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('')

  
  const getCart = () => {
    //console.log("from get cart " + props.user.name)
    UserDataService.getCart('beau')
    .then(res => {
      console.log(res.data)
      setCart(res.data);
    })
    .catch(e => {
      console.error(e);
    });
  }

  useEffect(() => {
    getCart();
  }, []);

  const handleDecrease = (i) => { 
    if (cart.cartArray[i].quantity > 0) {
      const clone = {...cart};
      clone.cartArray[i].quantity--;

      const data = {
        user_id: props.user.id,
        cart_id: cart.cartArray[i]._id,
        quantity: clone.cartArray[i].quantity.toString()
      }
      setCart(clone);
      UserDataService.updateCart(data)
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.error(e);
      })
    }
  }

  const handleIncrease = (i) => {
    const clone = {...cart};
    clone.cartArray[i].quantity++;
    const data = {
      user_id: props.user.id,
      cart_id: cart.cartArray[i]._id,
      quantity: clone.cartArray[i].quantity.toString()
    }
    setCart(clone);
    UserDataService.updateCart(data)
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {
      console.error(e);
    })
  }

  const handleDelete = (i) => {
    const clone = {...cart};
    
    UserDataService.deleteCart(cart.cartArray[i]._id, props.user.name)
    .then(res => {
      console.log(res.data)
    })
    .catch(e => {
      console.error(e)
    })

    clone.cartArray.splice(i, 1)
    clone.itemsInCart--;
    setCart(clone);
  }

  const handleAddItem = () => {
    console.log(newItem, newItemQuantity)
    const data = {
      name: props.user.name,
      user_id: props.user.id,
      item: newItem,
      quantity: newItemQuantity
    }
    UserDataService.createCart(data)
    .then(res => {
      console.log(res.data);
      getCart();
    })
    .catch(e => {
      console.error(e);
    })
  }

  return (
    <div className="App">
      {cart && props.user && (
        <div>
          <h4>{`${props.user.name}'s Cart`}</h4>
          <h5>Items in Cart: {cart.itemsInCart}</h5><br/>
          <div className="container">
            <h5>Cart</h5>
            {cart.cartArray.length > 0 ? (
              cart.cartArray.map((item, i) => {
                return(
                  <div className="row" key={i}>
                    <div className="col">
                      {item.date.substring(0,10)}
                    </div>
                    <div className="col">
                      {item.item}
                    </div>
                    <div className="col d-flex justify-content-between">
                      <button onClick={() => handleDecrease(i)} style={{marginLeft: 40}}>-</button>
                      {item.quantity}
                      <button onClick={() => handleIncrease(i)} style={{marginRight: 40}}>+</button>
                    </div>
                    <div className="col">
                      <button onClick={() => handleDelete(i)}>Remove Item</button>
                    </div>
                    <hr className="mt-3"/>
                  </div>
                )
              })
            ) : (
            <div className="col-sm-4">
              <p>No items in cart.</p>
            </div>
            )}
            <br/>
            <strong>Add an Item to Cart</strong>
            <div className="row">
              <div className="col">
                <p>Date Added</p>
                {(new Date()).toISOString().substring(0, 10)}
              </div>
              <div className="col">
                Item to Add
                <TextField style={{marginTop: 10}} fullWidth={true} size="small" variant="outlined" placeholder="Enter the item to add to cart e.g. carrots" value={newItem} onChange={(e) => setNewItem(e.target.value)}/>
              </div>
              <div className="col">
                Quantity
                <TextField style={{marginTop: 10}} fullWidth={true} size="small" variant="outlined" defaultValue="1" placeholder="Enter the quantity of this item" value={newItemQuantity} onChange={(e) => setNewItemQuantity(e.target.value)}/>
              </div>
              <div className="col position-relative">
                <button className="btn btn-primary btn-sm position-absolute top-50 start-50" type="button" onClick={handleAddItem}>Add Item to Cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;