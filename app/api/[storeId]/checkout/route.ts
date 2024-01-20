import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { razorpay } from '@/lib/razorpay';
import prismadb from '@/lib/prismadb';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  const { productVariantIds } = await req.json();

  if (!productVariantIds || productVariantIds.length === 0) {
    return new NextResponse('Product variant ids are required', {
      status: 400,
    });
  }
  console.log('ramram');

  const productsVariants = await prismadb.productVariant.findMany({
    where: {
      id: {
        in: productVariantIds,
      },
    },
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productVariantIds.map((productVariantId: string) => ({
          productVariant: {
            connect: {
              id: productVariantId,
            },
          },
        })),
      },
    },
  });

  const amount = productsVariants.reduce(
    (acc, productVariant) => acc + productVariant.price,
    0,
  );

  try {
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // convert to smallest currency unit
      currency: 'INR',
      receipt: order.id,
    });

    return NextResponse.json(
      { orderId: razorpayOrder.id },
      {
        headers: corsHeaders,
      },
    );
  } catch (e) {
    console.log('🚀 ~ e:', e);
    return NextResponse.json(
      { orderId: null },
      {
        headers: corsHeaders,
      },
    );
  }
}
