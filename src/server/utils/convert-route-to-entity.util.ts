const mapping: Record<string, string> = {
  'community-discussions': 'community_discussion',
  'educational-resources': 'educational_resource',
  organizations: 'organization',
  users: 'user',
  'voting-topics': 'voting_topic',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
