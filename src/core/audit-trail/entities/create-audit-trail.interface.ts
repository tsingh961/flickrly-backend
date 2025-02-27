// import { TCurrentUserType } from '@auth/types/user.type';
import mongoose, { Document } from 'mongoose';

// later to be imported from the auth module
type TCurrentUserType = {
  sub: string;
  name: string;
  email: string;
  refreshToken?: string;
  userType: string;
  profileId: string;
};

export interface ICreateAuditTrail {
  action: string;
  collectionName: string;
  user: TCurrentUserType;
  objectId: mongoose.Types.ObjectId;
  existingData?: Document;
  newData?: Document;
}
