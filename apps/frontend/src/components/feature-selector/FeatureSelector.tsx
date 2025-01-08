import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';

interface FeatureOption {
  label: string;
  value: string;
}

interface FeatureSelectorProps {
  options: FeatureOption[];
  selectedOption: string;
  title: string;
  onOptionSelect: (value: string) => void;
  showAs: 'text' | 'image';
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({
  options,
  selectedOption,
  title,
  onOptionSelect,
  showAs,
}) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        textTransform='capitalize'
        variant='subtitle1'
      >
        {title}: <strong>{selectedOption}</strong>
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {options.map((option, index) => {
          const hueAngle = (index * 80) % 360;
          return (
            <Button
              key={option.value}
              variant='outlined'
              onClick={() => onOptionSelect(option.value)}
              sx={{
                'textTransform': 'none',
                'backgroundColor': theme.palette.secondary.contrastText,
                'border':
                  selectedOption === option.value
                    ? `2px solid ${theme.palette.info.main}`
                    : '1px solid #ddd',
                'color': theme.palette.secondary.main,
                'display': 'flex',
                'alignItems': 'center',
                'justifyContent': 'center',
                'gap': 1,
                'padding': showAs === 'image' ? 0 : '8px 12px',
                fontSize: 12,
                ':hover': {
                  backgroundColor:
                    selectedOption === option.value
                      ? theme.palette.secondary.contrastText
                      : '#e6e6e6',
                },
              }}
            >
              {showAs === 'image' ? (
                <Box
                  component='img'
                  src={option.label}
                  alt={option.value}
                  sx={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: 64,
                    maxHeight: 42,
                    objectFit: 'contain',
                    filter: `hue-rotate(${hueAngle}deg)`,
                  }}
                />
              ) : (
                option.label
              )}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default FeatureSelector;
