import { ReactElement } from 'react';

import { useSelector } from 'react-redux';

import { CommonTable } from 'src/components/common';
import { selectPickedDate } from 'src/store/DateFilter';
import { HEAD_CELL_NAMES } from 'src/components/common/CommonTable/constants';
import { headCells, headerName } from './constants';
import { useTeamComparison } from './hooks';

const { nameColumn } = HEAD_CELL_NAMES;

const TeamComparisonLead = (): ReactElement => {
  const pickedDate = useSelector(selectPickedDate);
  const { teamsRows, currentLeadTeamName } = useTeamComparison(pickedDate);

  const currentLeadInfo = {
    currentLeadTeamName,
    bonusPercent: '5' // tempo till back-end will create functionality for bonus
  };

  return (
    <div id='team-comparison-widget'>
      <CommonTable
        data={teamsRows}
        headCells={headCells}
        headerName={headerName}
        defaultOrderBy={nameColumn}
        isTeamComparisonLead={true}
        currentLeadInfo={currentLeadInfo}
      />
    </div>
  );
};

export default TeamComparisonLead;
