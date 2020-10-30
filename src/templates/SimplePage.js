import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import MarkdownText from '../components/MarkdownText';

const SimplePage = ({
  data: {
    markdownRemark: { htmlAst, frontmatter },
  },
}) => {
  const { title } = frontmatter;

  return (
    <Layout title={title}>
      <MarkdownText hast={htmlAst} />
    </Layout>
  );
};

export default SimplePage;

export const pageQuery = graphql`
  query($id: String) {
    markdownRemark (id: { eq: $id }) {
      htmlAst
      frontmatter { title }
    }
  }
`;
