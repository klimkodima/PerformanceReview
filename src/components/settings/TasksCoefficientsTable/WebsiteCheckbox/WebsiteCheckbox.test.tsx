import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import WebsiteCheckbox from './WebsiteCheckbox';

describe('WebsiteCheckbox', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(<WebsiteCheckbox checked={false} onChange={() => true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('show check icon', () => {
    render(<WebsiteCheckbox checked={true} onChange={() => true} />);
    expect(screen.getByTestId('CheckIcon')).toBeInTheDocument();
  });
});
