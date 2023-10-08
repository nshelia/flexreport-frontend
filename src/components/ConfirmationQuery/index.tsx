import { Button, Box, Alert, Code } from '@mantine/core';

function ConfirmationQuery({
  reset,
  runQuery,
  queryPreview,
}: {
  reset: () => void;
  runQuery: () => void;
  queryPreview: string;
}) {
  return (
    <Box mt={10}>
      <Alert color="gray" title="Do you want to run the following query ?">
        <Code>{queryPreview}</Code>
      </Alert>
      <Box mt={10}>
        <Button
          size="md"
          onClick={() => {
            runQuery();
          }}
          style={{
            background: 'linear-gradient(45deg, #4b6cb7 10%, #253b67 90%)',
            color: 'var(--mantine-color-white)',
          }}
        >
          Run
        </Button>
        <Button
          onClick={() => {
            reset();
          }}
          ml={10}
          variant="subtle"
        >
          Try again
        </Button>
      </Box>
    </Box>
  );
}

export default ConfirmationQuery;
