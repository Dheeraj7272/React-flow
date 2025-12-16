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
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const getCustomersList =async() => {
    const data = await axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/customer")
    console.log(data);
  }
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });
  const onCreateCustomer = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/customer",{
      ...formData
    })
  }
  useEffect(() => {
    getCustomersList()
  
  }, [])
  
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onCreateCustomer}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
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
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Stripe Customer Account</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
