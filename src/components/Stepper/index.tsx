import React from 'react';

import { HStack, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { useTab } from '../../hooks/useTab';
import { Steps } from './Steps';

const tabList = [
  { title: 'Usuário' },
  { title: 'Validação' },
  { title: 'Empresa' },
  { title: 'Documentos' },
  { title: 'Confirmação' },
];

export function Stepper() {
  const { tabIndex, handleTabsChange } = useTab();
  return (
    <Tabs
      isLazy
      isFitted
      isManual
      onChange={handleTabsChange}
      index={tabIndex}
      size="md"
      w="65%"
      variant="solid-rounded"
      mb={5}>
      <TabList bgColor="white" borderRadius={25}>
        {tabList.map(({ title }, index) => (
          <Tab
            key={title}
            bgColor={tabIndex > index ? 'green' : 'white'}
            color={tabIndex > index ? 'white' : 'blue.heading'}
            _selected={{ color: 'white', bg: 'blue.bg' }}
            isDisabled={tabIndex < index}
            sx={{
              _notLast: { borderRightRadius: 0 },
              _notFirst: { borderLeftRadius: 0 },
            }}>
            <HStack spacing={2}>
              <Text
                size="xsm"
                color={
                  tabIndex > index
                    ? 'white'
                    : tabIndex === index
                    ? 'white'
                    : 'green'
                }>
                {index + 1}
              </Text>
              <Text size="xsm">{title}</Text>
            </HStack>
          </Tab>
        ))}
      </TabList>

      <Steps />
    </Tabs>
  );
}
