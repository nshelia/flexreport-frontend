import { Container, Box } from '@mantine/core';
import { useState } from 'react';
import Header from '../components/Header';
import DatabaseConnect from '../components/DatabaseConnect';
import GenerateQuery from '../components/GenerateQuery';
import ConfirmationQuery from '../components/ConfirmationQuery';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export function HomePage() {
  const [sessionId, setSessionId] = useState('');
  const [activeQuery, setActiveQuery] = useState('');

  const isQueryGenerated = !!activeQuery;

  return (
    <Container size="xs" mt={10} pt="2%">
      <Header />
      <Box mt={10}>
        <DatabaseConnect onConnect={setSessionId} />
        <Box mt={10}>
          <GenerateQuery sessionId={sessionId} onQueryId={setActiveQuery} />
          {isQueryGenerated && (
            <ConfirmationQuery queryId={activeQuery} queryPreview={activeQuery} />
          )}
        </Box>
      </Box>
      <ColorSchemeToggle />
    </Container>
  );
}
