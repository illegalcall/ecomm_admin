import Stripe from "stripe"
import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { razorpay } from "@/lib/razorpay"
import prismadb from "@/lib/prismadb"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  console.log('hello')
  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: 5000,  // convert to smallest currency unit
      currency: "INR",
      receipt: 'sdfsdaf',
    })

    console.log("🚀 ~ razorpayOrder:", razorpayOrder)
    return NextResponse.json({ orderId: razorpayOrder.id }, {
      headers: corsHeaders
    })
  }
  catch (e) {
    console.log("🚀 ~ e:", e)
    return NextResponse.json({ orderId: null }, {
      headers: corsHeaders
    })
  }


  // return NextResponse.json({ url: session.url }, {
  //   headers: corsHeaders
  // });
};
