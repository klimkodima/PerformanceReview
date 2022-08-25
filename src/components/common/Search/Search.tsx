import { FC, ReactElement, ChangeEvent } from 'react';

import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import './Search.scss';

type SearchPropsType = {
  handleSearchValue: (value: string) => void;
  searchValue: string;
  placeholder?: string;
};

const Search: FC<SearchPropsType> = ({
  handleSearchValue,
  searchValue,
  placeholder
}): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearchValue(e.target.value);
  };

  const resetSearchValue = () => {
    handleSearchValue('');
  };

  const resetIconClass = !searchValue ? 'search__hidden' : '';

  return (
    <div className='search'>
      <SearchIcon className='search__icon' />
      <InputBase
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        value={searchValue}
      />
      <IconButton
        type='reset'
        aria-label='reset'
        onClick={resetSearchValue}
        className={resetIconClass}
        data-testid='reset-button'
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export default Search;
