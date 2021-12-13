import ThemeEntity from '../entity/theme';

export interface ProjectBasicInfo {
  name: string;
  description?: string;
  domain?: string;
}

export interface ProjectInfo extends ProjectBasicInfo {
  clientId: string;
  image: string;
  question: string;
  themeId: number;
  userId: string;
}

export interface EditableProjectInfo
  extends Omit<Partial<ProjectInfo>, 'clientId' | 'image' | 'userId'> {
  image: Express.Multer.File;
}

export interface InsertableProjectInfo extends Omit<EditableProjectInfo, 'themeId' | 'image'> {
  theme?: ThemeEntity;
  image?: string;
}
