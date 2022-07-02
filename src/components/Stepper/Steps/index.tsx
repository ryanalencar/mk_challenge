import React from 'react';

import { TabPanels } from '@chakra-ui/react';

import CustomTabPanel from '../TabPanel';
import { Step0 } from './Step0';
import { Step1 } from './Step1';

export function Steps() {
  return (
    <TabPanels bgColor="white" borderRadius={15} mt={10}>
      <CustomTabPanel title="Cadastre sua conta">
        <Step0 />
      </CustomTabPanel>
      <CustomTabPanel title="Validação da conta">
        <Step1 />
      </CustomTabPanel>
      <CustomTabPanel title="Cadastre sua empresa">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Envie os documentos">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Sucesso!">aaaaa</CustomTabPanel>
    </TabPanels>
  );
}
