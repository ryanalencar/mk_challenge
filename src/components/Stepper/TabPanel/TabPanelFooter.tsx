import React from 'react';

import { Button, ButtonGroup, Divider, VStack } from '@chakra-ui/react';

interface ITabPanelFooterProps {
  footerButtonText: string;
  hasBackButton?: boolean;
}

export function TabPanelFooter({
  footerButtonText,
  hasBackButton = true,
}: ITabPanelFooterProps) {
  return (
    <VStack as="footer" mt={8} spacing={5} align="flex-start">
      <Divider borderRadius={2} />

      <ButtonGroup spacing={8}>
        <Button
          type="submit"
          bgColor="green"
          color="white"
          px={8}
          _hover={{ opacity: 0.9 }}
          _active={{ transform: 'scale(0.9)' }}>
          {footerButtonText ?? ''}
        </Button>
        {hasBackButton && (
          <Button
            variant="link"
            color="blue.heading"
            fontWeight="regular"
            textDecoration="underline">
            Voltar
          </Button>
        )}
      </ButtonGroup>
    </VStack>
  );
}
