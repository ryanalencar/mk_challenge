import React, { useState } from 'react';

import { HStack, Stack, Text, useRadioGroup } from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { MdOutlineRouter } from 'react-icons/md';

import RadioCard from '../../RadioCard';

const options = [
  { value: 'Provedores de internet', icon: MdOutlineRouter },
  { value: 'Outros segmentos', icon: FiMoreHorizontal },
];
export function Step2() {
  const [companySegment, setCompanySegment] = useState<string>();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'companySegment',
    defaultValue: 0,
    onChange: (value) => setCompanySegment(value),
  });

  console.log(companySegment);

  const group = getRootProps();

  return (
    <Stack spacing={10}>
      <Stack spacing={3}>
        <Text size="xsm" variant="regular">
          Agora cadastre as informações de sua emprea para criar sua conta
          empresarial
          <br /> customizada para seu negócio
        </Text>
        <Text size="xsm" color="blue.heading">
          Escolha o segmento de sua empresa:
        </Text>
        <HStack {...group}>
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
    </Stack>
  );
}
