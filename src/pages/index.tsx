import { Center } from '@chakra-ui/react';

import Header from '../components/Header';
import { Stepper } from '../components/Stepper';

export default function Home() {
  return (
    <>
      <Header />
      <Center w={['100%']} mt={5}>
        <Stepper />
      </Center>
    </>
  );
}
