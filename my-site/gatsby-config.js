module.exports = {
  plugins: [
    {
      resolve: 'gatsby-theme-events',
      options: {
        // the folder to read .yml from
        contentPath: 'upcoming-events',
        // the url to create pages for
        basePath: 'events'
      }
    }
  ]
};
