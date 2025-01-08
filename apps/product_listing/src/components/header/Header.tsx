import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Typography,
  Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
      className={styles.header}
    >
      <Toolbar className={styles.toolbar}>
        <Box className={styles.firstContainer}>
          <Box className={styles.logoContainer}>
            <img
              src='https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.92/mercadolibre/logo_large_25years@2x.png'
              alt='Mercado Libre'
              width='134px'
              className={styles.logo}
            />
          </Box>

          <Box className={styles.searchContainer}>
            <InputBase
              placeholder='Buscar productos, marcas y más'
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 1,
                padding: '0 8px',
              }}
            />
            <Checkbox
              className={styles.searchCheckbox}
              sx={{ color: theme.palette.secondary.main }}
              inputProps={{ 'aria-label': 'Solo en Celulares y Smartphones' }}
            />
            <Typography variant='body2' sx={{ marginLeft: 1 }}>
              Solo en Celulares y Smartphones
            </Typography>
            <IconButton className={styles.searchButton} onClick={handleSearch}>
              <SearchIcon sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </Box>
        </Box>

        <Box className={styles.secondContainer}>
          <Box className={styles.navMenu}>
            {[
              'Categorías',
              'Ofertas',
              'Historial',
              'Supermercado',
              'Moda',
              'Vender',
              'Ayuda / PQR',
            ].map((item) => (
              <Typography key={item} variant='body2' sx={{ marginLeft: 2 }}>
                {item}
              </Typography>
            ))}
          </Box>

          <Box className={styles.iconsContainer}>
            <IconButton>
              <NotificationsIcon sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
            <IconButton>
              <FavoriteIcon sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
            <IconButton>
              <ShoppingCartIcon sx={{ color: theme.palette.secondary.main }} />
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
