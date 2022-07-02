import React from 'react';

import { Button, Divider, VStack } from '@chakra-ui/react';

interface ITabPanelFooterProps {
  footerButtonText: string;
}

export function TabPanelFooter({ footerButtonText }: ITabPanelFooterProps) {
  return (
    <VStack as="footer" mt={8} spacing={5} align="flex-start">
      <Divider borderRadius={2} />
      <Button
        type="submit"
        bgColor="green"
        color="white"
        px={8}
        _hover={{ opacity: 0.9 }}
        _active={{ transform: 'scale(0.9)' }}>
        {footerButtonText ?? ''}
      </Button>
    </VStack>
  );
}
