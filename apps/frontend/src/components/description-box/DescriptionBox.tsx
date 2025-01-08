import React, { useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTranslation } from 'react-i18next';

interface DescriptionBoxProps {
  description: string;
}

const DescriptionBox: React.FC<DescriptionBoxProps> = ({ description }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Box px={3} sx={{ marginTop: 3 }}>
      <Typography
        textTransform={'capitalize'}
        fontSize={24}
        variant='h2'
        sx={{ marginBottom: 2 }}
      >
        {t('description')}
      </Typography>
      <Box
        sx={{
          maxHeight: expanded ? 'none' : '100px',
          overflow: 'hidden',
          whiteSpace: 'pre-line',
        }}
      >
        <Typography
          fontSize={20}
          sx={{ lineHeight: 1.5, color: 'text.secondary' }}
        >
          {description}
        </Typography>
      </Box>
      <Button
        onClick={toggleExpand}
        sx={{
          'color': theme.palette.info.main,
          'textTransform': 'none',
          'marginTop': 1,
          ':hover': {
            backgroundColor: 'transparent',
          },
        }}
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {expanded ? t('show_less') : t('show_all_description')}
      </Button>
    </Box>
  );
};

export default DescriptionBox;
