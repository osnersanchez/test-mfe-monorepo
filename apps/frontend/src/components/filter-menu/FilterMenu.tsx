import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useTranslation } from 'react-i18next';

interface FilterMenuProps {
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ sortOrder, onSortChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const sortOptions: { [k: string]: string } = {
    'relevance': 'Más relevantes',
    'price-asc': 'menor precio',
    'price-desc': 'mayor precio',
    'title-asc': 'A-Z',
    'title-desc': 'Z-A',
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSortChange = (order: string) => {
    onSortChange(order);
    setMenuAnchorEl(null);
  };

  return (
    <Box
      style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}
    >
      <Typography
        textTransform={'capitalize'}
        fontSize={14}
        sx={{ marginRight: 1 }}
      >
        {t('order_by')}:
      </Typography>
      <Button
        color='secondary'
        onClick={handleMenuOpen}
        endIcon={menuAnchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        sx={{
          ':hover': {
            backgroundColor: 'transparent',
            color: theme.palette.info.main,
            fontSize: 14,
          },
          'padding': 0,
          'textTransform': 'capitalize',
        }}
      >
        {sortOptions[sortOrder]}
      </Button>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        {Object.entries(sortOptions).map(([key, label]) => (
          <MenuItem
            sx={{ textTransform: 'capitalize', fontSize: 14 }}
            key={key}
            onClick={() => handleSortChange(key)}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default FilterMenu;
