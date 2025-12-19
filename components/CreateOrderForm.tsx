import { useMutation } from "@/app/hooks/useMutation";
import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ComboboxDemo } from "@/app/stripe-integration/combobox";
import { useFetch } from "@/app/hooks/useFetch";
import {
  getCustomersList,
  getProductsList,
} from "@/app/stripe-integration/page";
import { Elements } from "@stripe/react-stripe-js";
import { ProductComboboxDemo } from "@/app/stripe-integration/product-combobox";
import { stripePromise } from "@/lib/stripe";
import { ProductInfo } from "@/app/stripe-integration/pricing-info";

const create_order = (data: { customer_id: string; price_ids: string[] }) =>
  axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/order", data);

export function CreateOrderForm({ ...props }) {
  const { data: customersData, loading: cLoading } = useFetch(
    getCustomersList,
    {}
  );
  const { data: productsData, loading: pLoading } = useFetch(
    getProductsList,
    {}
  );
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const customerList = customersData
    ? (customersData as unknown as { email: string; id: string }[])?.map(
        (customer) => ({
          label: customer.email,
          value: customer.id,
        })
      )
    : [];

  const productList = productsData
    ? (productsData as unknown as { name: string; default_price: any }[])
        ?.filter((p) => p.default_price?.type != "recurring")
        .map((p) => ({
          label: p.name,
          value: p.default_price.id,
        }))
    : [];
  const [customerInputSearchValue, setCustomerInputSearchValue] = useState("");
  const [productInputSearchValue, setProductInputSearchValue] = useState<
    string[]
  >([]);

  const [open, setOpen] = useState(false);
  const createOrderMutation = useMutation(create_order, {
    onSuccess: (data) => {
      toast.success(data?.message || "Subscription created successfully");
      // setOpen(false);
      // props?.refetch();
      if (data.client_secret) {
        setClientSecret(data.client_secret);
      }
      console.log(data);
    },
    onError: (e) => {
      console.log(e);
      toast.error(
        e?.response?.data?.detail ||
          "Something went wrong while creating customer"
      );
    },
  });
  const selectectedProducts = productsData?.filter((p) =>
    productInputSearchValue?.includes(p.default_price.id)
  );
  const totalOrderPrice =
    selectectedProducts && selectectedProducts.length
      ? {
          amount: selectectedProducts?.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.default_price.unit_amount,
            0
          ),
          currency: selectectedProducts?.[0]?.default_price?.currency,
        }
      : undefined;
  const onCreateSubscription = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createOrderMutation.mutate({
        customer_id: customerInputSearchValue,
        products: productsData?.filter((p) =>
          productInputSearchValue?.includes(p.default_price.id)
        ),
      });
    } catch (e: any) {
      console.log(e);
      toast.error((e as AxiosError).message);
    }
  };

  useEffect(() => {}, [productInputSearchValue]);

  return (
    <Dialog open={open} modal onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Order for the customer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Orders</DialogTitle>
          <DialogDescription>Select Product informations</DialogDescription>
        </DialogHeader>
        <form onSubmit={onCreateSubscription}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Select Customer</FieldLabel>
              <ComboboxDemo
                loading={cLoading}
                notFoundLabel="Customer not found"
                label="Select Customer"
                placeholder="Choose customer by email"
                value={customerInputSearchValue}
                setValue={setCustomerInputSearchValue}
                data={customerList}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Select Products</FieldLabel>
              <ProductComboboxDemo
                loading={pLoading}
                notFoundLabel="Product not found"
                label="Select Product"
                placeholder="Choose Product by Name..."
                value={productInputSearchValue}
                setValue={setProductInputSearchValue}
                data={productList}
              />
            </Field>
            <ProductInfo totalPrice={totalOrderPrice} />
            <FieldGroup>
              <Field>
                <Button
                  disabled={
                    createOrderMutation.loading ||
                    productInputSearchValue.length == 0 ||
                    customerInputSearchValue.length == 0
                  }
                  type="submit"
                >
                  {createOrderMutation.loading && <Spinner />}
                  Create Order
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
        {/* Payment UI appears AFTER backend responds */}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentSection />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}

function PaymentSection() {
  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-2">Payment Details</h3>

      <PaymentForm />
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  async function handleConfirm() {
    if (!stripe || !elements) return;

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/billing/success`,
      },
    });
  }

  return (
    <>
      <PaymentElement />
      <Button onClick={handleConfirm}>Subscribe</Button>
    </>
  );
}
