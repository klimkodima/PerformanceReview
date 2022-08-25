import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import App from 'src/App';
import store from 'src/store';
import { CriteriaWidgets } from 'src/components/widgets';
import { setIsAuth } from 'src/store/Auth';
import { getOrderNumber } from '../commonFunctions';
import { IMAGE_WIDTH } from './constants';

import {
  addOverlayAndSpinner,
  getDate,
  prepareStylesForScreenshots,
  resetStyles
} from './helpers';
import { setAvailableWidgets } from '../../store/App';
import { WIDGETS } from '../../constants';

describe('validate getOrderNumber function', () => {
  test('weekday equal 1', () => {
    expect(getOrderNumber(1)).toBe('1st');
  });

  test('weekday equal 2', () => {
    expect(getOrderNumber(2)).toBe('2nd');
  });

  test('weekday equal 3', () => {
    expect(getOrderNumber(3)).toBe('3rd');
  });

  test('weekday equal 4', () => {
    expect(getOrderNumber(4)).toBe('4th');
  });

  test('weekday greater then 4', () => {
    expect(getOrderNumber(15)).toBe('15th');
  });

  test('weekday contains zero', () => {
    expect(getOrderNumber(20)).toBe('the 20th');
  });
});

describe('validate correct date representation', () => {
  test('start date', () => {
    expect(getDate(new Date('04.01.22'))).toBe('1st April 2022');
  });

  test('finish date', () => {
    expect(getDate(new Date('04.20.22'))).toBe('the 20th April 2022');
  });

  test('start and finish date', () => {
    expect(
      `${getDate(new Date('04.01.22'))} - ${getDate(new Date('04.20.22'))}`
    ).toBe('1st April 2022 - the 20th April 2022');
  });
});

describe('add overlay and spinner', () => {
  test('expect overlay and spinner in document', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    addOverlayAndSpinner();

    const overlay = document.querySelector('.print-overlay');

    expect(overlay).toBeInTheDocument();
  });
});

describe('show and hide tooltip text', () => {
  test('tooltip text to be in document', () => {
    render(
      <Provider store={store}>
        <CriteriaWidgets />
      </Provider>
    );

    const tooltip = document.querySelector('.criteria-item .tooltip-text');

    expect(tooltip).toBeInTheDocument();
  });

  test('display tooltip text is none', () => {
    render(
      <Provider store={store}>
        <CriteriaWidgets />
      </Provider>
    );

    const tooltip = document.querySelector(
      '.criteria-item .tooltip-text'
    ) as HTMLElement;

    expect(tooltip.style.display).toBe('none');
  });
});

describe('prepare styles for screenshots test', () => {
  beforeAll(() => {
    store.dispatch(setIsAuth(true));
    store.dispatch(
      setAvailableWidgets({
        availableWidgets: [WIDGETS.PERFORMANCE_STATISTICS],
        settingsPermission: 'NONE'
      })
    );
  });

  test('change and reset width and color of the element', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const performanceStatistics = document.getElementById(
      'performance-statistics-widget'
    );

    expect(performanceStatistics).toHaveStyle({ width: '' });
    prepareStylesForScreenshots();
    expect(performanceStatistics).toHaveStyle({ width: `${IMAGE_WIDTH}px` });
    resetStyles();
    expect(performanceStatistics).toHaveStyle({ width: '' });
  });
});
