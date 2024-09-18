import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  invoice: icon('ic_invoice'),
  dashboard: icon('ic_dashboard'),
  firm: icon('ic_job'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          {
            title: 'Anasayfa',
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
          },
   
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('management'),
        items: [
          // USER
          {
            title: t('user'),
            path: paths.dashboard.user.root,
            icon: ICONS.user,
            children: [
              { title: t('profile'), path: paths.dashboard.user.root },
              { title: t('cards'), path: paths.dashboard.user.cards },
              { title: t('list'), path: paths.dashboard.user.list },
              { title: t('create'), path: paths.dashboard.user.new },
              { title: t('account'), path: paths.dashboard.user.account },
            ],
          },
          {
            title: t('firm'),
            path: paths.dashboard.firm.root,
            icon: ICONS.firm,
            children: [
              // { title: t('profile'), path: paths.dashboard.user.root },
              // { title: t('cards'), path: paths.dashboard.user.cards },
              { title: t('list'), path: paths.dashboard.firm.list },
              { title: t('create'), path: paths.dashboard.firm.new },
              // { title: t('account'), path: paths.dashboard.user.account },
            ],
          },
          
          // INVOICE
          {
            title: t('invoice'),
            path: paths.dashboard.invoice.root,
            icon: ICONS.invoice,
            children: [
              { title: t('list'), path: paths.dashboard.invoice.root },
            
              { title: t('create'), path: paths.dashboard.invoice.new },
            ],
          },

    
        ],
      },
     
    ],
    [t]
  );

  return data;
}
