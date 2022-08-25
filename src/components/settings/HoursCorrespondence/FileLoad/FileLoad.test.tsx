import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileLoad from './FileLoad';

describe('FileLoad tests', () => {
  const id = '111';
  const base64 = 'data:image/png;base64';
  const rowStateValue = [
    {
      id: '111',
      status: {
        value: 'ok',
        isError: false,
        errorText: ''
      },
      icon: {
        value: base64,
        isError: false,
        errorText: ''
      },
      gap: {
        value: '51-100',
        isError: false,
        errorText: ''
      },
      confirmationRate: {
        value: '80',
        isError: false,
        errorText: ''
      },
      tooltipText: {
        value: 'text',
        isError: false,
        errorText: ''
      }
    }
  ];
  const setRowsState = jest.fn();

  test('Icon is visible', () => {
    const iconValue = {
      value: base64,
      isError: false,
      errorText: ''
    };

    const { getByAltText, getByText } = render(
      <FileLoad
        id={id}
        item={iconValue}
        rowsState={rowStateValue}
        setRowsState={setRowsState}
      />
    );

    const icon = getByAltText(/icon/i);
    expect(icon).toBeInTheDocument();
    expect(getByText(/File added/i)).toBeInTheDocument();
  });

  test('Icon is`t visible. Icon was added', () => {
    const iconValue = {
      value: '',
      isError: false,
      errorText: ''
    };

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const { queryByAltText, getByTestId, getByText } = render(
      <FileLoad
        id={id}
        item={iconValue}
        rowsState={rowStateValue}
        setRowsState={setRowsState}
      />
    );

    const icon = queryByAltText(/icon/i);
    expect(icon).toBeNull();
    expect(getByText(/Choose a file/i)).toBeInTheDocument();

    const input = getByTestId('fileLoad') as HTMLInputElement;
    userEvent.upload(input, file);
    if (input.files) {
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files.item(0)).toStrictEqual(file);
      expect(input.files[0].name).toEqual('hello.png');
    }
    expect(input.files).toHaveLength(1);
  });
});
