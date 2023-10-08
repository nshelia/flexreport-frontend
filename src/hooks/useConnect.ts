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
      onSuccess: ({ customerId }: { customerId: string }) => {
        toast.success('Connected');
        onSuccess(customerId);
      },
    }
  );

  return {
    isLoading,
    error,
    sessionId: data?.customerId,
    connect: mutate,
  };
}

export default useConnect;
