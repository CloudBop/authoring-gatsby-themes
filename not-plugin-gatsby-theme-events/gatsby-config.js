module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      // REVEAL FILE TO GATSBY data/
      options: {
        path: 'data'
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event'
      }
    }
  ]
};
