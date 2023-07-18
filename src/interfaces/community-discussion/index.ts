import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface CommunityDiscussionInterface {
  id?: string;
  discussion_topic: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface CommunityDiscussionGetQueryInterface extends GetQueryInterface {
  id?: string;
  discussion_topic?: string;
  organization_id?: string;
}
