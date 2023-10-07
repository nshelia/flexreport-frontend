import { Button, Box, Alert, Code } from '@mantine/core';
import useRunQuery from '../../hooks/useRunQuery';

function ConfirmationQuery({ queryId, queryPreview }: { queryId: string; queryPreview: string }) {
  const { report, runQuery, isLoading: isRunning } = useRunQuery();

  return (
    <Box mt={10}>
      <Alert color="gray" title="Do you want to run the following query ?">
        <Code>{queryPreview}</Code>
      </Alert>
      <Box mt={10}>
        <Button
          onClick={() => {
            runQuery({ queryId });
          }}
          loading={isRunning}
          style={{
            background: 'linear-gradient(45deg, #4b6cb7 10%, #253b67 90%)',
            color: 'var(--mantine-color-white)',
          }}
        >
          Run
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmationQuery;
