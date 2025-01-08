import React, { useState } from 'react';
import { Box, Typography, Radio, Button, Link, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

const PriceSelector: React.FC = () => {
  const { t } = useTranslation();
  const option1 = 1;
  const option2 = 2;
  const [selectedOption, setSelectedOption] = useState(option1);

  const handleSelectionChange = (id: number) => {
    setSelectedOption(id);
  };

  const detailsAction = () => (
    <Box>
      <Typography
        sx={{
          marginTop: '8px',
          display: 'flex',
          gap: '2px',
        }}
      >
        <Typography
          component='span'
          sx={{
            color: '#00a650',
            fontWeight: 'bold',
          }}
        >
          {t('free_shipping')}
        </Typography>
        <Typography component='span'>{t('nationwide')}</Typography>
      </Typography>
      <Typography variant='body2'>{t('delivery_times_and_methods')}</Typography>

      <Link
        href='#'
        color='info'
        sx={{
          fontSize: '14px',
          display: 'block',
          textDecoration: 'none',
        }}
      >
        {t('calculate_delivery_time')}
      </Link>

      <Typography py={2} sx={{ fontWeight: 'bold' }}>
        {t('available_stock')}
      </Typography>
      <Typography variant='body2' sx={{ marginBottom: '16px' }}>
        {t('quantity')} <strong>1</strong> {t('unit')} (5 {t('available')})
      </Typography>

      <Button
        variant='contained'
        color='info'
        fullWidth
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          marginBottom: '8px',
        }}
      >
        {t('buy_now')}
      </Button>
      <Button
        variant='outlined'
        color='info'
        fullWidth
        sx={{
          textTransform: 'none',
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        }}
      >
        {t('add_to_cart')}
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        margin: '24px',
        backgroundColor: '#fff',
      }}
    >
      <Box
        onClick={() => handleSelectionChange(option1)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:
            selectedOption === option1 ? 'transparent' : '#f5faff',
          borderRadius: '10px 10px 0 0',
          padding: '13px 10px 10px',
        }}
      >
        <Box flex={1} sx={{ marginLeft: '8px' }}>
          <Box
            justifyContent={'space-between'}
            alignItems={'center'}
            display='flex'
          >
            <Typography fontWeight={600} fontSize={14}>
              {t('interest_free_installments')}
            </Typography>
            <Radio
              size='small'
              checked={selectedOption === option1}
              onChange={() => handleSelectionChange(option1)}
              value={option1}
              color='info'
              sx={{ padding: '5px' }}
            />
          </Box>
          <Typography py={1} variant='h6'>
            $ 4.809.000
          </Typography>
          {selectedOption === option1 ? (
            detailsAction()
          ) : (
            <>
              <Typography
                display={'flex'}
                gap='2px'
                variant='body2'
                sx={{ color: 'text.secondary' }}
              >
                {t('in')}
                <Typography
                  noWrap
                  component='span'
                  variant='body2'
                  color='#00a650'
                >
                  {t('12_installments_of')} $ 400.750 {t('with_interest')}
                </Typography>
              </Typography>
              <Typography
                py={1}
                variant='body2'
                fontSize={12}
                sx={{ color: 'text.secondary' }}
              >
                {t('sold_by')} YourFavoriteSeller
              </Typography>
            </>
          )}
        </Box>
      </Box>
      <Divider />
      <Box
        onClick={() => handleSelectionChange(option2)}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor:
            selectedOption === option2 ? 'transparent' : '#f5faff',
          borderRadius: '0 0 10px 10px',
          padding: '10px 10px 13px',
        }}
      >
        <Box flex={1} sx={{ marginLeft: '8px' }}>
          <Box
            justifyContent={'space-between'}
            alignItems={'center'}
            display='flex'
          >
            <Typography fontWeight={600} fontSize={14}>
              {t('best_price')}
            </Typography>
            <Radio
              size='small'
              checked={selectedOption === option2}
              onChange={() => handleSelectionChange(option2)}
              value={option2}
              color='info'
              sx={{ padding: '5px' }}
            />
          </Box>
          <Typography py={1} variant='h6'>
            $ 4.449.000
          </Typography>
          {selectedOption === option2 ? (
            detailsAction()
          ) : (
            <Typography
              py={0}
              variant='body2'
              fontSize={12}
              sx={{ color: 'text.secondary' }}
            >
              {t('sold_by')} YourFavoriteSeller
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PriceSelector;
