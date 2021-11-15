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
