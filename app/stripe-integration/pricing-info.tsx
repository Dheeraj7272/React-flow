import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemSeparator,
} from "@/components/ui/item";

type ProductInfoProps = {
  totalPrice:
    | {
        amount: number;
        currency: string;
      }
    | undefined;
};
export function ProductInfo({totalPrice}: ProductInfoProps) {
  return (
    totalPrice && (
      <div className="flex w-full max-w-md flex-col gap-6">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>Basic Item</ItemTitle>
            <ItemDescription>
              A simple item with title and description.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <span className="inline-block">
              {totalPrice.currency} {totalPrice?.amount / 100}
            </span>
          </ItemActions>
        </Item>
      </div>
    )
  );
}
