// import { useSelector } from 'react-redux';

// material-ui
import { Box, List, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';

// types
import { menuWithDrawerOpen } from '@/base/store/selectors/app';
import { NavItemType } from '@/types/menu';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

interface Props {
  item: NavItemType;
}

const NavGroup = ({ item }: Props) => {
  const theme = useTheme();
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);

	const {t} = useTranslation()


  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return <NavCollapse key={menuItem.id} menu={menuItem} level={1} />;
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color={theme.palette.mode === 'dark' ? 'textSecondary' : 'text.secondary'}>
              {t(item.title as string)}
            </Typography>
            {item.caption && (
              <Typography variant="caption" color="secondary">
                {t(item.caption as string)}
              </Typography>
            )}
          </Box>
        )
      }
      sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
};

export default NavGroup;
