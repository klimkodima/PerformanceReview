import { ReactElement, memo } from 'react';

import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { styled } from '@mui/material/styles';

const ThemeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 15,
    padding: 10,
    backgroundColor: '#696969',
    boxShadow: theme.shadows[1]
  }
}));

type ErrorTooltipPropsType = {
  title: string;
};

const ErrorTooltip = memo(
  ({ title }: ErrorTooltipPropsType): ReactElement => (
    <ThemeTooltip title={title} arrow enterDelay={700} placement='top-start'>
      <PriorityHighIcon color='error' />
    </ThemeTooltip>
  )
);

export default ErrorTooltip;

ErrorTooltip.displayName = 'ErrorTooltip';
