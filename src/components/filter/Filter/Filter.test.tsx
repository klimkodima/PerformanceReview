import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';
import Filter from './Filter';
import { mockTeamFilter, mockLevelsFilter, mockAuditorsFilter } from '../data';
import store from '../../../store';

describe('Filter', () => {
  test('Matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Filter
              teamFilter={mockTeamFilter}
              levelFilter={mockLevelsFilter}
              auditorFilter={mockAuditorsFilter}
            />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
