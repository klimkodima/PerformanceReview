import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';

import i18n from 'src/i18n';
import store from 'src/store';
import {
  ContentAuditorType,
  setContentAuditor
} from 'src/store/ContentAuditor';
import ContentAuditorWidget from './ContentAuditorContainer';

const auditorData: ContentAuditorType = {
  fullName: 'Jim',
  level: 'TEAM_LEAD',
  experienceInMonths: 15,
  teamName: 'Alpha',
  teamLeadName: 'Kevin',
  photo: ''
};

describe('My Connected React-Redux Component', () => {
  test('Matches snapshot', () => {
    store.dispatch(setContentAuditor(auditorData));
    const tree = renderer
      .create(
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <ContentAuditorWidget />
          </I18nextProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders content-auditor-component', () => {
    store.dispatch(setContentAuditor(auditorData));
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ContentAuditorWidget />
        </I18nextProvider>
      </Provider>
    );
    const widget = screen.getByTestId('widget');
    const content = screen.getByTestId('content');
    const contentBlock = screen.getByTestId('content-block');
    const contentHeader = screen.getByTestId('content-header');
    expect(widget).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(contentBlock).toBeInTheDocument();
    expect(contentHeader).toBeInTheDocument();
  });

  test('renders image block', () => {
    store.dispatch(setContentAuditor(auditorData));
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ContentAuditorWidget />
        </I18nextProvider>
      </Provider>
    );
    const imageBlock = screen.getByTestId('image-block');
    const image = screen.getByTestId('image');
    expect(imageBlock).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  test('renders content row block 5 times', () => {
    store.dispatch(setContentAuditor(auditorData));
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ContentAuditorWidget />
        </I18nextProvider>
      </Provider>
    );
    const container = screen.getAllByTestId('container');
    const label = screen.getAllByTestId('label');
    const text = screen.getAllByTestId('text');
    expect(container.length).toBe(5);
    expect(label.length).toBe(5);
    expect(text.length).toBe(5);
  });

  test('renders classes of components accordingly to layout', () => {
    store.dispatch(setContentAuditor(auditorData));
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ContentAuditorWidget />
        </I18nextProvider>
      </Provider>
    );
    const widget = screen.getByTestId('widget');
    const content = screen.getByTestId('content');
    const contentBlock = screen.getByTestId('content-block');
    const contentHeader = screen.getByTestId('content-header');
    expect(widget).toHaveClass('widget');
    expect(content).toHaveClass('widget__content content');
    expect(contentBlock).toHaveClass('content__block');
    expect(contentHeader).toHaveClass('content__header');
  });

  test('image has alt text', () => {
    store.dispatch(setContentAuditor(auditorData));
    render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ContentAuditorWidget />
        </I18nextProvider>
      </Provider>
    );
    const image = screen.getByTestId('image');
    expect(image).toHaveAttribute('alt');
  });
});
