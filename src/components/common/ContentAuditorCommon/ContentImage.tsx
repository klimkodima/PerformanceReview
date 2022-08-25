import { ReactElement, memo } from 'react';

export type ImagePropsType = {
  classes: string;
  src: string;
  alt: string;
};

const ContentImage = memo(
  ({ classes, src, alt }: ImagePropsType): ReactElement => (
    <div className={classes} data-testid='image-block'>
      <img src={src} alt={alt} data-testid='image'></img>
    </div>
  )
);

export default ContentImage;

ContentImage.displayName = 'ContentImage';
