import { useMutation } from "@/app/hooks/useMutation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import { ComboboxDemo } from "@/app/stripe-integration/customer-combobox";
import { useFetch } from "@/app/hooks/useFetch";
import { getCustomersList } from "@/app/stripe-integration/page";

const create_subscription = (data: { email: string; name: string }) =>
  axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/subscription", data);
export function ChargeSubscriptionForm({ ...props }) {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });
  const { data, error, loading, refetch } = useFetch(getCustomersList, {});
  const customerList = data
    ? (data as unknown as { email: string; id: string }[])?.map((customer) => ({
        label: customer.email,
        value: customer.id,
      }))
    : [];
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const createSubscriptionMutation = useMutation(create_subscription, {
    onSuccess: () => {
      toast.success("Customer created successfully");
      setFormData({ name: "", email: "" });
      setOpen(false);
      props?.refetch();
    },
    onError: () => {
      toast.error("Something went wrong while creating customer");
    },
  });
  const onCreateSubscription = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createSubscriptionMutation.mutate(formData);
    } catch (e: any) {
      console.log(e);
      toast.error((e as AxiosError).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Subscription</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Subscription for user</DialogTitle>
          <DialogDescription>
            Enter your information below to create your account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onCreateSubscription}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Select Customer</FieldLabel>
              <ComboboxDemo
                value={value}
                setValue={setValue}
                data={customerList}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Enter Customer Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <FieldDescription>
                Create subscription for Specific User
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button
                  disabled={createSubscriptionMutation.loading}
                  type="submit"
                >
                  {createSubscriptionMutation.loading && <Spinner />}
                  Create Subscription
                </Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
