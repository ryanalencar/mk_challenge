import React, { useState } from 'react';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';

import { useTab } from '../../../hooks/useTab';
import { useReducerUser } from '../../../store/hooks/user';
import { Input } from '../../Form';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

type Step0Data = {
  email: string;
  name: string;
  phone: string;
};

const formSchema = yup
  .object({
    email: yup
      .string()
      .required('Email é obrigatório')
      .email('O Email precisa ser válido'),
    name: yup.string().required('Nome é obrigatório'),
    phone: yup.string().required('Número de telefone é obrigatório'),
  })
  .required();

export function Step0() {
  const [userState, { createUser }] = useReducerUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValidating },
  } = useForm<Step0Data>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: userState.email ?? '',
      name: userState.name ?? '',
      phone: userState.phone ?? '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [useContractRead, setUseContractRead] = useBoolean();
  const { moveForward } = useTab();

  const handleStep0Submit: SubmitHandler<Step0Data> = (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      phone: data.phone
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .replace('-', ''),
      useContractRead,
    };
    createUser(formData);
    moveForward();
    setIsLoading(false);
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
          <Input
            error={errors.email}
            label="E-mail"
            {...register('email')}
            w={['50%']}
          />
          <HStack spacing={5}>
            <Input error={errors.name} label="Nome" {...register('name')} />
            <Input
              type="tel"
              as={InputMask}
              mask="(99) 99999-9999"
              error={errors.phone}
              label="Celular"
              {...register('phone')}
              w={['50%']}
            />
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
            <Button
              variant="link"
              fontWeight="regular"
              textDecoration="underline"
              color="blue.heading"
              size="xsm">
              Contrato de Uso
            </Button>
          </Text>
        </HStack>
        <TabPanelFooter
          hasBackButton={false}
          footerButtonText="Continuar"
          footerButtonIsDisabled={!isDirty}
          footerButtonIsLoading={isSubmitting || isValidating || isLoading}
        />
      </Flex>
    </Stack>
  );
}
