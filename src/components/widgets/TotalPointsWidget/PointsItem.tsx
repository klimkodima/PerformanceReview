import { FC, ReactElement } from 'react';

import InfoIcon from '@mui/icons-material/Info';

import { InfoTooltip } from 'src/components/common';

import { PointsItemProps } from './types';

const PointsItem: FC<PointsItemProps> = ({
  classesOuterDiv,
  classesHeader,
  classesInnerDiv,
  classesText,
  headerText,
  pointText,
  isShowInfoIcon,
  infoText
}): ReactElement => {
  return (
    <div className={classesOuterDiv}>
      <div className='item__title-block'>
        <h4 className={classesHeader}>{headerText}</h4>
        {isShowInfoIcon && (
          <InfoTooltip
            title={infoText}
            icon={<InfoIcon className='item__icon' color='primary' />}
          />
        )}
      </div>
      <div className={classesInnerDiv}>
        <p className={classesText}>{pointText}</p>
      </div>
    </div>
  );
};

export default PointsItem;
