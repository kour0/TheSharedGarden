import Iframe from 'react-iframe'

export function Map() {
  return (
    <div>
      <Iframe url="http://127.0.0.1:5454/map"
        width="80%"
        height="615px"
        display="initial"
        position="relative"
        allowFullScreen/>
    </div>
  )
}