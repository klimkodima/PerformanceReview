import { ReactElement, memo } from 'react';

import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const ThemeTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    border: '2px #7e7e7e solid',
    fontSize: 15,
    padding: 10,
    backgroundColor: '#fff',
    color: '#484848',
    boxShadow: theme.shadows[3]
  }
}));

type InfoTooltipPropsType = {
  title: string;
  icon: ReactElement;
};

const InfoTooltip = memo(
  ({ title, icon }: InfoTooltipPropsType): ReactElement => (
    <ThemeTooltip title={title} arrow placement='bottom-start'>
      {icon}
    </ThemeTooltip>
  )
);

export default InfoTooltip;

InfoTooltip.displayName = 'InfoTooltip';
