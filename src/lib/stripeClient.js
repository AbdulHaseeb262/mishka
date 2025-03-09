//  import { loadStripe } from "@stripe/stripe-js";

// const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

// //  Initialize Stripe only if we have a public key
// export const stripePromise = stripePublicKey
//  ? loadStripe(stripePublicKey) 
//   : null; 

// // /Helper function to check if Stripe is properly configured
// export const isStripeConfigured = () => Boolean(stripePublicKey); 



import Stripe from "stripe";


console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default stripe;
