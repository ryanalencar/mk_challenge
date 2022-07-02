import React from 'react';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { css } from '@emotion/css';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '../../Input';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

type Step0Data = {
  email: string;
  name: string;
  phone: string;
};

export function Step0() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Step0Data>();

  const [useContractRead, setUseContractRead] = useBoolean();

  const handleStep0Submit: SubmitHandler<Step0Data> = (data) => {
    console.log(data);
    console.log(isSubmitting);
  };

  return (
    <Stack spacing={5}>
      <Stack spacing={3}>
        <Text size="sm" color="green">
          Vamos começar pela conta de usuário
        </Text>
        <Text size="xsm" variant="regular">
          Preencha seu email que utiliza profissionalmente,
          <br /> nome completo de pessoa Física e seu número do celular.
        </Text>
      </Stack>
      <Flex
        as="form"
        direction="column"
        onSubmit={handleSubmit(handleStep0Submit)}>
        <Stack spacing={5}>
          <Input label="E-mail" {...register('email')} w={['50%']} />
          <HStack spacing={5}>
            <Input label="Nome" {...register('name')} />
            <Input label="Celular" {...register('phone')} w={['50%']} />
          </HStack>
        </Stack>
        <HStack spacing={5} mt={8}>
          <IconButton
            aria-label="Contrato de uso"
            icon={
              useContractRead ? (
                <CheckIcon fontSize={20} color="whiteAlpha.900" />
              ) : (
                <CloseIcon fontSize={15} color="whiteAlpha.900" />
              )
            }
            bgColor={useContractRead ? 'green' : 'red.500'}
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 0.9 }}
            size="sm"
            onClick={setUseContractRead.toggle}
            borderRadius="full"
          />
          <Text size="xsm" color="blue.heading">
            Eu li e concordo com o{' '}
            <span
              className={css`
                text-decoration: underline;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover {
                  color: #63d391;
                }
              `}>
              Contrato de Uso
            </span>
          </Text>
        </HStack>
        <TabPanelFooter footerButtonText="Continuar" />
      </Flex>
    </Stack>
  );
}
