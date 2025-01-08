import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type ProductBreadcrumbsProps = {
  categories: string[];
};

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  categories,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!categories.length) return null;

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label={t('breadcrumbs_label')}
    >
      {categories.map((category, index) =>
        index === categories.length - 1 ? (
          <Typography fontSize={14} key={index} color='text.primary'>
            {category}
          </Typography>
        ) : (
          <Link
            fontSize={14}
            key={index}
            underline='hover'
            color='inherit'
            onClick={() =>
              navigate(`/items?category=${encodeURIComponent(category)}`)
            }
            style={{ cursor: 'pointer' }}
          >
            {category}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
};

export default ProductBreadcrumbs;
