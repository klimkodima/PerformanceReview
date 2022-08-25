import puppeteer from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import '@testing-library/jest-dom/extend-expect';

import userMockData from 'src/store/Filter/userMockData.json';

expect.extend({ toMatchImageSnapshot });

describe('Pie React-Redux Component', () => {
  it('Matches canvas snapshot', async () => {
    const browser = await puppeteer.launch({
      args: ['--disable-web-security']
    });
    const page = await browser.newPage();
    await page.waitFor(500);

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.url().includes('user/current')) {
        void request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 1,
            fullName: 'Thanos',
            roleName: 'ADMIN'
          })
        });
      } else if (request.url().includes('user')) {
        void request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(userMockData)
        });
      } else if (request.url().includes('widget/ContentAuditor')) {
        void request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            experienceInMonths: 2,
            fullName: 'Anastasya Karman',
            level: 'TEAM_LEAD',
            teamLeadName: 'Anastasya Karman',
            teamName: 'Charlie'
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

    await page.waitForSelector('.MuiPaper-root');

    await page.click('.filter-list-button-AUDITOR');
    const checkbox = await page.$('#filter-option-checkbox-testAlexander');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await page.evaluate((checkbox) => checkbox.click(), checkbox);
    const backDrop = await page.$('.MuiBackdrop-root');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    await page.evaluate((backDrop) => backDrop.click(), backDrop);

    await page.waitFor(700);

    await page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    });
    const element = await page.$('.widget');
    const image = await element?.screenshot();
    expect(image).toMatchImageSnapshot({ allowSizeMismatch: true });
    await browser.close();
  }, 30000);
});
