import { nanoid } from 'nanoid';

import { BonusesDataType } from 'src/store/SeniorityBonuses';

export const mockBonusesData: BonusesDataType[] = [
  {
    id: nanoid(),
    experience: {
      value: '12',
      isError: false,
      errorText: ''
    },
    bonus: {
      value: '10',
      isError: false,
      errorText: ''
    }
  },
  {
    id: nanoid(),
    experience: {
      value: '15',
      isError: false,
      errorText: ''
    },
    bonus: {
      value: '25',
      isError: false,
      errorText: ''
    }
  },
  {
    id: nanoid(),
    experience: {
      value: '25',
      isError: false,
      errorText: ''
    },
    bonus: {
      value: '30',
      isError: false,
      errorText: ''
    }
  },
  {
    id: nanoid(),
    experience: {
      value: '30',
      isError: false,
      errorText: ''
    },
    bonus: {
      value: '35',
      isError: false,
      errorText: ''
    }
  }
];
