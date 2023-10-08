import { Button, TextInput, Box, CheckIcon, Tooltip } from '@mantine/core';
import { useState } from 'react';
import useConnect from '../../hooks/useConnect';

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
        size="md"
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
        <Tooltip label={sessionId ? 'Reconnect' : 'Connect to db and sync metadata'}>
          <Button
            variant={sessionId ? 'light' : 'filled'}
            color={sessionId ? 'green' : 'black'}
            // leftSection={sessionId && <CheckIcon color="white" style={{ width: 14, height: 14 }} />}
            loading={isConnecting}
            disabled={!connectionString}
            onClick={() => {
              connect(connectionString);
            }}
            mt={10}
          >
            {!isConnecting ? (!sessionId ? 'Connect' : 'Connected') : 'Connecting...'}
          </Button>
        </Tooltip>
      </Box>
    </div>
  );
}

export default DatabaseConnect;
