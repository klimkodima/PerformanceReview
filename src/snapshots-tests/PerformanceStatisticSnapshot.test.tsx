import { I18nextProvider } from 'react-i18next';
import i18n from 'src/i18n';

import puppeteer from 'puppeteer';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import store from 'src/store';
import mockPerformanceStatisticsData from 'src/store/PerformanceStatistic/mockPerformanceStatistics.json';
import { PerformanceStatisticContainer } from 'src/components/widgets';

expect.extend({ toMatchImageSnapshot });

describe('Render PerformanceStatistic Component', () => {
  it('Expect PerformanceStatistic to be in the document', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PerformanceStatisticContainer />
        </Provider>
      </I18nextProvider>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('performance-statistics');
  });

  it('Matches image snapshot PerformanceStatistic', async () => {
    const browser = await puppeteer.launch({
      args: ['--disable-web-security']
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.url().includes('widget/PerformanceStatistics')) {
        void request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockPerformanceStatisticsData)
        });
      } else {
        void request.continue();
      }
    });

    await page.goto('http://localhost:3000');

    await page.waitForSelector('.login-form');

    await page.click('.login-form-input__username');
    await page.type('.login-form-input__username', 'root');
    await page.click('.login-form-input__password');
    await page.type('.login-form-input__password', 'ac8fd58as6dgf584');

    await page.click('.login-form__button');

    await page.waitFor(900);

    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    });

    const element = await page.$('.performance-statistics');
    const image = await element?.screenshot();

    expect(image).toMatchImageSnapshot({ allowSizeMismatch: true });
    await browser.close();
  }, 30000);
});
