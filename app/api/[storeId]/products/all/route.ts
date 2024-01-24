import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
import { Variant } from '@/lib/types';


export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    // const categoryId = searchParams.get('categoryId') || undefined;
    // const colorId = searchParams.get('colorId') || undefined;
    // const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');

    if (!params.storeId) {
      return new NextResponse('Store id is required', { status: 400 });
    }

  // return all product variants
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      images: true,
      variants: true,
      category: true,
      tags: true
    }
    })
  //     categoryId,
  //     // colorId,
  //     // sizeId,
  //     isFeatured,
  //   },
  //   include: {
  //     images: true,
  //     variants: {

  // return all products

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
