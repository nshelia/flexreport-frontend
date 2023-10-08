import { Button, Textarea, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import useGenerateQuery from '../../hooks/useGenerateQuery';

function GenerateQuery({
  sessionId,
  onQueryGenerate,
}: {
  sessionId: string;
  onQueryGenerate: ({ reportId, queryPreview }: { reportId: string; queryPreview: string }) => void;
}) {
  const { query, generate, isLoading: isGenerating } = useGenerateQuery();
  const [prompt, setPrompt] = useState('');
  const isQueryGenerated = !!query;

  useEffect(() => {
    if (!query) {
      return;
    }
    onQueryGenerate(query);
  }, [query]);

  return (
    <div>
      <Textarea
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        required
        size="md"
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
          color="blue"
        >
          {!isGenerating ? (!isQueryGenerated ? 'Generate' : 'Generated') : 'Generating...'}
        </Button>
      </Tooltip>
    </div>
  );
}

export default GenerateQuery;
