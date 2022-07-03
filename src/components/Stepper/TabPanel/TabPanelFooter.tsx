import React from 'react';

import { Button, ButtonGroup, Divider, VStack } from '@chakra-ui/react';

import { useTab } from '../../../hooks/useTab';

interface ITabPanelFooterProps {
  footerButtonText: string;
  footerButtonIsLoading?: boolean;
  footerButtonIsDisabled?: boolean;
  hasBackButton?: boolean;
}

export function TabPanelFooter({
  footerButtonIsDisabled = false,
  footerButtonIsLoading = false,
  footerButtonText,
  hasBackButton = true,
}: ITabPanelFooterProps) {
  const { moveBack } = useTab();
  return (
    <VStack as="footer" mt={8} spacing={5} align="flex-start">
      <Divider borderRadius={2} />

      <ButtonGroup spacing={8}>
        <Button
          isDisabled={footerButtonIsDisabled}
          isLoading={footerButtonIsLoading}
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
            textDecoration="underline"
            onClick={moveBack}>
            Voltar
          </Button>
        )}
      </ButtonGroup>
    </VStack>
  );
}
