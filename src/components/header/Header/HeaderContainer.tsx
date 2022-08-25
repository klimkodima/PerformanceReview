import { FC, ReactElement, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { selectSettingsPermission } from 'src/store/App';
import { selectAuthIsAuth, setAccessToken, setIsAuth } from 'src/store/Auth';
import Header from './Header';

type HeaderContainerPropsType = {
  onSettingsClick: (value: boolean) => void;
  onTimingClick: (value: boolean) => void;
};

const HeaderContainer: FC<HeaderContainerPropsType> = ({
  onSettingsClick, onTimingClick
}): ReactElement => {
  const dispatch = useDispatch();
  const settingsPermission = useSelector(selectSettingsPermission);
  const isAuth = useSelector(selectAuthIsAuth);

  const handleLogOutClick = useCallback(() => {
    dispatch(setIsAuth(false));
    dispatch(setAccessToken(''));
  }, []);
  const handleSettingsClick = useCallback(() => {
    onSettingsClick(true);
    onTimingClick(false);
  }, []);
  const handleTimingClick = useCallback(() => {
    onTimingClick(true);
    onSettingsClick(false);
  }, []);
  const handleLogoClick = useCallback(() => {
    onSettingsClick(false);
    onTimingClick(false);
  }, []);

  return (
    <Header
      onLogoutClick={handleLogOutClick}
      onSettingsClick={handleSettingsClick}
      onLogoClick={handleLogoClick}
      onTimingClick={handleTimingClick}
      settingsPermission={settingsPermission}
      isAuth={isAuth}
    />
  );
};

export default HeaderContainer;
