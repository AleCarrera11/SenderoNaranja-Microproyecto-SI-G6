import React from 'react';
 import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
 
 const PaypalButtonComponent = ({ onSuccess }) => {
     const initialOptions = {
         "client-id": "Aem5eKRop0R922l6oNHd2RaZPvmyb55JdAaGxP-0jrW_6bUzmodg2KQ329JObrDsIkQWgW-UpsEiiwYK",
         currency: "USD",
         intent: "capture",
     }
 
     const createOrder = (data, actions) => {
         return actions.order.create({
             purchase_units: [{
                 amount: {
                     currency_code: "USD",
                     value: "3",
                 },
             }],
         });
     }
 
     const onApprove = (data, actions) => {
         return actions.order.capture().then(function(details) {
             const name = details.payer.name.given_name;
             console.log(name);
             alert("Gracias por tu compra " + name);
             onSuccess(); // Llamar a la función de éxito
         });
     }
 
     return (
         <PayPalScriptProvider options={initialOptions}>
             <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
         </PayPalScriptProvider>
     )
 }
 
 const BotonPaypal = ({ onSuccess }) => {
     return <PaypalButtonComponent onSuccess={onSuccess} />;
 }
 
 export default BotonPaypal; 