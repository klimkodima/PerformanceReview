import html2pdf from 'html2pdf.js';

import { t } from 'i18next';
import 'src/i18n';

import {
  CreateComponentImageType,
  CreateComponentImageReturnType
} from './types';

export const createComponentImage = async ({
  componentId,
  componentWidth,
  componentHeight
}: CreateComponentImageType): Promise<CreateComponentImageReturnType> => {
  const element = document.getElementById(componentId);
  let returnImg: HTMLImageElement;
  let height: number;

  if (element) {
    element.style.backgroundColor = t('pdf_creator.pdf_fill_background');
    element.style.width = `${componentWidth}px`;

    height = componentHeight === null ? element.offsetHeight : componentHeight;

    await html2pdf()
      .from(element)
      .set({
        html2canvas: {
          scale: 2,
          width: componentWidth,
          height,
          windowWidth: 1900,
          windowHeight: 1080
        }
      })
      .outputImg('img')
      .then((response) => {
        const img = new Image();
        img.src = response.src;
        returnImg = img;

        element.style.backgroundColor = '';
        element.style.width = '';
      })
      .catch((err) => console.log(`${t('pdf_creator.error_message')}:`, err));
  }

  return new Promise(
    (
      resolve: (value: { returnImg: HTMLImageElement; height: number }) => void
    ) => {
      resolve({ returnImg, height: height });
    }
  );
};
