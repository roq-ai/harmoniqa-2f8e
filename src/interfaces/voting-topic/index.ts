import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface VotingTopicInterface {
  id?: string;
  topic_name: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface VotingTopicGetQueryInterface extends GetQueryInterface {
  id?: string;
  topic_name?: string;
  organization_id?: string;
}
