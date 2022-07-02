import React, { ReactNode } from 'react';

import { Box, Divider, TabPanel, TabPanelProps, Text } from '@chakra-ui/react';

interface ICustomTabPanelProps extends TabPanelProps {
  title: string;
  children: ReactNode;
}

export default function CustomTabPanel({
  title,
  children,
  ...props
}: ICustomTabPanelProps) {
  return (
    <TabPanel {...props}>
      <Box px={5}>
        <Box mb={8}>
          <Text color="blue.heading">{title}</Text>
          <Divider borderColor="green" borderWidth={2} borderRadius={2} w={8} />
        </Box>
        {children}
      </Box>
    </TabPanel>
  );
}
