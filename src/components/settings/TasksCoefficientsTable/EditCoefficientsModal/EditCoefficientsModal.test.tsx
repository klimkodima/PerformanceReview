import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import store from 'src/store';
import { setCurrentEditData, WebsiteGroupType } from 'src/store/TasksCoeff';
import EditCoefficientsModal from './EditCoefficientsModal';
import EditCoefficientsModalContainer from './EditCoefficientsModalContainer';

beforeAll(() => {
  store.dispatch(
    setCurrentEditData({
      taskType: 'PHONE',
      auditType: 'initial',
      groupCoefficient: 1,
      websiteGroup: 'Data Aggregators',
      websiteName: undefined,
      websiteCoefficient: undefined
    })
  );
});

const mockWebsiteGroupsData: WebsiteGroupType[] = [
  {
    websiteGroup: 'Data Aggregators',
    groupCoefficients: {
      initial: {
        PHONE: 1,
        MANUAL_CHECK_IMAGES: 1,
        MAP_MEAL_ITEM: 1
      },
      reaudit: {
        PHONE: 1,
        MANUAL_CHECK_IMAGES: 1,
        MAP_MEAL_ITEM: 1
      }
    },
    website: [
      {
        websiteName: 'CitySeeker.com',
        coefficients: {
          initial: {
            MAP_MEAL_ITEM: 2
          },
          reaudit: {}
        }
      },
      {
        websiteName: 'foursquare.com',
        coefficients: {
          initial: {
            MAP_MEAL_ITEM: 2
          },
          reaudit: {}
        }
      },
      {
        websiteName: 'Data Axle',
        coefficients: {
          initial: {
            PHONE: 2,
            MAP_MEAL_ITEM: 2
          },
          reaudit: {}
        }
      },
      {
        websiteName: 'neustarlocaleze.biz'
      }
    ]
  },
  {
    websiteGroup: 'Reviews',
    groupCoefficients: {
      initial: {
        PHONE: 1,
        MANUAL_CHECK_IMAGES: 1,
        MAP_MEAL_ITEM: 1
      },
      reaudit: {
        PHONE: 1,
        MANUAL_CHECK_IMAGES: 1,
        MAP_MEAL_ITEM: 1
      }
    },
    website: [
      {
        websiteName: 'yelp.com',
        coefficients: {
          initial: {
            PHONE: 5,
            MANUAL_CHECK_IMAGES: 3
          },
          reaudit: {
            MAP_MEAL_ITEM: 2
          }
        }
      },
      {
        websiteName: 'tripexpert.com'
      },
      {
        websiteName: 'oyster.com'
      }
    ]
  }
];

describe('EditCoefficientsModal', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <EditCoefficientsModal
              coefficientInputError={null}
              coefficientValue={1}
              handleCoefficientErrors={() => true}
              onClose={() => true}
              currentEditData={
                store.getState().tasksCoefficient.currentEditData
              }
              onCoefficientChange={() => true}
              websiteGroupsData={mockWebsiteGroupsData}
              isSaveButtonDisabled={false}
              onFormSubmit={() => true}
              isWebsiteGroupsOpen={true}
              onWebsiteGroupsArrowClick={() => true}
            />
          </Provider>
        </I18nextProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('container renders correctly', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <EditCoefficientsModalContainer onClose={() => true} />
        </Provider>
      </I18nextProvider>
    );
    expect(screen.getByTestId('modal-overlay')).toMatchSnapshot();
  });

  test('validation works', () => {
    const root = document.createElement('div');
    root.setAttribute('id', 'portal');
    document.body.appendChild(root);

    render(
      <Provider store={store}>
        <EditCoefficientsModalContainer onClose={() => true} />
      </Provider>
    );
    const input = screen.getByTestId('coefficient-input');
    fireEvent.change(input, {
      target: { value: 0 }
    });
    fireEvent.click(screen.getByText(/Save/i));
    expect(input).toHaveClass('error');

    fireEvent.change(input, {
      target: { value: 1 }
    });
    fireEvent.blur(input);
    expect(input).not.toHaveClass('error');
  });
});
