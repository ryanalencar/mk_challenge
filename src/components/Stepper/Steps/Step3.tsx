import React, { useEffect, useState } from 'react';

import { Stack, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { useTab } from '../../../hooks/useTab';
import { uploadDocs } from '../../../store/features/form/formSlice';
import { FileUpload } from '../../Form/FileUpload';
import { UploadBox, UploadBoxOptions } from '../../Form/FileUpload/UploadBox';
import { TabPanelFooter } from '../TabPanel/TabPanelFooter';

type Step3Data = {
  file_: FileList;
};

const docOptions: UploadBoxOptions[] = [
  {
    title: 'Contrato social',
    description: 'Envie o contrato social completo da empresa',
    sent: false,
  },
  {
    title: 'RG ou CNH do responsável ou sócio',
    description: 'Envie uma cópia do documento de pessoa física',
    sent: false,
  },
  {
    title: 'Selfie com documento',
    description: 'Tire uma selfie segurando o documento de identificação',
    sent: false,
  },
];

export function Step3() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step3Data>({
    mode: 'all',
    reValidateMode: 'onChange',
  });
  const [docs, setDocs] = useState<FileList[]>([]);
  const { moveForward } = useTab();

  const handleStep3Submit = handleSubmit((data) => {
    if (docs.length === 3) uploadDocs(docs);
    setDocs([...docs, data.file_]);
  });

  useEffect(() => {
    docs.map((file, index) => {
      if (docs[index]) docOptions[index].sent = true;
      else docOptions[index].sent = false;
    });
  }, [docs]);

  const validateFiles = (value: FileList) => {
    if (value.length < 1) {
      return 'Arquivo é obrigatório';
    }
    for (const file of Array.from(value)) {
      const fsMb = file.size / (1024 * 1024);
      const MAX_FILE_SIZE = 10;
      if (fsMb > MAX_FILE_SIZE) {
        return 'Tamanho máximo de arquivo é 10mb';
      }
    }
    return true;
  };

  return (
    <Stack spacing={10}>
      <Stack spacing={5}>
        <Text size="xsm" variant="regular">
          Para concluir o processo de cadastro, você deve enviar os documentos
          da empresa
          <br /> e de identificação sua como responsável pela empresa
        </Text>
        <Text size="xsm" color="blue.heading">
          Envie os documentos abaixo:
        </Text>
        <form onSubmit={handleStep3Submit}>
          <FileUpload
            onChange={handleStep3Submit}
            error={errors.file_}
            accept="image/*,.pdf"
            register={register('file_', {
              validate: validateFiles,
            })}>
            <Stack spacing={5}>
              {docOptions.map((options) => (
                <VStack key={options.title} align="start">
                  <UploadBox options={options} />
                </VStack>
              ))}
            </Stack>
          </FileUpload>
        </form>
      </Stack>
      <TabPanelFooter
        footerButtonIsDisabled={docs.length < 3}
        footerButtonText="Continuar"
        footerButtonOnClick={moveForward}
      />
    </Stack>
  );
}
