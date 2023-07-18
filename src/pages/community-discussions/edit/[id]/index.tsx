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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCommunityDiscussionById, updateCommunityDiscussionById } from 'apiSdk/community-discussions';
import { Error } from 'components/error';
import { communityDiscussionValidationSchema } from 'validationSchema/community-discussions';
import { CommunityDiscussionInterface } from 'interfaces/community-discussion';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function CommunityDiscussionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CommunityDiscussionInterface>(
    () => (id ? `/community-discussions/${id}` : null),
    () => getCommunityDiscussionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CommunityDiscussionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCommunityDiscussionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/community-discussions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CommunityDiscussionInterface>({
    initialValues: data,
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
            Edit Community Discussion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(CommunityDiscussionEditPage);
