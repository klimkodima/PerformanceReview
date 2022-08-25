import { ReactElement, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getAuditorsStatistics } from 'src/api';
import { selectPickedDate } from 'src/store/DateFilter';
import { selectCheckedAuditorsData } from 'src/store/Filter';
import { CommonTable } from '../../common';
import { HEAD_CELL_NAMES } from '../../common/CommonTable/constants';
import { headCells, headerName } from './constants';
import { createAuditorsStatisticsRows } from './helpers';

import { AuditorsDataType, AuditorsStatisticsResponseType } from './types';

const { pointsColumn } = HEAD_CELL_NAMES;

const AuditorsStatistics = (): ReactElement | null => {
  const pickedDate = useSelector(selectPickedDate);
  const checkedAuditors = useSelector(selectCheckedAuditorsData);

  const isShowAuditorsStatistics = Object.keys(checkedAuditors).length >= 2;

  const [auditorsRows, setAuditorsRows] = useState<AuditorsDataType[]>([]);

  useEffect(() => {
    const fetchAuditorsStatistics = async () => {
      const { auditorStatisticWidgetDtoList }: AuditorsStatisticsResponseType =
        await getAuditorsStatistics({
          from: pickedDate.startDate,
          to: pickedDate.finishDate,
          auditorsIds: Object.keys(checkedAuditors)
        });

      setAuditorsRows(
        createAuditorsStatisticsRows(
          auditorStatisticWidgetDtoList,
          checkedAuditors
        )
      );
    };

    if (
      pickedDate.finishDate !== '' &&
      pickedDate.startDate !== '' &&
      isShowAuditorsStatistics
    ) {
      fetchAuditorsStatistics().catch((e) => {
        console.log(e);
        setAuditorsRows([]);
      });
    }
  }, [pickedDate, checkedAuditors]);

  if (!isShowAuditorsStatistics) {
    return null;
  }

  return (
    <div id='auditors-statistics-widget'>
      <CommonTable
        data={auditorsRows}
        headCells={headCells}
        headerName={headerName}
        defaultOrderBy={pointsColumn}
        isTeamComparisonLead={false}
      />
    </div>
  );
};

export default AuditorsStatistics;
