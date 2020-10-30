import { graphql, useStaticQuery } from 'gatsby';

export const useBlocks = () => {
  const { wrapper } = useStaticQuery(graphql`
    query {
      wrapper: allFile(filter: {sourceInstanceName: {eq: "markdown-blocks"}}) {
        nodes {
          childMarkdownRemark { htmlAst }
          name
          relativeDirectory
        }
      }
    }
  `);

  const items = wrapper.nodes
    .reduce((acc, { name, childMarkdownRemark }) => ({ ...acc, [name]: childMarkdownRemark }), {});

  return items;
};

export default useBlocks;
