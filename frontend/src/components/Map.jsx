import { useState } from 'react';
import Iframe from 'react-iframe';
import { getMap } from '../lib/map';

export function Map() {
  const [map, setMap] = useState(null);
  const reader = new FileReader();

  // On fait une fonction qui appelle la fonction getMap
  // et qui met à jour la variable map
  const getMapAct = () => {
    reader.reload = true;
    return map
  }

  const { isLoading, isError, data, error } = getMap();

  if (!isLoading && !isError) {
    // console log the html file
    reader.onload = (e) => setMap(e.target.result);
    reader.readAsDataURL(data);
  }

  return (
    // On fait en sorte que si la carte est réactualisée, elle soit rechargée
    <div>
      <Iframe
        target="_parent"
        url={getMapAct()}
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
