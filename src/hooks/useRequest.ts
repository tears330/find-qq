import { useEffect, useState } from 'react';

type Options<P> = {
  params: P;
  paramsValidate?: (params: P) => boolean;
};

export const useRequest = <T, P>(
  service: (args: P) => Promise<T>,
  { params, paramsValidate }: Options<P>,
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paramsValidate && !paramsValidate(params)) {
      return;
    }
    setLoading(true);
    service(params)
      .then((res) => {
        setData(res);
        setError(undefined);
      })
      .catch((error: Error) => {
        setData(undefined);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params, service, paramsValidate]);

  return { data, loading, error };
};
