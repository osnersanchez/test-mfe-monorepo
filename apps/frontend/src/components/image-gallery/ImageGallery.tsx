import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          marginRight: 2,
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            onClick={() => setSelectedImage(image)}
            sx={{
              width: 50,
              height: 50,
              border: `2px solid ${selectedImage === image ? theme.palette.info.main : '#ccc'}`,
              borderRadius: 1,
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          width: '100%',
          height: 504,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={selectedImage}
          alt='Selected'
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageGallery;
