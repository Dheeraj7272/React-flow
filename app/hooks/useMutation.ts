import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useMutation = (
  promise:(data:any) => Promise<any>,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: () => void }
) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const mutate = async (payload) => {
    setLoading(true);
    try {
      const res = await promise(payload)
      if (res.data) setData(data);
      onSuccess?.();
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setError(error.response?.data);
        onError?.();
      }
    } finally {
      setLoading(false);
    }
  };
  return { data,error,loading,mutate}
};
