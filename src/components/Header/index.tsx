import { Box, Text, Title } from '@mantine/core';

function Header() {
  return (
    <Box>
      <Title order={2}>Generate a report using GPT-4</Title>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text>Get started by connecting to database. Supports </Text>
        <img
          alt="MS SQL"
          style={{
            paddingBottom: '10px',
          }}
          width={60}
          height={60}
          src="https://www.svgrepo.com/show/303251/mysql-logo.svg"
        />
      </Box>
    </Box>
  );
}

export default Header;
