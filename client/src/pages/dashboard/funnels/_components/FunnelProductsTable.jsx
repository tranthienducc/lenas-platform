import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateFunnelProducts } from "@/lib/actions/funnels/update-funnel-products";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import PropTypes from "prop-types";
import { useState } from "react";

const FunnelProductsTable = ({ products, prevData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [liveProducts, setLiveProducts] = useState(
    JSON.parse(prevData?.liveProducts) || "[]"
  );

  const handleSaveProducts = async () => {
    setIsLoading(true);
    try {
      const response = await updateFunnelProducts(
        JSON.stringify(liveProducts),
        prevData?.id
      );

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Update funnel products | ${response.name}`,
        subAccountId: prevData?.subAccountId,
      });

      setIsLoading(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProducts = async (product) => {
    try {
      const productIdExists = liveProducts?.find(
        (prod) => prod?.productId === product?.default_price?.id
      );

      productIdExists
        ? setLiveProducts(
            liveProducts?.filter(
              (prod) => prod?.productId !== product?.default_price?.id
            )
          )
        : setLiveProducts([
            ...liveProducts,
            {
              productId: product?.default_price?.id,
              recurring: !!product?.default_price?.recurring,
            },
          ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Table className="border bg-card border-border rounded-xl">
        <TableHeader className="rounded-2xl">
          <TableRow>
            <TableHead>Live</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Interval</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {products?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell>
                <Input
                  defaultChecked={
                    !!liveProducts.find(
                      (prod) => prod?.productId === product?.default_price?.id
                    )
                  }
                  onChange={() => handleAddProducts(product)}
                  type="checkbox"
                  className="size-4"
                />
              </TableCell>
              <TableCell>
                <img
                  src={product?.images[0]}
                  alt="product-image"
                  className="size-[60px]"
                />
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>
                {product?.default_price?.recurring ? "Recurring" : "One time"}
              </TableCell>
              <TableCell>
                ${product?.default_price?.unit_amount / 100}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        disabled={isLoading}
        onClick={handleSaveProducts}
        className="mt-4"
      >
        Save products
      </Button>
    </>
  );
};

export default FunnelProductsTable;

FunnelProductsTable.propTypes = {
  products: PropTypes.array,
  prevData: PropTypes.any,
};
