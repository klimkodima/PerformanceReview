import { FC, ReactElement } from 'react';

import { Drawer } from '@mui/material';

import { FilterPopUpPropsType } from '../types';

const FilterPopUp: FC<FilterPopUpPropsType> = ({
  children,
  closeDrawer,
  isOpen
}): ReactElement => (
  <Drawer open={isOpen} onClose={closeDrawer}>
    {children}
  </Drawer>
);

export default FilterPopUp;
