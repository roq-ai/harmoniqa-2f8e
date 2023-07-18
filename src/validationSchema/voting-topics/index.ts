import * as yup from 'yup';

export const votingTopicValidationSchema = yup.object().shape({
  topic_name: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
