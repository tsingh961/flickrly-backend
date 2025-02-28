export type TCurrentUserType = {
  sub: string;
  name: string;
  email: string;
  refreshToken?: string;
  userType: string;
  profileId: string;
};

export type TAdminUserType = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  //   permissions: Permission[];
  roles: string[];
};
