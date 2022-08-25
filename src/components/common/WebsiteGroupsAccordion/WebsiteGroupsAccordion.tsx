import { FC, ReactElement, memo, ReactNode } from 'react';

import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';

import './WebsiteGroupsAccordion.scss';

type CustomAccordionPropsType = {
  expanded: boolean;
  summary: ReactNode;
  expandIcon: ReactNode;
};

const WebsiteGroupsAccordion: FC<CustomAccordionPropsType> = memo(
  ({ expanded, summary, children, expandIcon }): ReactElement => (
    <Accordion
      disableGutters
      expanded={expanded}
      className='custom-accordion'
      data-testid='custom-accordion'
    >
      <div className='custom-accordion__form'>
        <AccordionSummary
          className='custom-accordion-summary'
          expandIcon={expandIcon}
        >
          {summary}
        </AccordionSummary>
      </div>
      <AccordionDetails className='custom-accordion__details'>
        {children}
      </AccordionDetails>
    </Accordion>
  )
);

export default WebsiteGroupsAccordion;

WebsiteGroupsAccordion.displayName = 'WebsiteGroupsAccordion';
