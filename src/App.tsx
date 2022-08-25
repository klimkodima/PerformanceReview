import { ReactElement, useEffect, useState, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import {
  AUDIT_TITLE,
  MANAGER_TITLE,
  ROLE_NAME,
  SETTINGS_PERMISSION,
  TEAM_LEADER_TITLE,
  WIDGETS
} from './constants';
import {
  PerformanceStatisticsTeamLead,
  PerformanceStatisticsAuditors,
  TeamActivitiesPercentage,
  ActivitiesPercentage,
  AuditorsStatistics,
  TeamComparisonLead,
  TeamComparisonManager,
  ContentAuditorWidget,
  CriteriaWidgets,
  PointsWidget
} from './components/widgets';
import { Header } from './components/header';
import { Filter } from './components/filter';
import { Login } from './components/login';
import { Timing } from './components/timing';
import { DateFilterSection } from './components/dateFilter';
import { Settings } from './components/settings';
import { WebsiteGroupsAccordion } from './components/common';
import {
  fetchAvailableWidgets,
  selectAvailableWidgets,
  selectSettingsPermission
} from './store/App';
import { selectAuthIsAuth, selectCurrentUser } from './store/Auth';
import { selectCheckedAuditorsData } from './store/Filter';
import { fetchUsers } from './store/Users';
import { selectPickedDate } from './store/DateFilter';

import './App.scss';

const App = (): ReactElement => {
  const dispatch = useDispatch();
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showTiming, setShowTiming] = useState<boolean>(false);
  const pickedDate = useSelector(selectPickedDate);
  const checkedAuditors = useSelector(selectCheckedAuditorsData);
  const availableWidgets = useSelector(selectAvailableWidgets);
  const settingsPermission = useSelector(selectSettingsPermission);
  const { roleName } = useSelector(selectCurrentUser);
  const isAuth = useSelector(selectAuthIsAuth);

  const dashboardStyle = `dashboard ${showSettings ? 'hidden' : ''}`;
  const settingsStyle = `dashboard ${showSettings  ? '' : 'hidden'}`;

  useEffect(() => {
    if (!isAuth) {
      setShowSettings(false);
      setShowTiming(false);
    }
  }, [isAuth]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [roleName, isAuth]);

  useEffect(() => {
    dispatch(fetchAvailableWidgets());
  }, [pickedDate, checkedAuditors, roleName]);

  const isShowAuditsWidgets = 
  Object.keys(checkedAuditors).length === 1 || roleName === ROLE_NAME.AUDITOR;
  const [isWidgetsOpen, setIsWidgetsOpen] = useState<boolean>(true);

  const handleWidgetsArrowClick = useCallback(() => {
    setIsWidgetsOpen(!isWidgetsOpen);
  }, [isWidgetsOpen]);

  const levelTitle =
    settingsPermission !== SETTINGS_PERMISSION.NONE
      ? MANAGER_TITLE
      : TEAM_LEADER_TITLE;

  return (
    <div className='app'>
      <Header onSettingsClick={setShowSettings} onTimingClick={setShowTiming}/>
      {showTiming && (
        <div className={dashboardStyle}>
          <Timing/>
        </div>
      )}
      {settingsPermission !== SETTINGS_PERMISSION.NONE && (
        <div className={settingsStyle}>
          <Settings />
        </div>
      )}

      {!isAuth ? (
        <div className='login-wrapper'>
          <Login />
        </div>
      ) : (
        <div className={dashboardStyle}>
          {roleName !== ROLE_NAME.AUDITOR && <Filter />}
          <div className='widgets'>
            <DateFilterSection />
            {isShowAuditsWidgets && (
              <WebsiteGroupsAccordion
                expanded={isWidgetsOpen}
                summary={
                  roleName !== ROLE_NAME.AUDITOR && (
                    <h2
                      className='custom-accordion__title'
                      onClick={handleWidgetsArrowClick}
                    >
                      {AUDIT_TITLE}
                    </h2>
                  )
                }
                expandIcon={
                  roleName !== ROLE_NAME.AUDITOR && (
                    <ArrowRightIcon
                      className='title-icon'
                      onClick={handleWidgetsArrowClick}
                    />
                  )
                }
              >
                {availableWidgets.includes(WIDGETS.CONTENT_AUDITOR) && (
                  <ContentAuditorWidget />
                )}

                {availableWidgets.includes(WIDGETS.ACTIVITIES_PERCENTAGE) && (
                  <ActivitiesPercentage />
                )}

                {availableWidgets.includes(WIDGETS.CRITERIA_WIDGET) && (
                  <div
                    id='criteria-widgets-container'
                    className='criteria-widgets-container'
                  >
                    <CriteriaWidgets />
                    <PointsWidget />
                  </div>
                )}
              </WebsiteGroupsAccordion>
            )}
            {roleName !== ROLE_NAME.AUDITOR && (
              <h2 className='level-title'>{levelTitle}</h2>
            )}

            {availableWidgets.includes(WIDGETS.TEAM_ACTIVITIES_PERCENTAGE) && (
              <TeamActivitiesPercentage />
            )}

            {availableWidgets.includes(WIDGETS.PERFORMANCE_STATISTICS) &&
              (roleName === ROLE_NAME.AUDITOR ? (
                <PerformanceStatisticsAuditors />
              ) : (
                <PerformanceStatisticsTeamLead />
              ))}

            {availableWidgets.includes(WIDGETS.TEAM_COMPARISON) &&
              (roleName === ROLE_NAME.TEAM_LEADER ? (
                <TeamComparisonLead />
              ) : (
                <TeamComparisonManager />
              ))}

            {availableWidgets.includes(WIDGETS.AUDITORS_STATISTIC) && (
              <AuditorsStatistics />
            )}

            {/* <div className='average-accuracy-container'>
              <AccuracyByProperty />
              <AverageAccuracy />
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
