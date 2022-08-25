import { ReactElement } from 'react';

import { MainUsersTable } from './MainUsersTable';
import { PendingUsersTable } from './PendingUsersTable';

const UsersContainer = (): ReactElement => (
  <>
    <MainUsersTable />
    <PendingUsersTable />
  </>
);

export default UsersContainer;
