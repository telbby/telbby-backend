import ThemeEntity from '../entity/theme';

export interface ServiceBasicInfo {
  name: string;
  description?: string;
  domain?: string;
}

export interface ServiceInfo extends ServiceBasicInfo {
  clientId: string;
  image: string;
  question: string;
  themeId: number;
  userId: string;
}

export interface EditableServiceInfo
  extends Omit<Partial<ServiceInfo>, 'clientId' | 'image' | 'userUid'> {
  image: Express.Multer.File;
}

export interface InsertableServiceInfo extends Omit<EditableServiceInfo, 'themeId' | 'image'> {
  theme?: ThemeEntity;
  image?: string;
}
