import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useMutation = (
  promise: (data: any) => Promise<any>,
  {
    onSuccess,
    onError,
  }: { onSuccess?: (data: any) => void; onError?: (error: AxiosError) => void }
) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const mutate = async (payload) => {
    setLoading(true);
    try {
      const res = await promise(payload);
      console.log(res);
      if (res.data) setData(data);
      onSuccess?.(res.data);
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        onError?.(error);
      }
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, mutate };
};
