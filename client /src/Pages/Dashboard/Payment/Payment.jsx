import SectionTitle from "../../../Components/SectionTitle/SectionTitle";


import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import CheckOutForm from "./CheckOutForm";


//todo: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY)

const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please Pay First To Eat" />
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm/>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;