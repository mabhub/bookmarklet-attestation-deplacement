const path = require('path');
const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

exports.createPages = async ({ actions: { createPage }, graphql, reporter }) => {
  const result = await graphql(`
    {
      allFile(filter: {sourceInstanceName: {eq: "markdown-pages"}}) {
        nodes {
          childMarkdownRemark {
            id
          }
          name
          relativeDirectory
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }

  result.data.allFile.nodes.forEach(({
    childMarkdownRemark: { id },
    name,
    relativeDirectory,
  }) => {
    createPage({
      path: path.join(relativeDirectory, name),
      component: require.resolve('./src/templates/SimplePage.js'),
      context: { id },
    });
  });
};

exports.sourceNodes = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
  const res = await fetch('https://media.interieur.gouv.fr/deplacement-covid-19');
  const src = await res.text();
  const dom = new JSDOM(src);
  const { document } = dom.window;

  const fields = Array.from(document.querySelectorAll('input')).map(input => {
    const field = ['placeholder', 'id', 'pattern', 'type'].reduce((acc, curr) => {
      const value = input.getAttribute(curr);
      if (!value) { return acc; }
      return { ...acc, [curr]: value };
    }, {});

    const label = document.querySelector(`[for="${field.id}"]`);
    if (label) {
      field.label = label.textContent;
    }

    return field;
  });

  fields.forEach(field => createNode({
    id: createNodeId(`formField-${field.id}`),
    attributes: field,
    internal: {
      type: 'FormField',
      content: JSON.stringify(field),
      contentDigest: createContentDigest(JSON.stringify(field)),
    },
  }));
};
