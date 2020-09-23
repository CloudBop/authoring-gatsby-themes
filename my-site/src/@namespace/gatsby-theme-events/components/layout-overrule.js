//
// - remove overrule from 
//
import React from 'react';

function Layout({ children }) {
  return (
    <>
      {children}
      <h4>Overruled with component shadowing</h4>
    </>
  );
}

export default Layout;
