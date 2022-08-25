import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import store from 'src/store';
import i18n from 'src/i18n';
import { CommonTable } from 'src/components/common';
import { headCells, headerName } from './constants';

const mockTeamsData = [
  {
    leadName: 'Alphaname',
    name: 'Alpha',
    points: 25,
    performance: 3,
    validity: 100,
    correspondence: 97
  },
  {
    leadName: 'Charliename',
    name: 'Charlie',
    points: 13,
    performance: 1,
    validity: 100,
    correspondence: 97
  }
];

describe('TeamComparisonManager test', () => {
  test('TeamComparisonManager empty widget', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <CommonTable
              data={[]}
              isTeamComparisonLead={false}
              checkedTeams={[]}
              defaultOrderBy={'name'}
              headCells={headCells}
              placeholderText={'Widget is empty'}
              headerName={headerName}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test('TeamComparisonManager 2 rows table', () => {
    const component = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <CommonTable
              data={mockTeamsData}
              isTeamComparisonLead={false}
              checkedTeams={['Charlie', 'Alpha']}
              defaultOrderBy={'name'}
              headCells={headCells}
              placeholderText={''}
              headerName={headerName}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
