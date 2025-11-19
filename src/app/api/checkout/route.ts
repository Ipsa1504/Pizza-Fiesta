import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { MenuItem } from "@/app/models/MenuItem";
import MenuItemAddOn from "@/types/MenuItemAddOn";

// Only initialize Stripe if API key is available
const stripe = process.env.STRIPE_SECRET_KEY ? require('stripe')(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(req: NextRequest) {
  // Check if Stripe is configured
  if (!process.env.STRIPE_SECRET_KEY || !stripe) {
    return NextResponse.json({ 
      error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your .env.local file to enable payments." 
    }, { status: 500 });
  }

  mongoose.connect(process.env.MONGODB_URI!)
  const authSession = await getServerSession(authOptions);
  const userEmail = authSession?.user?.email;
  const { cartProducts, address } = await req.json();
  const order = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: true
  })

  const stripeLineItems: any = [];

  for (const cartProduct of cartProducts) {
    const menuItem = await MenuItem.findById(cartProduct.menuItem._id);
    let productPrice = menuItem.basePrice;
    if (cartProduct.selectedSize) {
      const size = menuItem.sizes.find((size: MenuItemAddOn) => size._id!.toString() === cartProduct.selectedSize._id.toString());
      productPrice += size.price;
    }
    if (cartProduct.selectedExtras?.length > 0) {
      for (const selectedExtra of cartProduct.selectedExtras) {
        const extraIngredientInfo = menuItem.extraIngredientsPrices.find((extra: MenuItemAddOn) => extra._id!.toString() === selectedExtra._id.toString());
        productPrice += extraIngredientInfo.price;
      }
    }

    const productName = menuItem.name;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: 'USD',
        product_data: {
          name: productName
        },
        unit_amount: productPrice * 100
      }
    })
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/orders/${order._id.toString()}?clear-cart=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
    customer_email: userEmail,
    payment_method_types: ['card'],
    metadata: { orderId: order._id.toString() },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'Delivery fee',
          type: 'fixed_amount',
          fixed_amount: {
            amount: 500,
            currency: 'USD'
          }
        }
      }
    ]
  });

  return NextResponse.json(stripeSession.url);
}