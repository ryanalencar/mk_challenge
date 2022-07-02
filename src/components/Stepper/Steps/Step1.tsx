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
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Input } from '../../Input';
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

export function Step1() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Step0Data>({ resolver: yupResolver(formSchema) });

  const [useContractRead, setUseContractRead] = useBoolean();

  const handleStep0Submit: SubmitHandler<Step0Data> = (data) => {
    const formData = {
      ...data,
      useContractRead,
    };
    console.log(formData);
  };

  console.log(errors);

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
