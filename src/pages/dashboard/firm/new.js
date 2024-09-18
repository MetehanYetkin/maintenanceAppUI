import { Helmet } from 'react-helmet-async';
// sections
import { FirmCreateView } from 'src/sections/firm/view';

// ----------------------------------------------------------------------

export default function FirmCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new invoice</title>
      </Helmet>

      <FirmCreateView />
    </>
  );
}
