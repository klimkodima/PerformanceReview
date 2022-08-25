import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import WebsiteGroupsAccordion from './WebsiteGroupsAccordion';

describe('WebsiteGroupsAccordion', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <WebsiteGroupsAccordion
          expanded={true}
          summary={<div>Hello</div>}
          expandIcon={<p>#</p>}
        >
          <div>inner component</div>
        </WebsiteGroupsAccordion>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('inner component must be expanded', () => {
    render(
      <WebsiteGroupsAccordion
        expanded={true}
        summary={<div>Hello</div>}
        expandIcon={<p>#</p>}
      >
        <div>inner component</div>
      </WebsiteGroupsAccordion>
    );
    expect(screen.getByTestId('custom-accordion')).toHaveClass('Mui-expanded');
  });
  test('inner component must be hidden', () => {
    render(
      <WebsiteGroupsAccordion
        expanded={false}
        summary={<div>Hello</div>}
        expandIcon={<p>#</p>}
      >
        <div>inner component</div>
      </WebsiteGroupsAccordion>
    );
    expect(screen.getByTestId('custom-accordion')).not.toHaveClass(
      'Mui-expanded'
    );
  });
});
