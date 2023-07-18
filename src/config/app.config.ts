interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Organization Owner'],
  customerRoles: ['End User'],
  tenantRoles: ['Organization Owner'],
  tenantName: 'Organization',
  applicationName: 'Harmoniqa',
  addOns: [],
};
