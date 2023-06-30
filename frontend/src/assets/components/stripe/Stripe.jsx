import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classnames from 'classnames';

// Components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../paymentform/PaymentForm';
import Wrapper from '../wrapper/Wrapper';
import ProductCard from '../productcard/ProductCard';

// Services
import PaymentService from '../../../services/paymentservice';

// Styles
import styles from './stripe.module.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Stripe = () => {
  const [userCart, setUserCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const getClientSecret = async () => {
      console.log(currentProduct);
      const service = new PaymentService();
      service.createPaymentIntent({ productId: currentProduct, callbackSuccess: callbackSuccessPaymentIntent, callbackError: callbackErrorPaymentIntent });
    };
    setUserCart(userCart);
    console.log(userCart);
    currentProduct && getClientSecret();
  }, [currentProduct]);

  const callbackSuccessPaymentIntent = (res) => {
    setClientSecret(res.data.payload.client_secret);
  };

  const callbackErrorPaymentIntent = (err) => {
    console.log(err);
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Stripe</h1>
      </div>
      <div className={classnames([styles.container, styles.highlighted])}>
        <Wrapper hidden={currentProduct}>
          <div className={styles.productsContainer}>
            {userCart.map((product) => (
              <ProductCard key={product.id} product={product} setCurrentProduct={setCurrentProduct} />
            ))}
          </div>
        </Wrapper>
        <Wrapper hidden={!clientSecret || !stripePromise}>
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <PaymentForm />
          </Elements>
        </Wrapper>
      </div>
    </>
  );
};
export default Stripe;
