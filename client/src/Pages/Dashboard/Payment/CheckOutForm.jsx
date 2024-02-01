import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const navigate = useNavigate()
  const {user}= useAuth()
  const stripe = useStripe();
  const elements = useElements();
  
  const axiosSecure = useAxiosSecure();
  const [cart, refetch]=useCart();
  const totalPrice = cart.reduce((total, item)=> total + item.price , 0)

  useEffect(()=>{
    if(totalPrice > 0){
      axiosSecure.post('/create-payment-intent', {price:totalPrice})
    .then(res =>{
        setClientSecret(res.data.clientSecret)
    })
    }
  },[axiosSecure, totalPrice])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
    }

    // confirm the payment with the method you applied (eg:card)
    const {paymentIntent, error: cardError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method:{
        card: card,
        billing_details: {
          email : user?.email || 'anonymous',
          name : user?.displayName || 'anonymous'
        }
      }
    })

    if(cardError){
      console.log('confirming card payment error ===>',cardError);
    }else{
      console.log('confirming card payment success ===>',paymentIntent);
      setTransactionId(paymentIntent.id)

      //now save the payment info in DB
      const payment = {
        email : user.email,
        price : totalPrice,
        transactionId : paymentIntent.id,
        date : new Date(), // convert date with utc by moment js
        cartIds : cart.map(item => item._id),
        menuIds : cart.map(item => item.menuId),
        status : "pending"
      }
      const res = await axiosSecure.post('/payment', payment)
      refetch()
      if(res.data.paymentResult.insertedId){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment Successful",
          showConfirmButton: false,
          timer: 1500
        });
      }
      navigate("/dashboard/paymentHistory")

    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm bg-primary text-white mt-3"
        type="submit"
        disabled={!stripe || !clientSecret ||!totalPrice}
      >
        Pay
      </button>
      <p className="text-red-600 font-bold">{error}</p>
      {transactionId && <p className="text-green-500 font-bold">Your Transaction id is : {transactionId}</p> }
    </form>
  );
};

export default CheckOutForm;
