import { render, screen } from '@testing-library/react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import puppeteer from 'puppeteer';
import { I18nextProvider } from 'react-i18next';

import i18n from 'src/i18n';
import mockTeamActivitiesPercentageData from 'src/components/widgets/TeamActivitiesPercentage/mockTeamActivitiesPercentageData.json';
import { createTeamActivitiesPieData } from 'src/components/widgets/TeamActivitiesPercentage/helper';
import TeamActivitiesPercentage from 'src/components/widgets/TeamActivitiesPercentage/TeamActivitiesPercentage';

const pieData = createTeamActivitiesPieData(mockTeamActivitiesPercentageData);

expect.extend({ toMatchImageSnapshot });

describe('TeamActivitiesPercentage', () => {
  test('Expect widget to be in the document', () => {
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <TeamActivitiesPercentage
          title='Team Activities Percentage'
          circleData={pieData}
          placeholderText={''}
        />
      </I18nextProvider>
    );

    expect(container).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('team-activities-percentage');
  });

  test('Matches image snapshot', async () => {
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

    const element = await page.$('.team-activities-percentage');
    const image = await element?.screenshot();

    expect(image).toMatchImageSnapshot({ allowSizeMismatch: true });
    await browser.close();
  }, 30000);

  test('renders correct title and no teams', () => {
    render(
      <TeamActivitiesPercentage
        title='Team Activities Percentage'
        circleData={pieData}
        placeholderText={'Empty'}
      />
    );
    expect(screen.getByText(/Team Activities Percentage/)).toBeInTheDocument();
    expect(screen.getByText(/Empty/)).toBeInTheDocument();
    expect(
      screen.queryByTestId('team-activities-percentage-circles')
    ).toBeNull();
  });
});
