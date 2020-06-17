const fs = require('fs');
const { report } = require('process');

//
// make sure directory exists
exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data';
  if (!fs.existsSync()) {
    reporter.info(`create the ${content} directory `);
    fs.mkdirSync(contentPath);
  }
};

//
// define the event type as array to avoid undefined error.
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

//
// define resolvers for custom in event fields (slug)
exports.createResolvers = ({ createResolvers }) => {
  // site idx
  const basePath = '/';
  //
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
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  });
};
//
// query evts and create pages
exports.createPages = async ({ actions, graphql, reporter }) => {
  const basePath = '/';
  actions.createPage({
    path: basePath,
    component: require.resolve('./src/templates/events.js')
  });

  // returns promise
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
        eventID: event.id
      }
    });
  });
};
