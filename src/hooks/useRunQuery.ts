import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import api from '../api';

function useRunQuery() {
  const { data, error, isLoading, mutate } = useMutation(
    ({ queryId }: { queryId: string }) => api.runQuery(queryId),
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
