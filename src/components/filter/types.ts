import { MouseEvent } from 'react';
import { AuditorType } from 'src/store/Filter/types';

export type FilterType = {
  name: string;
  group: string;
  filteredData: resultArrayType;
  checkedItems: resultArrayType;
};

type resultArrayType = string[] | any[];

export type CheckArrayFunction = (
  resultArray: resultArrayType,
  value: string
) => boolean;

export type ClickHandlerFunction = (
  event: MouseEvent<HTMLButtonElement>
) => void;

export type SearchFunction = (
  searchedArray: any[] | string[],
  dataObject: any[] | AuditorType[]
) => string[];

export type FilterPopUpPropsType = {
  closeDrawer: () => void;
  isOpen: boolean;
};

export type FilterListPropsType = {
  title: string;
  isOpen: boolean;
  filter: string[];
  filteredData: any[];
  checkedItems: { name: string; isNotAvailableToFilterBy: boolean }[];
  closeDrawer: () => void;
  onAddFilterClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

export type FilterListContainerPropsType = {
  title: string;
  filter: string[];
  filteredData: any[];
  checkedItems: any[];
};

export type FilterPropsType = {
  teamFilter: string[];
  levelFilter: string[];
  auditorFilter: string[];
};
