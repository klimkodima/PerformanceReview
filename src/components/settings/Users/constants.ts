import { t } from 'i18next';

export const HEADER_CELLS_PENDING_USERS: string[] = [
  t('users_table.user_name_label'),
  t('users_table.email_label'),
  t('users_table.level_label'),
  t('users_table.team_label'),
  t('pending_users_table.data_storage_label')
];

export const TABLE_PENDING_TITLE = t('users_table.table_pending_title');

export const ADMIN_ACCESS_LEVEL = t('access_level.admin');

export const USERS_ROW_CELLS: string[] = [
  'fullName',
  'email',
  'enabled',
  'roleName',
  'level',
  'teamName'
];

export const PENDING_ROW_CELLS: string[] = [
  'fullName',
  'email',
  'level',
  'teamName'
];

export const HEADER_CELLS_USERS: HeaderCellsUserType[] = [
  { name: t('users_table.user_name_label'), isShowIcon: false },
  { name: t('users_table.email_label'), isShowIcon: false },
  { name: t('users_table.status_label'), isShowIcon: false },
  { name: t('users_table.role_label'), isShowIcon: true },
  { name: t('users_table.level_label'), isShowIcon: true },
  { name: t('users_table.team_label'), isShowIcon: true }
];

export type HeaderCellsUserType = {
  name: string;
  isShowIcon: boolean;
};

export const TEAM_LABEL = t('users_table.team_label');
export const ROLE_LABEL = t('users_table.role_label');
export const LEVEL_LABEL = t('users_table.level_label');

export const ADMIN_ROLE = 'ADMIN';
export const MANAGER_ROLE = 'MANAGER';
export const TEAM_LEAD_ROLE = 'TEAM_LEADER';
export const AUDITOR_ROLE = 'AUDITOR';

export const TEAM_LEAD_LEVEL = 'TEAM_LEAD';

export const ENABLED_KEY = 'enabled';
export const ROLE_NAME_KEY = 'roleName';
export const LEVEL_KEY = 'level';

export const ACTIVATE_BUTTON = t('pending_users_table.activate_button');
export const STOP_SAVING_DATA_BUTTON = t(
  'pending_users_table.stop_saving_data_button'
);

export const CANCEL_BUTTON = t('pending_users_table.cancel_button');
export const MODAL_TITLE = t('pending_users_table.title');
export const MODAL_SUBTITLE = t('pending_users_table.subtitle');
export const MODAL_PRESET_TITLE = t('pending_users_table.modal_preset_title');
export const MODAL_INFO_TOOLTIP_TEXT = t(
  'pending_users_table.modal_info_tooltip_text'
);
export const SELECT_LABEL = t('pending_users_table.select_label');
export const PRESET_WORKING_HOURS_KEY = 'thirdParty';

export const OPTION_1 = t('pending_users_table.option_role_1');
export const OPTION_2 = t('pending_users_table.option_role_2');
export const OPTION_3 = t('pending_users_table.option_role_3');
export const OPTION_4 = t('pending_users_table.option_role_4');

export enum Roles {
  ADMIN = 1,
  MANAGER = 2,
  TEAM_LEADER = 3,
  AUDITOR = 4
}

export enum Levels {
  TEAM_LEAD = 1,
  SENIOR = 2,
  MIDDLE = 3,
  JUNIOR = 4,
  TRAINEE = 5,
  NULL = 6
}
