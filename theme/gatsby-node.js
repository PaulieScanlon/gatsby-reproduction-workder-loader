const path = require('path');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allMdx: { nodes }
    }
  } = await graphql(`
    {
      allMdx {
        nodes {
          id
          fileAbsolutePath
          frontmatter {
            title
          }
          tableOfContents
          parent {
            ... on File {
              relativeDirectory
              name
            }
          }
        }
      }
    }
  `);

  nodes.map((node) => {
    const pagePath = getPath(node);

    createPage({
      path: pagePath,
      component: node.fileAbsolutePath,
      context: {
        mdxId: node.id
      }
    });
  });
};

function getPath(node) {
  // sites can programmatically override slug, that takes priority
  if (node.fields && node.fields.slug) {
    return node.fields.slug;
  }

  // then a slug specified in frontmatter
  if (node.frontmatter && node.frontmatter.slug) {
    return node.frontmatter.slug;
  }

  // finally, we'll just use the path on disk
  return path
    .join(node.parent.relativeDirectory, node.parent.name === 'index' ? '/' : node.parent.name)
    .replace(/\\/g, '/'); // Windows paths to forward slashes
}

exports.onCreateWebpackConfig = ({ actions: { setWebpackConfig } }) => {
  setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader'
          }
        }
      ]
    }
  });
};
