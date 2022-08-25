import { FC, ReactElement } from 'react';

import './UserInfoItem.scss';

type UserInfoItemPropsType = {
  labelText: string;
  className?: string;
};

const UserInfoItem: FC<UserInfoItemPropsType> = ({
  children,
  labelText,
  className
}): ReactElement => (
  <div className={className ? `user-info-item ${className}` : 'user-info-item'}>
    <span className='user-info-item__text'>{labelText}</span> {children}
  </div>
);

export default UserInfoItem;
