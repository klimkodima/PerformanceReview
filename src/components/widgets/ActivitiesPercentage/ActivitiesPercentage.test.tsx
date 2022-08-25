import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import '@testing-library/jest-dom/extend-expect';

import i18n from 'src/i18n';
import store from 'src/store';
import {
  AuditActivitiesType,
  setAuditActivities
} from 'src/store/ActivitiesPercentage';
import ActivitiesPercentageContainer from './ActivitiesPercentageContainer';
import { Card } from './Card';
import { createCardData } from './helpers';

const mockData: AuditActivitiesType = {
  totalTimeSpend: 225600,
  labels: [
    {
      name: 'Audits',
      totalTimeSpend: 90000,
      percentage: 39.8936170212766
    },
    {
      name: 'Meetings',
      totalTimeSpend: 55800,
      percentage: 24.73404255319149
    },
    {
      name: 'Others',
      totalTimeSpend: 37800,
      percentage: 16.75531914893617
    },
    {
      name: 'Support',
      totalTimeSpend: 42000,
      percentage: 18.617021276595743
    }
  ]
};

const cardData = createCardData(mockData.labels, mockData.totalTimeSpend);

describe('Card  Component', () => {
  describe('Matches snapshots', () => {
    it('Matches not zero snapshot', () => {
      const card = renderer
        .create(
          <I18nextProvider i18n={i18n}>
            <Card cardData={cardData} />
          </I18nextProvider>
        )
        .toJSON();
      expect(card).toMatchSnapshot();
    });
  });
  describe('Matches total label and value', () => {
    it('Matches total value', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <Card cardData={cardData} />
        </I18nextProvider>
      );
      expect(screen.getByTestId('totalTime')).toHaveTextContent(
        String(cardData.totalTimeSpend)
      );
    });
    it('Matches total label', () => {
      render(
        <I18nextProvider i18n={i18n}>
          <Card cardData={cardData} />
        </I18nextProvider>
      );
      expect(screen.getByTestId('totalTimeLabel')).toHaveTextContent(
        'Total time:'
      );
    });
  });
  describe('Matches activity labels and values', () => {
    it('Matches activity labels', () => {
      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <Card cardData={cardData} />
        </I18nextProvider>
      );
      expect(container.getElementsByClassName('card-label')).toHaveLength(
        cardData.labels.length + 1
      );
    });
    it('Matches activity values', () => {
      const { container } = render(
        <I18nextProvider i18n={i18n}>
          <Card cardData={cardData} />
        </I18nextProvider>
      );
      expect(container.getElementsByClassName('card-value')).toHaveLength(
        cardData.labels.length + 1
      );
    });
  });
  describe('Matches sorted activities', () => {
    it('Matches max activity', () => {
      const { container } = render(<Card cardData={cardData} />);
      expect(container.getElementsByClassName('card-value')).toHaveLength(5);
      expect(
        container.getElementsByClassName('card-value')[1]
      ).toHaveTextContent(String(cardData.labels[0].value) + 'h');
    });
    it('Matches min actievity', () => {
      const { container } = render(<Card cardData={cardData} />);
      expect(container.getElementsByClassName('card-value')).toHaveLength(5);
      expect(
        container.getElementsByClassName('card-value')[2]
      ).toHaveTextContent(String(cardData.labels[1].value) + 'h');
    });
  });
});

describe('ActivitiesPercentageContainer', () => {
  test('Matches snapshot', () => {
    store.dispatch(setAuditActivities(mockData));

    const { container, getByTestId } = render(
      <Provider store={store}>
        <ActivitiesPercentageContainer />
      </Provider>
    );
    expect(getByTestId('totalTime')).toHaveTextContent('63h');
    expect(container.getElementsByClassName('card-value')[1]).toHaveTextContent(
      String(cardData.labels[0].value) + 'h'
    );
    expect(container.getElementsByClassName('card-value')[2]).toHaveTextContent(
      String(cardData.labels[1].value) + 'h'
    );
    expect(container.getElementsByClassName('card-value')[3]).toHaveTextContent(
      String(cardData.labels[2].value) + 'h'
    );
  });

  test('Matches snapshot with 33 percentages', () => {
    const mock33PercentageData: AuditActivitiesType = {
      totalTimeSpend: 32400,
      labels: [
        {
          name: 'Audits',
          totalTimeSpend: 10800,
          percentage: 33.333333
        },
        {
          name: 'Meetings',
          totalTimeSpend: 10800,
          percentage: 33.333333
        },
        {
          name: 'Support',
          totalTimeSpend: 10800,
          percentage: 33.333333
        }
      ]
    };

    const card33PercentageData = createCardData(
      mock33PercentageData.labels,
      mock33PercentageData.totalTimeSpend
    );

    store.dispatch(setAuditActivities(mock33PercentageData));

    const { container, getByTestId } = render(
      <Provider store={store}>
        <ActivitiesPercentageContainer />
      </Provider>
    );
    expect(getByTestId('totalTime')).toHaveTextContent('9h');
    expect(container.getElementsByClassName('card-value')[1]).toHaveTextContent(
      String(card33PercentageData.labels[0].value) + 'h'
    );
    expect(container.getElementsByClassName('card-value')[2]).toHaveTextContent(
      String(card33PercentageData.labels[1].value) + 'h'
    );
    expect(container.getElementsByClassName('card-value')[3]).toHaveTextContent(
      String(card33PercentageData.labels[2].value) + 'h'
    );
  });
});
