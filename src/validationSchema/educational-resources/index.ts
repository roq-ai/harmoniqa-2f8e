import * as yup from 'yup';

export const educationalResourceValidationSchema = yup.object().shape({
  resource_name: yup.string().required(),
  category: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
