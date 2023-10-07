import { Button, Textarea, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import useGenerateQuery from '../../hooks/useGenerateQuery';

function GenerateQuery({
  sessionId,
  onQueryId,
}: {
  sessionId: string;
  onQueryId: (queryId: string) => void;
}) {
  const { queryId, generate, isLoading: isGenerating } = useGenerateQuery();
  const [prompt, setPrompt] = useState('');
  const isQueryGenerated = !!queryId;

  useEffect(() => {
    onQueryId(queryId);
  }, [queryId]);

  return (
    <div>
      <Textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        required
        placeholder="Write your GPT prompt"
        autosize
        minRows={2}
        maxRows={4}
      />
      <Tooltip disabled={!!sessionId} label="Connect to database first">
        <Button
          loading={isGenerating}
          onClick={() => {
            generate({ sessionId, prompt });
          }}
          disabled={!sessionId}
          mt="10"
          color="green"
        >
          {!isGenerating ? (!isQueryGenerated ? 'Generate' : 'Generated') : 'Generating...'}
        </Button>
      </Tooltip>
    </div>
  );
}

export default GenerateQuery;
