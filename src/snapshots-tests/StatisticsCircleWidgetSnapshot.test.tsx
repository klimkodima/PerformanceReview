import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

import mockTeamActivitiesPercentageData from 'src/components/widgets/TeamActivitiesPercentage/mockTeamActivitiesPercentageData.json';

expect.extend({ toMatchImageSnapshot });

describe('StatisticsCircle', () => {
  it('Matches image snapshot', async () => {
    const browser = await puppeteer.launch({
      args: ['--disable-web-security']
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.url().includes('widget/TeamActivitiesPercentage')) {
        void request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            activitiesTeam: mockTeamActivitiesPercentageData
          })
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

    await page.waitFor(700);

    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    });

    const element = await page.$('.statistic-circle');
    const image = await element?.screenshot();

    expect(image).toMatchImageSnapshot({ allowSizeMismatch: true });
    await browser.close();
  }, 30000);
});
