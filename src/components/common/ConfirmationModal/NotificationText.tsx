import { ReactElement, memo } from 'react';

type NotificationPropsType = {
  title: string;
  subtitle: string;
  mainText: string;
};

const NotificationText = memo(
  ({ title, subtitle, mainText }: NotificationPropsType): ReactElement => (
    <p>
      {title}
      <span>{mainText}</span>
      {subtitle}
    </p>
  )
);

export default NotificationText;

NotificationText.displayName = 'NotificationText';
