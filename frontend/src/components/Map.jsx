import { useState } from 'react';
import Iframe from 'react-iframe';
import { getMap } from '../lib/map';

export function Map() {
  const [map, setMap] = useState(null);

  const { isLoading, isError, data, error } = getMap();

  if (!isLoading && !isError) {
    // response is a html file
    const reader = new FileReader();
    // console log the html file
    reader.onload = (e) => setMap(e.target.result);
    reader.readAsDataURL(data);
  }

  return (
    // use base tag to make relative links work
    <div>
      <Iframe
        target="_parent"
        url={map}
        width="80%"
        height="615px"
        display="initial"
        position="relative"
        sandbox={['allow-same-origin', 'allow-scripts', 'allow-popups', 'allow-forms', 'allow-modals']}
        allowFullScreen
      />
    </div>
  );
}
