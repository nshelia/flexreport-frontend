import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import api from '../api';

function useConnect({ onSuccess }: { onSuccess: (sessionId: string) => void }) {
  const { data, error, isLoading, mutate } = useMutation(
    (connectionString: string) => api.connect(connectionString),
    {
      onError: () => {
        toast.error('Failed to connect');
      },
      onSuccess: (sessionId) => {
        toast.success('Connected');
        onSuccess(sessionId);
      },
    }
  );

  return {
    isLoading,
    error,
    sessionId: data?.sessionId,
    connect: mutate,
  };
}

export default useConnect;
