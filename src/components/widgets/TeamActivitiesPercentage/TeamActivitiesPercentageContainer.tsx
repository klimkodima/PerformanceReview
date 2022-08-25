import { ReactElement, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchTeamActivities,
  selectTeamActivities
} from 'src/store/ActivitiesPercentage';
import { selectPickedDate } from 'src/store/DateFilter';
import { selectCheckedTeams, selectFilteredTeams } from 'src/store/Filter';
import TeamActivitiesPercentage from './TeamActivitiesPercentage';
import { createTeamActivitiesPieData, filterTeams } from './helper';

const TeamActivitiesPercentageContainer = (): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const checkedTeams = useSelector(selectCheckedTeams);
  const filteredTeams = useSelector(selectFilteredTeams);
  const teamActivities = useSelector(selectTeamActivities);
  const pickedDate = useSelector(selectPickedDate);

  useEffect(() => {
    dispatch(fetchTeamActivities());
  }, [pickedDate]);

  const pieData = createTeamActivitiesPieData(teamActivities);
  const initialFilteredData = filterTeams(pieData, checkedTeams);

  const [filteredPieData, setFilteredPieData] = useState(initialFilteredData);

  useEffect(() => {
    setFilteredPieData(
      initialFilteredData.filter(({ title }) =>
        filteredTeams.length > 0
          ? checkedTeams.includes(title) && filteredTeams.includes(title)
          : checkedTeams.includes(title)
      )
    );
  }, [checkedTeams, filteredTeams]);

  const placeholderText = filteredPieData.length
    ? ''
    : t('team_activities_percentage.placeholder_text');

  return (
    <TeamActivitiesPercentage
      title={t('team_activities_percentage.title_text')}
      circleData={filteredPieData}
      placeholderText={placeholderText}
    />
  );
};

export default TeamActivitiesPercentageContainer;
