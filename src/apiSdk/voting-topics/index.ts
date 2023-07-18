import axios from 'axios';
import queryString from 'query-string';
import { VotingTopicInterface, VotingTopicGetQueryInterface } from 'interfaces/voting-topic';
import { GetQueryInterface } from '../../interfaces';

export const getVotingTopics = async (query?: VotingTopicGetQueryInterface) => {
  const response = await axios.get(`/api/voting-topics${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVotingTopic = async (votingTopic: VotingTopicInterface) => {
  const response = await axios.post('/api/voting-topics', votingTopic);
  return response.data;
};

export const updateVotingTopicById = async (id: string, votingTopic: VotingTopicInterface) => {
  const response = await axios.put(`/api/voting-topics/${id}`, votingTopic);
  return response.data;
};

export const getVotingTopicById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/voting-topics/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVotingTopicById = async (id: string) => {
  const response = await axios.delete(`/api/voting-topics/${id}`);
  return response.data;
};
