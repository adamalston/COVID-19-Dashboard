import React from 'react';
import { Container, Layout } from 'components';

const NotFoundPage = () => {
  return (
    <Layout>
      <Container type="content" className="text-center">
        <h1>Page Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
