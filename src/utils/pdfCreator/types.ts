export type WidgetsDataToCreatePDFType = {
  widgetName: string;
  widgetId: string;
  widgetHeight: number | null;
};

export type CreateComponentImageType = {
  componentId: string;
  componentWidth: number;
  componentHeight: number | null;
};

export type CreateComponentImageReturnType = {
  returnImg: HTMLImageElement;
  height: number;
};
