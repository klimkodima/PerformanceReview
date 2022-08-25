import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import GroupsListItem from './GroupsListItem';

describe('GroupsListItem', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <GroupsListItem
          checked={true}
          onChange={() => true}
          hasIndividualCoefficient={false}
          label='some'
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('show exclamation mark if has individual coeff', () => {
    render(
      <GroupsListItem
        checked={false}
        onChange={() => true}
        hasIndividualCoefficient={true}
        label='some'
      />
    );
    expect(screen.getByTestId('PriorityHighIcon')).toBeInTheDocument();
  });

  test('shows check icon', () => {
    render(
      <GroupsListItem
        checked={true}
        onChange={() => true}
        hasIndividualCoefficient={true}
        label='some'
      />
    );
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument();
  });

  test('tooltip shows', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <GroupsListItem
          checked={true}
          onChange={() => true}
          hasIndividualCoefficient={true}
          label='some'
        />
      </I18nextProvider>
    );
    fireEvent.mouseOver(screen.getByTestId('PriorityHighIcon'));
    expect(
      await screen.findByText('Website with Individual coefficients')
    ).toBeInTheDocument();
  });
});
