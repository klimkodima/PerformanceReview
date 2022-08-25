export type CircleDataType = {
  name: string;
  value: number;
};

export type StatisticCircleDataType = {
  title: string;
  data: CircleDataType[];
};

export type StatisticCircleOptionType = {
  title: {
    text: string;
    left: string;
    textStyle: {
      color: string;
      fontWeight: string;
      fontSize: string;
      fontFamily: string;
    };
    top: string;
  };
  animation: boolean;
  labelLine: {
    color: string;
  };
  label: {
    show: boolean;
    color: string;
    fontWeight: number;
    fontSize: string;
    formatter: string;
  };
  series: Array<{
    name: string;
    type: string;
    radius: string;
    cursor: string;
    data: CircleDataType[];
    labelLine: {
      lineStyle: {
        color: string;
      };
    };
    emphasis: {
      disabled: boolean;
    };
    top: string;
  }>;
};
