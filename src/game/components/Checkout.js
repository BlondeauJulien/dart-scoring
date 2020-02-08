import React, { useState } from 'react';

import checkout from '../../utils/checkout';

import './Checkout.css';

const Checkout = props => {
  const { score } = props
  const [showCheckout, setShowCheckout] = useState(false);

  let triangle = showCheckout ? (
    <i class="fas fa-caret-up"></i>
  ) : (
    <i class="fas fa-caret-down"></i>
  )

  return (
    <div className="checkout-cont">
      <p className="checkout-cont__title" onClick={() => setShowCheckout(!showCheckout)}>
        {triangle} Checkout {triangle}
      </p>
      {showCheckout && (
      <ul className="checkout__list" >
        {checkout[score].map(c => {
          return <li>{c}</li>
        })}
      </ul>
      )}
    </div>
  )
}

export default Checkout
