import { Button, TextInput, Box, Text, CheckIcon } from '@mantine/core';
import toast from 'react-hot-toast';
import { useState } from 'react';
import useConnect from '../../hooks/useConnect';
import { isValidConnectionString } from '../../utils/validation';

function DatabaseConnect({ onConnect }: { onConnect: (sessionId: string) => void }) {
  const {
    sessionId,
    connect,
    isLoading: isConnecting,
  } = useConnect({
    onSuccess: onConnect,
  });

  const [connectionString, setConnectionString] = useState('');

  return (
    <div>
      <TextInput
        onChange={(e) => {
          setConnectionString(e.target.value);
        }}
        required
        value={connectionString}
        label="Enter connection string"
        placeholder="Try MS SQL Server connection string"
      />
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          leftSection={sessionId && <CheckIcon color="green" style={{ width: 14, height: 14 }} />}
          loading={isConnecting}
          disabled={!connectionString}
          onClick={() => {
            if (!isValidConnectionString(connectionString)) {
              toast.error('Invalid connection string');
              return;
            }
            connect(connectionString);
          }}
          mt={10}
        >
          {!isConnecting ? (!sessionId ? 'Connect' : 'Connected') : 'Connecting...'}
        </Button>
        <Text size="xs" ml={10} c={sessionId ? 'green' : 'red'}>
          {sessionId ? <span>Connected</span> : <span>Not connected</span>}
        </Text>
      </Box>
    </div>
  );
}

export default DatabaseConnect;
