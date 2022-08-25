import { FC, ReactElement, useState, ChangeEvent, useEffect } from 'react';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

import { HoursCorType } from 'src/store/HoursCorrespondence/types';
import { receiveNewRow } from '../../common/helpers';

type FileLoadPropsType = {
  id: string;
  rowsState: HoursCorType[];
  setRowsState: (arg: HoursCorType[]) => void;
  item: {
    value: string;
    isError: boolean;
  };
};

const FileLoad: FC<FileLoadPropsType> = ({
  id,
  rowsState,
  setRowsState,
  item
}): ReactElement => {
  const [isFile, setIsFile] = useState<boolean>(false);
  const { isError, value } = item;
  const fileIcon = isFile ? <FileDownloadDoneIcon /> : <FileDownloadIcon />;
  const fileText = isFile ? 'File added' : 'Choose a file';
  const fileErrorClass = isError ? 'error-input' : '';

  const getBase64 = (file: Blob): Promise<unknown> => {
    return new Promise((resolve, reject): void => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (): void => resolve(reader.result);
      reader.onerror = (error): void => reject(error);
    });
  };

  const changeFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: FileList | null = e.target.files;
    const name = e.target.name;

    if (file?.length !== 0 && file) {
      getBase64(file[0])
        .then((data): void => {
          const value = data as string;
          const newRows = receiveNewRow(name, value, id, rowsState);
          setRowsState(newRows);
          setIsFile(true);
        })
        .catch((error): void => console.log(error));
    } else {
      const value = '';
      const newRows = receiveNewRow(name, value, id, rowsState);
      setRowsState(newRows);
      setIsFile(false);
    }
  };

  useEffect(() => {
    if (item.value.length !== 0) {
      setIsFile(true);
    }
  }, []);

  return (
    <>
      <input
        type='file'
        id={`file${id}`}
        name='icon'
        required
        accept='.svg, .ico, .png'
        data-testid='fileLoad'
        onChange={changeFile}
      />
      <label htmlFor={`file${id}`} className={fileErrorClass}>
        <span className='file-load__icon'>{fileIcon}</span>
        <span className='file-load__text'>{fileText}</span>
        {isFile && <img src={value} alt='icon' />}
      </label>
    </>
  );
};

export default FileLoad;
