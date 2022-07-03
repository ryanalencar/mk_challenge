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
  useMediaQuery,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import * as yup from 'yup';

import { useTab } from '../../../hooks/useTab';
import { standaloneToast } from '../../../pages/_app';
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
    formState: { errors, isSubmitting, isValidating },
  } = useForm<Step0Data>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: userState.email ?? '',
      name: userState.name ?? '',
      phone: userState.phone ?? '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [useContractRead, setUseContractRead] = useBoolean(
    userState.useContractRead ?? false,
  );
  const { moveForward } = useTab();
  const [isMobile] = useMediaQuery('(max-width: 600px)');

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

    if (standaloneToast.isActive('user-created-toast')) return null;
    standaloneToast({
      id: 'user-created-toast',
      title: 'Usuário criado com sucesso!',
      description: 'Seguindo para a próxima etapa. Obrigado!',
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
          Vamos começar pela conta de usuário
        </Text>
        <Text size="xsm" variant="regular">
          Preencha seu email que utiliza profissionalmente,
          {isMobile ? null : <br />} nome completo de pessoa Física e seu número
          do celular.
        </Text>
      </Stack>
      <Flex
        as="form"
        direction="column"
        onSubmit={handleSubmit(handleStep0Submit)}>
        <Stack spacing={2}>
          <Input
            error={errors.email}
            label="E-mail"
            {...register('email')}
            w={['100%', '50%']}
          />
          <Stack spacing={2} direction={['column', 'row']}>
            <Input error={errors.name} label="Nome" {...register('name')} />
            <Input
              type="tel"
              as={InputMask}
              mask="(99) 99999-9999"
              error={errors.phone}
              label="Celular"
              {...register('phone')}
              w={['100%', '50%']}
            />
          </Stack>
        </Stack>
        <HStack spacing={2} mt={8}>
          <IconButton
            aria-label="Contrato de uso"
            icon={
              useContractRead ? (
                <CheckIcon fontSize={15} color="whiteAlpha.900" />
              ) : (
                <CloseIcon fontSize={12} color="whiteAlpha.900" />
              )
            }
            bgColor={useContractRead ? 'green' : 'red.500'}
            _hover={{ opacity: 0.9 }}
            _active={{ opacity: 0.9 }}
            size="xs"
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
          footerButtonIsLoading={isSubmitting || isValidating || isLoading}
        />
      </Flex>
    </Stack>
  );
}
