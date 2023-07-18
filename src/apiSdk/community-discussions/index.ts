import axios from 'axios';
import queryString from 'query-string';
import { CommunityDiscussionInterface, CommunityDiscussionGetQueryInterface } from 'interfaces/community-discussion';
import { GetQueryInterface } from '../../interfaces';

export const getCommunityDiscussions = async (query?: CommunityDiscussionGetQueryInterface) => {
  const response = await axios.get(`/api/community-discussions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCommunityDiscussion = async (communityDiscussion: CommunityDiscussionInterface) => {
  const response = await axios.post('/api/community-discussions', communityDiscussion);
  return response.data;
};

export const updateCommunityDiscussionById = async (id: string, communityDiscussion: CommunityDiscussionInterface) => {
  const response = await axios.put(`/api/community-discussions/${id}`, communityDiscussion);
  return response.data;
};

export const getCommunityDiscussionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/community-discussions/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteCommunityDiscussionById = async (id: string) => {
  const response = await axios.delete(`/api/community-discussions/${id}`);
  return response.data;
};
