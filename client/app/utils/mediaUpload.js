import globalSettings from 'globalSettings';
import axios from 'axios';
import imageCompression from 'browser-image-compression';

export const createObjectUrl = file =>
  file ? window.URL.createObjectURL(file) : undefined;

// called on save to put media in the bucket
export async function uploadMedia(mediaArray, dispatch, setUploadProgress) {
  const mediaFiles = [];
  await Promise.all(
    mediaArray.map(async file => {
      const options = globalSettings.imageCompressionOptions;

      console.log(file);
      const fileToUpload = await imageCompression(file, options);
      console.log(fileToUpload);
      const params = {
        contentType: fileToUpload.type,
      };

      const url = await fetchUploadUrl(params);

      await axiosPutMedia(
        url.data.signedUrl,
        fileToUpload,
        dispatch,
        setUploadProgress,
      );

      mediaFiles.push(
        `https://website-hackathon-files.s3.ap-south-1.amazonaws.com/${
          url.data.key
        }`,
      );
    }),
  );

  return mediaFiles;
}

const axiosPutMedia = async (baseUrl, file, dispatch, setUploadProgress) => {
  const instance = axios.create();

  delete instance.defaults.headers.common.Authorization;

  await instance({
    baseURL: baseUrl,
    method: 'PUT',
    data: file,
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: progress =>
      uploadProgress(progress, dispatch, setUploadProgress),
  });
};

export async function fetchGetUrl(filenames) {
  return axios.post(
    `${globalSettings.backendRoute}/file-upload/generate-get-url`,
    { filenames },
  );
}

export async function fetchUploadUrl(params) {
  return axios.post(
    `${globalSettings.backendRoute}/file-upload/generate-put-url`,
    params,
  );
}

// upload loader on the header
function uploadProgress(progress, dispatch, setUploadProgress) {
  const { loaded, total } = progress;
  const percentageProgress = Math.floor((loaded / total) * 100);
  dispatch(setUploadProgress(percentageProgress));
}
