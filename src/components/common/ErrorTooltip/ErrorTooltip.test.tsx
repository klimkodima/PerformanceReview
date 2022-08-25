import { fireEvent, render } from '@testing-library/react';

import ErrorTooltip from './ErrorTooltip';

describe('ErrorTooltip', () => {
  const ERROR_TEXT = 'error text';

  test('ErrorTooltip component rendered', async () => {
    const { getByTestId, findByText } = render(
      <ErrorTooltip title={ERROR_TEXT} />
    );

    const icon = getByTestId('PriorityHighIcon');
    expect(icon).toBeInTheDocument();

    fireEvent.mouseOver(icon);
    expect(await findByText('error text')).toBeInTheDocument();
  });
});
