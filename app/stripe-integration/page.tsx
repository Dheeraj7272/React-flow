"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "./data-table";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";
import { getColumns } from "./columns";
import { useMutation } from "../hooks/useMutation";

export const getCustomersList = (params) =>
  axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/customer", {
    params,
  });

export const getProductsList = (params) =>
  axios.get(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/product", {
    params,
  });
const deleteCustomer = (id) =>
  axios.delete(process.env.NEXT_PUBLIC_BACKEND_ENDPOINT + "/customer", {
    params: {
      id,
    },
  });
export default function Page() {
  const { data, error, loading, refetch } = useFetch(getCustomersList, {});
  console.log(loading, "loading");
  const [clientSecret, setClientSecret] = useState("");
  const deleteCustomerMutation = useMutation(deleteCustomer, {});

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: (customer) => {
          deleteCustomerMutation.mutate(customer.id);
        },
      }),
    [deleteCustomerMutation]
  );
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full min-w-250 mx-auto py-10">
      <DataTable refetch={refetch} columns={columns} data={data || []} />
    </div>
  );
}
