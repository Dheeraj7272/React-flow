import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFetch = (asyncFunc:(params: any) => Promise<AxiosResponse<any, any>>,params:any) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(true);
  const execute = useCallback(
    async (overrideParams?: any) => {
      try {
        const res = await asyncFunc(overrideParams ?? params);
        if (res.data){ if (isMounted.current) setData(res.data.data)};
      } catch (error: any) {
        if (error instanceof AxiosError) {
          if (isMounted.current) setError(error.response?.data);
        }
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [asyncFunc, params]
  );

  useEffect(() => {
    if (isMounted.current) execute();

    return () => {  
      isMounted.current = false;
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: execute,
  };
};
