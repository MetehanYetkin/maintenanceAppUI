import { Helmet } from 'react-helmet-async';
// sections
import { FirmListView } from 'src/sections/firm/view';

// ----------------------------------------------------------------------

export default function FirmListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Firm List</title>
      </Helmet>

      <FirmListView />
    </>
  );
}
