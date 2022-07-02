import React, { useState } from 'react';

import { HStack, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Steps } from './Steps';

const tabList = [
  { title: 'Usuário' },
  { title: 'Validação' },
  { title: 'Empresa' },
  { title: 'Documentos' },
  { title: 'Confirmação' },
];

export function Stepper() {
  const [selectedIndex, setselectedIndex] = useState(0);

  return (
    <Tabs
      onChange={(index) => setselectedIndex(index)}
      isLazy
      isFitted
      isManual
      index={selectedIndex}
      size="md"
      w="65%"
      variant="solid-rounded">
      <TabList bgColor="white" borderRadius={25}>
        {tabList.map(({ title }, index) => (
          <Tab
            key={title}
            bgColor={selectedIndex > index ? 'green' : 'white'}
            color={selectedIndex > index ? 'white' : 'blue.heading'}
            _selected={{ color: 'white', bg: 'blue.bg' }}>
            <HStack spacing={2}>
              <Text
                size="xsm"
                color={
                  selectedIndex > index
                    ? 'white'
                    : selectedIndex === index
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
