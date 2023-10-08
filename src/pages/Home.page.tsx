import { Container, Box, Center } from '@mantine/core';
import { useState } from 'react';
import Header from '../components/Header';
import DatabaseConnect from '../components/DatabaseConnect';
import GenerateQuery from '../components/GenerateQuery';
import ConfirmationQuery from '../components/ConfirmationQuery';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import TableScrollArea from '../components/DataTable';
import 'ag-grid-enterprise';

export function HomePage() {
  const [sessionId, setSessionId] = useState('');
  const [activeQuery, setActiveQuery] = useState<{
    reportId: string;
    queryPreview: string;
  } | null>(null);

  const [showTable, setShowTable] = useState(false);

  const isQueryGenerated = !!activeQuery;

  return (
    <>
      <Container size="xs" mt={10} pt="2%">
        <Header />
        <Box mt={10}>
          <DatabaseConnect onConnect={setSessionId} />
          <Box mt={10}>
            {!isQueryGenerated && (
              <GenerateQuery
                sessionId={sessionId}
                onQueryGenerate={({ queryPreview, reportId }) => {
                  setActiveQuery({
                    queryPreview,
                    reportId,
                  });
                }}
              />
            )}
            {isQueryGenerated && (
              <ConfirmationQuery
                reset={() => {
                  setActiveQuery(null);
                }}
                runQuery={() => {
                  setShowTable(true);
                }}
                queryPreview={activeQuery.queryPreview}
              />
            )}
          </Box>
        </Box>
      </Container>
      <Container size="lg">
        {activeQuery?.reportId && showTable && (
          <Center mt={20}>
            <TableScrollArea customerId={sessionId} reportId={activeQuery?.reportId} />
          </Center>
        )}
      </Container>
    </>
  );
}
