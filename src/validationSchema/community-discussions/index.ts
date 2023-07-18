import * as yup from 'yup';

export const communityDiscussionValidationSchema = yup.object().shape({
  discussion_topic: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
