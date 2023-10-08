import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import api from '../api';

function useRunQuery({ customerId, reportId }: { customerId: string; reportId: string }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, error, isLoading, mutate } = useMutation(
    () =>
      api.runQuery({
        reportId,
        page,
        pageSize: limit,
        customerId,
      }),
    {
      onError: () => {
        toast.error('Query generation failed');
      },
      onSuccess: () => {
        toast.success('Generated');
      },
    }
  );

  return {
    isLoading,
    error,
    report: data,
    runQuery: mutate,
  };
}

export default useRunQuery;
