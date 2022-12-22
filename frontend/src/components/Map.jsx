import Iframe from 'react-iframe'

export function Map() {
  return (
    // use base tag to make relative links work
    <div>
<<<<<<< HEAD
      <Iframe url="http://127.0.0.1:5454/api/map"
=======
      <Iframe
        target='_parent'
        url="http://127.0.0.1:5454/map"
>>>>>>> master
        width="80%"
        height="615px"
        display="initial"
        position="relative"
        allowFullScreen/>
    </div>
  )
}