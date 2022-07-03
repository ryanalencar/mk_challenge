import React, { useState } from 'react';

import {
  Button,
  createStandaloneToast,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import ReactInputMask from 'react-input-mask';

import { useTab } from '../../../hooks/useTab';
import { useReducerUser } from '../../../store/hooks/user';
import { Input } from '../../Form';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

const { toast: standaloneToast } = createStandaloneToast();

export function Step1() {
  const [userState, { updateUser }] = useReducerUser();
  const { moveForward } = useTab();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleValidatePhone = () => {
    setIsLoading(true);
    updateUser({ phoneVerified: true });
    if (standaloneToast.isActive('phone-verified-toast')) return null;
    standaloneToast({
      id: 'phone-verified-toast',
      title: 'Número verificado com sucesso!',
      description: 'Código aplicado com sucesso. Obrigado!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      moveForward();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Text size="sm" color="green">
          Validação enviada para seu celular
        </Text>
        <Text size="xsm" variant="regular">
          Enviamos uma mensagem SMS com o código de confirmação
          <br /> para o celular abaixo:
        </Text>
        <Input
          isReadOnly
          type="tel"
          defaultValue={userState.phone}
          as={ReactInputMask}
          mask="(99) 99999-9999"
          label="Celular"
          textAlign="center"
          color="blue.heading"
          fontWeight="700"
          borderRadius={50}
          w={['25%']}
        />
      </Stack>
      <Stack>
        <Text size="sm" color="blue.heading">
          Informe o código de verificação
        </Text>
        <HStack>
          <PinInput placeholder="0">
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Flex>
          <Button
            variant="link"
            fontWeight="regular"
            textDecoration="underline"
            color="blue.heading"
            size="xsm"
            onClick={() => {
              if (toast.isActive('sms-sent-toast')) return null;
              toast({
                id: 'sms-sent-toast',
                title: 'Código SMS enviado.',
                description:
                  'Aguardo alguns minutos até que o código seja recebido.',
                status: 'info',
                duration: 3000,
                isClosable: true,
              });
            }}>
            Não recebeu o código? Clique para reenviar
          </Button>
        </Flex>
      </Stack>
      <TabPanelFooter
        footerButtonText="Confirmar"
        footerButtonOnClick={handleValidatePhone}
        footerButtonIsLoading={isLoading}
      />
    </Stack>
  );
}
