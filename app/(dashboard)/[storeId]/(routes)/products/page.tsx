import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  //FIXME: Working code
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      // size: true,
      // color: true,
      // weight: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // const productVariants = await prismadb.productVariant.findMany({
  //   where: {
  //     product: {
  //       storeId: params.storeId
  //     }
  //   },
  //   include: {
  //     product: {
  //       include: {
  //         category: true,
  //       }
  //     },
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });

    //FIXME: Working code
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    // price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    // weight: item.weight,
    // size: item.size.name,
    // color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  // const formattedProductVariants = productVariants.map((item) => ({
  //   id: item.id,
  //   name: item.product.name,
  //   isFeatured: item.product.isFeatured,
  //   isArchived: item.product.isArchived,
  //   price: formatter.format(item.price),
  //   category: item.product.category.name,
  //   weight: item.weight,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
        {/* <ProductsClient data={formattedProductVariants} /> */}

      </div>
    </div>
  );
};

export default ProductsPage;
