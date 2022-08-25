import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import store from 'src/store';
import { setCurrentEditData } from 'src/store/TasksCoeff';
import GroupsList from './GroupsList';
import GroupsListContainer from './GroupsListContainer';

beforeAll(() => {
  store.dispatch(
    setCurrentEditData({
      taskType: 'name',
      auditType: 'initial',
      groupCoefficient: 1,
      websiteGroup: 'OTA',
      websiteName: undefined,
      websiteCoefficient: undefined
    })
  );
});

const mockWebsite = [
  {
    websiteName: 'agoda.com',
    coefficients: {
      initial: { email: 0.6, fax: 0.25, name: 3 },
      reaudit: { address: 10, fax: 10, name: 4 }
    }
  },
  {
    websiteName: 'GPTS',
    coefficients: {
      initial: { name: 5, address: 1, web: 1, fax: 0.3, email: 0.25 },
      reaudit: { name: 6, address: 6, web: 6, fax: 6, email: 6 }
    }
  },
  {
    websiteName: '1siteWithGroupCoefficient.com'
  },
  {
    websiteName: '2siteWithGroupCoefficient.com'
  }
];

describe('GroupsList', () => {
  test('renders correctly', () => {
    const mockListWebsitesData = [
      {
        websiteName: 'some',
        checked: false,
        hasIndividualCoefficient: true
      },
      {
        websiteName: 'some2',
        checked: true,
        hasIndividualCoefficient: false
      }
    ];

    const mockWebsiteGroupData = {
      checked: false,
      websiteGroup: 'OTA'
    };

    const tree = renderer
      .create(
        <GroupsList
          onOpenWebsitesClick={() => true}
          onWebsiteClick={() => true}
          onWebsiteGroupClick={() => true}
          ListWebsitesData={mockListWebsitesData}
          isWebsitesOpen={true}
          websiteGroupData={mockWebsiteGroupData}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('container renders correctly', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <GroupsListContainer website={mockWebsite} websiteGroup='OTA' />
          </Provider>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('container group checkbox click works', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <GroupsListContainer website={mockWebsite} websiteGroup='OTA' />
        </Provider>
      </I18nextProvider>
    );
    expect(screen.getAllByTestId('custom-checkbox')[0]).toHaveClass(
      'Mui-checked'
    );
    fireEvent.click(screen.getByText(/OTA/));
    expect(screen.getAllByTestId('custom-checkbox')[0]).not.toHaveClass(
      'Mui-checked'
    );
    fireEvent.click(screen.getByText(/OTA/));
    expect(screen.getAllByTestId('custom-checkbox')[0]).toHaveClass(
      'Mui-checked'
    );
  });

  test('container website checkbox click works', () => {
    render(
      <Provider store={store}>
        <GroupsListContainer website={mockWebsite} websiteGroup='OTA' />
      </Provider>
    );
    expect(screen.getAllByTestId('custom-checkbox')[1]).not.toHaveClass(
      'Mui-checked'
    );
    fireEvent.click(screen.getByText(/agoda.com/));
    expect(screen.getAllByTestId('custom-checkbox')[1]).toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox').length).toBe(5);
  });

  test('group checkbox select only checkbox without individual coefficient', () => {
    render(
      <Provider store={store}>
        <GroupsListContainer website={mockWebsite} websiteGroup='OTA' />
      </Provider>
    );
    expect(screen.getAllByTestId('custom-checkbox')[0]).toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[1]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[2]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[3]).toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[4]).toHaveClass(
      'Mui-checked'
    );
    fireEvent.click(screen.getByText(/agoda.com/));
    fireEvent.click(screen.getByText(/OTA/));
    expect(screen.getAllByTestId('custom-checkbox')[0]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[1]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[2]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[3]).not.toHaveClass(
      'Mui-checked'
    );
    expect(screen.getAllByTestId('custom-checkbox')[4]).not.toHaveClass(
      'Mui-checked'
    );
  });
});
