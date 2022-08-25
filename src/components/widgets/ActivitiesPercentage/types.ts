export type CardActivityType = {
  labels: LabelDataType[];
  totalTimeSpend: number;
};

export type PieOptionType = {
  animation: false;
  color?: string[];
  labelLine: {
    color: string;
  };
  label: {
    show: true;
    color: string;
    fontWeight: 500;
    fontSize: string;
    formatter: string;
  };
  series: [
    {
      name: string;
      type: string;
      radius: string;
      data: LabelDataType[];
      labelLine: {
        lineStyle: {
          color: string;
        };
      };
      emphasis: {
        disabled: boolean;
      };
      top: string;
    }
  ];
};

export type LabelDataType = {
  name: string;
  value: number;
};
