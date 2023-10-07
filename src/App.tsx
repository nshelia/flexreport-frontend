import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './api/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Router />
        <Toaster />
      </MantineProvider>
    </QueryClientProvider>
  );
}
