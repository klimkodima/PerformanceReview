import { memo, ReactElement } from 'react';

import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';

import { SETTINGS_PERMISSION } from 'src/constants';
import logoutIcon from 'src/assets/icons/logout-icon.png';
import headerIcon from 'src/assets/icons/header-icon.png';
import settingsIcon from 'src/assets/icons/settings-icon.png';
import timingIcon from 'src/assets/icons/timing-icon.png';

import { SettingsPermissionType } from 'src/store/App';

import './Header.scss';

type HeaderPropsType = {
  onLogoutClick: () => void;
  onSettingsClick: () => void;
  onTimingClick: () => void;
  onLogoClick: () => void;
  settingsPermission: SettingsPermissionType;
  isAuth: boolean;
};

const Header = memo(
  ({
    onLogoutClick,
    settingsPermission,
    isAuth,
    onSettingsClick,
    onTimingClick,
    onLogoClick
  }: HeaderPropsType): ReactElement => {
    const [t1] = useTranslation();

    return (
      <header className='header'>
        <div className='header__wrapper'>
          <div className='title-and-logo' id='title-and-logo'>
            <h2
              onClick={onLogoClick}
              className='dashboard-name'
              id='dashboard-name'
            >
              {t1('header.dashboard_name_text')}
            </h2>
            <div className='header__logoIcon'>
              <img src={headerIcon} alt='logo icon' />
            </div>
          </div>
          {isAuth && (
            <div>
              <IconButton
                  className='settings-icon'
                  data-testid='timing-icon'
                  onClick={onTimingClick}
                >
                  <img src={timingIcon} alt='timing icon' />
                </IconButton>
              {settingsPermission !== SETTINGS_PERMISSION.NONE && (
                <IconButton
                  className='settings-icon'
                  data-testid='settings-icon'
                  onClick={onSettingsClick}
                >
                  <img src={settingsIcon} alt='settings icon' />
                </IconButton>
              )}
              <IconButton
                className='logoutIcon'
                data-testid='logout-icon'
                onClick={onLogoutClick}
              >
                <img src={logoutIcon} alt='logout icon' />
              </IconButton>
            </div>
          )}
        </div>
      </header>
    );
  }
);

export default Header;

Header.displayName = 'Header';
