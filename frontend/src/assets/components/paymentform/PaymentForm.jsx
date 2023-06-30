import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createAlert, createAlertWithCallback } from '../../utils/alerts';

import styles from './payment-form.module.css';
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (!error) {
      createAlertWithCallback('success', '¡Pago completado!', 'El pago ha sido procesado con éxito', () => window.location.replace('/'));
      //TODO: sacar los productos que se pagaron, peticion al back, tambien tienes que descontar el stock

    } else {
      console.log(error);
      createAlert('error', 'Error al procesar el pago', error.message);
    }
  };
  return (
    <>
      <form>
        <PaymentElement />
        <div className={styles.buttonPanel}>
          <button className={styles.genericButton} onClick={handleSubmit}>
            Pagar
          </button>
        </div>
      </form>
    </>
  );
};
export default PaymentForm;
