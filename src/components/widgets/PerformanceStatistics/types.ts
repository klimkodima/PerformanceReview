export type PerfStatOptionType = {
  animation: boolean;
  legend: {
    show: boolean;
    data: string[];
    height: string;
    orient: string;
    lineStyle: string;
    textStyle: {
      color: string;
      fontFamily?: string;
    };
    bottom: string;
    left: string;
    top: string;
  };
  grid: Record<string, unknown>;
  xAxis: Record<string, unknown>;
  yAxis: Record<string, unknown>;
  series: Array<{
    name: string;
    data: number[];
    type: string;
    lineStyle: {
      type: string;
    };
    symbol: string;
  }>;
};

export type UserPointsType = {
  name: string;
  data: number[];
};
