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
import { getEducationalResourceById, updateEducationalResourceById } from 'apiSdk/educational-resources';
import { Error } from 'components/error';
import { educationalResourceValidationSchema } from 'validationSchema/educational-resources';
import { EducationalResourceInterface } from 'interfaces/educational-resource';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function EducationalResourceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EducationalResourceInterface>(
    () => (id ? `/educational-resources/${id}` : null),
    () => getEducationalResourceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EducationalResourceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEducationalResourceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/educational-resources');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EducationalResourceInterface>({
    initialValues: data,
    validationSchema: educationalResourceValidationSchema,
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
            Edit Educational Resource
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
            <FormControl id="resource_name" mb="4" isInvalid={!!formik.errors?.resource_name}>
              <FormLabel>Resource Name</FormLabel>
              <Input
                type="text"
                name="resource_name"
                value={formik.values?.resource_name}
                onChange={formik.handleChange}
              />
              {formik.errors.resource_name && <FormErrorMessage>{formik.errors?.resource_name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="category" mb="4" isInvalid={!!formik.errors?.category}>
              <FormLabel>Category</FormLabel>
              <Input type="text" name="category" value={formik.values?.category} onChange={formik.handleChange} />
              {formik.errors.category && <FormErrorMessage>{formik.errors?.category}</FormErrorMessage>}
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
    entity: 'educational_resource',
    operation: AccessOperationEnum.UPDATE,
  }),
)(EducationalResourceEditPage);
