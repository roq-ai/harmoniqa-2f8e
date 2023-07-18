import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createVotingTopic } from 'apiSdk/voting-topics';
import { Error } from 'components/error';
import { votingTopicValidationSchema } from 'validationSchema/voting-topics';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { VotingTopicInterface } from 'interfaces/voting-topic';

function VotingTopicCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: VotingTopicInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createVotingTopic(values);
      resetForm();
      router.push('/voting-topics');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<VotingTopicInterface>({
    initialValues: {
      topic_name: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: votingTopicValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Voting Topic
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="topic_name" mb="4" isInvalid={!!formik.errors?.topic_name}>
            <FormLabel>Topic Name</FormLabel>
            <Input type="text" name="topic_name" value={formik.values?.topic_name} onChange={formik.handleChange} />
            {formik.errors.topic_name && <FormErrorMessage>{formik.errors?.topic_name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'voting_topic',
    operation: AccessOperationEnum.CREATE,
  }),
)(VotingTopicCreatePage);
