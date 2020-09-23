const fs = require('fs');
//
// options is passed from args in gatsby-config wrapper function when configd to plugin
//

exports.onPreBootstrap = ({ reporter }, options) => {
  // make sure directory exists
  const contentPath = options.contentPath || 'data';
  // if not 
  if (!fs.existsSync(contentPath)) {
    // then report creating a directory
    reporter.info(`create the ${contentPath} directory `);
    // create dir 
    fs.mkdirSync(contentPath);
  }
};

//
// define the Node type as array to avoid undefined error.
exports.sourceNodes = ({ actions }) => {
  // @dontInfer fields - explicit defined
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `);
};
// define resolvers for custom event fields (slug)
exports.createResolvers = ({ createResolvers }, options) => {
  // site idx
  const basePath = options.basePath || '/';
  // convert the Event name to slug
  const slugify = str => {
    //
    const slug = str
      .toLowerCase()
      // replace any non alphanumeric with '-'
      .replace(/[^a-z0-9]+/g, '-')
      // ^- === leading hyphen
      // -$ === trailing hyphen
      // +/g check for multiple instance. '____home' and remove
      .replace(/(^-|-$)+/g, '');
    //
    // replace any double or more slashes with single
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  };
  //
  createResolvers({
    // get custom Event node in graaphql and resolve to create slug
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  });
};
//
// query evts and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || '/';

  //  create events page
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/events.js')
  });

  // query allEvents and sort them - returns promise
  const result = await graphql(`
    query {
      allEvent(sort: {fields: startDate, order: ASC}) {
        nodes {
          id
          slug
        }
      }
    }
  `);
  //
  if (result.error) {
    reporter.panic('error loading events', reporter.errors);
    return;
  }
  // found events
  const events = result.data.allEvent.nodes;
  //
  events.forEach(event => {
    // pass this as props into component
    const slug = event.slug;
    //
    actions.createPage({
      path: slug,
      component: require.resolve('./src/templates/event.js'),
      context: {
        // make available as query variable in page queries
        // src/templates/event.js
        eventID: event.id
      }
    });
  });
};
