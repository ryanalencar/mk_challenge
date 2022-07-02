import React from 'react';

import { TabPanels } from '@chakra-ui/react';

import CustomTabPanel from '../TabPanel';
import { Step0 } from './Step0';

export function Steps() {
  return (
    <TabPanels bgColor="white" borderRadius={15} mt={10}>
      <CustomTabPanel title="Cadastre sua conta">
        <Step0 />
      </CustomTabPanel>
      <CustomTabPanel title="Validação da conta">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Cadastre sua empresa">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Envie os documentos">aaaaa</CustomTabPanel>
      <CustomTabPanel title="Sucesso!">aaaaa</CustomTabPanel>
    </TabPanels>
  );
}
