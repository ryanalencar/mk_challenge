import { Container } from '@chakra-ui/react';
import Image from 'next/image';

export default function Header() {
  return (
    <Container as="header" maxW="100%" h="100px" p={5}>
      <Image
        src="/images/logo.svg"
        alt="Worldtrip Logo"
        width={184}
        height={46}
      />
    </Container>
  );
}
