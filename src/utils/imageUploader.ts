import {media_upload} from 'api/mediaUpload';
// import {CLOUDINARY_BASE_URL, CLOUDINARY_PRESET} from 'config/cloudinary';
import ImagePicker from 'react-native-image-crop-picker';

export const image_uploader = async (
  type: 'C' | 'F',
  isUploadFirebase?: boolean,
  cropping: boolean = true,
  mediaType: 'any' | 'photo' | 'video' = 'photo',
) => {
  try {
    let result;
    if (type === 'C') {
      result = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: cropping,
        compressImageQuality: 0.5,
        mediaType: mediaType,
      });
    } else {
      result = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: cropping,
        compressImageQuality: 0.5,
        mediaType: mediaType,
      });
    }

    const fileType = result.mime.split('/')[0];

    const file = {
      name: fileType,
      uri: result.path,
      type: result.mime,
    };

    if (isUploadFirebase) {
      const formData = new FormData();
      formData.append('file', file as any);

      const res = await media_upload(formData);
      // console.log(res.data.url);

      return res?.data?.url;
    } else {
      return file;
    }
  } catch (error) {
    throw error;
  }
};
