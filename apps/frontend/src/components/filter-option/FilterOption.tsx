import { Box, Typography, Switch } from '@mui/material';
import { ReactNode } from 'react';

interface FilterOptionProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  isActive: boolean;
  onToggle: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  children,
  title,
  description,
  isActive,
  onToggle,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fff',
        marginBottom: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          {children ? (
            children
          ) : (
            <Typography
              textTransform={'capitalize'}
              variant='body1'
              fontSize={14}
              sx={{ fontWeight: 500, marginBottom: description ? '4px' : 0 }}
            >
              {title}
            </Typography>
          )}

          {description && (
            <Typography
              fontSize={12}
              variant='body2'
              textTransform={'capitalize'}
              sx={{ color: '#666' }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>
      <Switch checked={isActive} onChange={onToggle} />
    </Box>
  );
};

export default FilterOption;
