import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from 'src/store';
import Switch from './Switch';

describe('Switch test', () => {
  test('Switch renders correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Switch
            isDisabled={true}
            checked={true}
            onChange={() => true}
            disabledText='Inactive'
            enabledText='Active'
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Switch disabled text should have class disabled', () => {
    render(
      <Switch
        isDisabled={true}
        checked={true}
        onChange={() => true}
        disabledText='Inactive'
        enabledText='Active'
      />
    );
    expect(screen.getByText('Inactive')).toHaveClass('disabled');
  });

  test('Switch enabled text should have class disabled', () => {
    render(
      <Switch
        isDisabled={true}
        checked={false}
        onChange={() => true}
        disabledText='Inactive'
        enabledText='Active'
      />
    );
    expect(screen.getByText('Active')).toHaveClass('disabled');
  });

  test('Switch should be disabled', () => {
    render(
      <Switch
        isDisabled={true}
        checked={false}
        onChange={() => true}
        disabledText='Inactive'
        enabledText='Active'
      />
    );
    expect(screen.getByRole('checkbox')).toHaveAttribute('disabled');
    expect(screen.getByTestId('switch-label-test')).toHaveClass(
      'disabled-switch'
    );
  });
});
