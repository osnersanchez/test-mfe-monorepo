import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
    >
      <TextField
        variant='outlined'
        placeholder={t('search_placeholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          flexGrow: 1,
          maxWidth: '600px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          marginRight: 1,
        }}
      />
      <IconButton type='submit' color='primary'>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchInput;
