import { CommunityDiscussionInterface } from 'interfaces/community-discussion';
import { EducationalResourceInterface } from 'interfaces/educational-resource';
import { VotingTopicInterface } from 'interfaces/voting-topic';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  community_discussion?: CommunityDiscussionInterface[];
  educational_resource?: EducationalResourceInterface[];
  voting_topic?: VotingTopicInterface[];
  user?: UserInterface;
  _count?: {
    community_discussion?: number;
    educational_resource?: number;
    voting_topic?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
