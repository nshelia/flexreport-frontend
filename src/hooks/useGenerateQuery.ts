import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import api from '../api';

function useGenerateQuery() {
  const { data, error, isLoading, mutate } = useMutation(
    ({ sessionId, prompt }: { sessionId: string; prompt: string }) =>
      api.generateQuery(sessionId, prompt),
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
    query: data,
    generate: mutate,
  };
}

export default useGenerateQuery;
