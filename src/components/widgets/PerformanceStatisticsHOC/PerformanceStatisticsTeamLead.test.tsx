import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import store from 'src/store';
import PerformanceStatisticsTeamLead from './PerformanceStatisticsTeamLead';

describe('Render PerformanceStatisticsTeamLead Component', () => {
  it('Expect checkbox works', () => {
    const { getByRole } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PerformanceStatisticsTeamLead />
        </Provider>
      </I18nextProvider>
    );
    const checkbox = getByRole('checkbox');
    const heading = getByRole('heading', { level: 2 });

    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(heading).toHaveTextContent(/Performance Statistics/i);
    expect(heading).toBeInTheDocument();
  });
});
