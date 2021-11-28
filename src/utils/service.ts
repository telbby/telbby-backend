/* eslint-disable no-bitwise */
import { UploadApiErrorResponse, v2 } from 'cloudinary';

import ErrorResponse from './error-response';

export const uuidv4 = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const uploadFileOnCloudinary = async (file: Express.Multer.File): Promise<string> => {
  const { buffer } = file;
  const bufferString = `data:image/jpeg;base64,${buffer.toString('base64')}`;

  try {
    const { url } = await v2.uploader.upload(bufferString, {
      upload_preset: 'image_upload_preset',
    });

    return url;
  } catch (e) {
    const { message, http_code: statusCode } = e as UploadApiErrorResponse;
    throw new ErrorResponse({ message, statusCode });
  }
};
