import React from 'react';

import { TabPanels } from '@chakra-ui/react';

import CustomTabPanel from '../TabPanel';
import { Step0 } from './Step0';
import { Step1 } from './Step1';
import { Step2 } from './Step2';

export function Steps() {
  return (
    <TabPanels bgColor="white" borderRadius={15} mt={10}>
      <CustomTabPanel title="Cadastre sua conta">
        <Step0 />
      </CustomTabPanel>
      <CustomTabPanel title="Validação da conta">
        <Step1 />
      </CustomTabPanel>
      <CustomTabPanel title="Cadastre sua empresa">
        <Step2 />
      </CustomTabPanel>
      <CustomTabPanel title="Envie os documentos">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Sucesso!">aaaaa</CustomTabPanel>
    </TabPanels>
  );
}
