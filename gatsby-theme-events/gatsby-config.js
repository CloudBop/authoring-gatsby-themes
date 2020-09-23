//
// runs as plugin of my-site. Won't develop as stand alone. see - /not-plugin-gatsby-theme-events
//
module.exports = ({ contentPath = 'data', basePath = '/' }) => ({
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: contentPath
      }
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: 'Event'
      }
    }
  ]
});
