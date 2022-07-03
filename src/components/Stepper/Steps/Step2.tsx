import React, { useState } from 'react';

import {
  Divider,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
  useMediaQuery,
  useRadioGroup,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'debounce';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineRouter } from 'react-icons/md';
import ReactInputMask from 'react-input-mask';
import * as yup from 'yup';

import { useTab } from '../../../hooks/useTab';
import { standaloneToast } from '../../../pages/_app';
import { getAddressByZipCode } from '../../../services/api';
import { useReducerCompany } from '../../../store/hooks/company';
import { Input, Select } from '../../Form';
import RadioCard from '../../RadioCard';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

type Step2Data = {
  companyType: string;
  cnpj: string;
  corporateName: string;
  phone: string;
  zipCode: string;
  address: string;
  addressNumber: string;
  complement: string;
  district: string;
};

const formSchema = yup
  .object({
    companyType: yup.string().required('O tipo de empresa é obrigatório'),
    cnpj: yup.string().required('CNPJ é obrigatório'),
    zipCode: yup.string().required('CEP é obrigatório'),
    phone: yup.string().required('Número de telefone é obrigatório'),
    corporateName: yup.string().required('Razão social é obrigatório'),
    address: yup.string().required('Endereço é obrigatório'),
    addressNumber: yup.string().required('Número é obrigatório'),
    district: yup.string().required('Bairro é obrigatório'),
  })
  .required();

const options = [
  { value: 'Provedores de internet', icon: MdOutlineRouter },
  { value: 'Outros segmentos', icon: FiMoreHorizontal },
];

const companiesType = [
  'Simples Nacional',
  'Sociedade Anônima',
  'Sociedade Simples',
];

export function Step2() {
  const [companyState, { createCompany }] = useReducerCompany();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty, isValidating },
  } = useForm<Step2Data>({
    resolver: yupResolver(formSchema),
    defaultValues: companyState,
  });
  const { moveForward } = useTab();
  const [companySegment, setCompanySegment] = useState<string>(
    companyState.companySegment ?? '',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 930px)');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'companySegment',
    onChange: (value) => setCompanySegment(value),
  });
  const group = getRootProps();

  const handleStep2Submit: SubmitHandler<Step2Data> = (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      phone: data.phone
        .replace(' ', '')
        .replace('(', '')
        .replace(')', '')
        .replace('-', ''),
      zipCode: data.zipCode.replace('-', ''),
      cnpj: data.cnpj.replaceAll('.', '').replace('/', '').replace('-', ''),
      companySegment,
    };
    createCompany(formData);

    if (standaloneToast.isActive('company-created-toast')) return null;
    standaloneToast({
      id: 'company-created-toast',
      title: 'Empresa criada com sucesso!',
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

  const handleZipCodeChange = debounce(async (zipCode: string) => {
    if (zipCode.includes('_')) return null;
    setIsLoading(true);
    try {
      const { complemento, bairro, logradouro } = await getAddressByZipCode(
        zipCode,
      );
      setValue('zipCode', zipCode);
      setValue('complement', complemento);
      setValue('district', bairro);
      setValue('address', logradouro);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, 500);

  return (
    <Stack spacing={10}>
      <Stack spacing={5}>
        <Text size="xsm" variant="regular">
          Agora cadastre as informações de sua emprea para criar sua conta
          empresarial
          {isMobile ? null : <br />} customizada para seu negócio
        </Text>
        <Text size="xsm" color="blue.heading">
          Escolha o segmento de sua empresa:
        </Text>
        <HStack spacing={6} {...group}>
          {options.map(({ value, icon }) => {
            const radio = getRadioProps({ value });
            return (
              <RadioCard key={value} icon={icon} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      </Stack>
      <Divider />
      <Flex
        as="form"
        direction="column"
        onSubmit={handleSubmit(handleStep2Submit)}>
        <Stack spacing={5}>
          <Select
            error={errors.companyType}
            label="Tipo de empresa"
            placeholder="Selecione o tipo de empresa"
            options={companiesType}
            w={['100%', '75%', '50%']}
            {...register('companyType')}
          />
          <Input
            type="tel"
            as={ReactInputMask}
            mask="99.999.999/9999-99"
            error={errors.cnpj}
            label="CNPJ"
            {...register('cnpj')}
            w={['100%', '75%', '50%', '25%']}
          />
          <Stack direction={['column', 'column', 'row']} spacing={[2, 3]}>
            <Input
              error={errors.corporateName}
              label="Razão social"
              {...register('corporateName')}
            />
            <Input
              type="tel"
              as={ReactInputMask}
              mask="(99) 9999-9999"
              error={errors.phone}
              label="Telefone"
              {...register('phone')}
              w={['100%', '75%', '50%']}
            />
          </Stack>
          <HStack spacing={3}>
            <Input
              type="tel"
              as={ReactInputMask}
              mask="99999-999"
              error={errors.zipCode}
              label="CEP"
              {...register('zipCode')}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              w={['40%', '35%', '25%', '20%']}
            />
            {isLoading && <Spinner size="md" />}
          </HStack>
          <Input
            error={errors.address}
            label="Endereço"
            {...register('address')}
            w={['100%', '75%', '50%']}
          />
          <Stack direction={['column', 'column', 'row']} spacing={[2, 3]}>
            <Input
              error={errors.addressNumber}
              label="Número"
              {...register('addressNumber')}
            />
            <Input
              error={errors.complement}
              label="Complemento"
              {...register('complement')}
            />
            <Input
              error={errors.district}
              label="Bairro"
              {...register('district')}
            />
          </Stack>
        </Stack>

        <TabPanelFooter
          footerButtonIsDisabled={!isDirty || companySegment.length < 1}
          footerButtonIsLoading={isSubmitting || isValidating || isLoading}
          footerButtonText="Confirmar"
        />
      </Flex>
    </Stack>
  );
}
