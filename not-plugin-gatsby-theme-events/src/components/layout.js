import React from 'react';
import { Heading, Container } from 'theme-ui';
function Layout({ children }) {
  return (
    <div>
      <Heading>Gatsby Events Theme</Heading>
      <Container>{children}</Container>
      {/*
      <h1>Gatsby Events Theme</h1>
      <div className="test">{children}</div>
      */}
    </div>
  );
}

export default Layout;
