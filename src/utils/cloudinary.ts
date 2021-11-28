import { UploadApiOptions, v2 } from 'cloudinary';

import repositoryConfig from '../config';

v2.config({
  cloud_name: repositoryConfig.cloudinaryOptions.cloudName,
  api_key: repositoryConfig.cloudinaryOptions.apiKey,
  api_secret: repositoryConfig.cloudinaryOptions.apiSecret,
});

export const uploadBufferOnCloudinary = async (
  buffer: Buffer,
  options: UploadApiOptions = {
    upload_preset: 'image_upload_preset',
  },
): Promise<string> => {
  const bufferString = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  const { url } = await v2.uploader.upload(bufferString, options);
  return url;
};
