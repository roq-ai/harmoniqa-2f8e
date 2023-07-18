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
import { createCommunityDiscussion } from 'apiSdk/community-discussions';
import { Error } from 'components/error';
import { communityDiscussionValidationSchema } from 'validationSchema/community-discussions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { CommunityDiscussionInterface } from 'interfaces/community-discussion';

function CommunityDiscussionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CommunityDiscussionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCommunityDiscussion(values);
      resetForm();
      router.push('/community-discussions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CommunityDiscussionInterface>({
    initialValues: {
      discussion_topic: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: communityDiscussionValidationSchema,
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
            Create Community Discussion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="discussion_topic" mb="4" isInvalid={!!formik.errors?.discussion_topic}>
            <FormLabel>Discussion Topic</FormLabel>
            <Input
              type="text"
              name="discussion_topic"
              value={formik.values?.discussion_topic}
              onChange={formik.handleChange}
            />
            {formik.errors.discussion_topic && <FormErrorMessage>{formik.errors?.discussion_topic}</FormErrorMessage>}
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
    entity: 'community_discussion',
    operation: AccessOperationEnum.CREATE,
  }),
)(CommunityDiscussionCreatePage);
