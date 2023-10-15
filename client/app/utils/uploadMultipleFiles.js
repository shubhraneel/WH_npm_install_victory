import { message } from 'antd';

export const createObjectUrl = file =>
  file ? window.URL.createObjectURL(file) : undefined;

export const uploadMultipleFiles = (event, setFilesState, filesState) => {
  const { files: eventFiles } = event.target;

  const filesArray = Object.values(eventFiles);

  const filenames = filesState.map(obj => obj.name);
  const filteredOutExisitngFiles = filesArray.filter(
    file => !filenames.includes(file.name),
  );

  if (filteredOutExisitngFiles.length !== filesArray.length)
    message.error('Some of the files were already selected!');

  const newState = [];
  filteredOutExisitngFiles.forEach(file => {
    const url = createObjectUrl(file);
    newState.push({
      url,
      file,
      name: file.name,
      type: file.type,
    });
  });

  setFilesState([...filesState, ...newState]);
};
