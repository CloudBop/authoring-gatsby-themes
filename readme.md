<!-- <a href="http://fvcproductions.com"><img src="https://avatars1.githubusercontent.com/u/4284691?v=3&s=200" title="FVCproductions" alt="FVCproductions"></a> -->

<!-- [![FVCproductions](https://avatars1.githubusercontent.com/u/4284691?v=3&s=200)](http://fvcproductions.com) -->

***INSERT GRAPHIC HERE (include hyperlink in image)***

# Gatsby Themeing

Setup and Boilerplate for gatsby themeing with workspaces.

gatsby-theme-events 
- utilises a yaml-source plugin. 
- see gatsby-node. parses data/events.yaml into graphql
- components for List Events + Each Event

my-site utlisies the gatsby-theme-events theme/plugin and this functionality can be overriden witin my-site.
- see gatsby-config 
- events folder in my-site/events

not-plugin-gatsby-theme-events is a non-plugin version. IE standalone gatsby site. This gatsby-node.js is most commented&explained

Only difference is that the plugin version is exported as a function rather than an object. This enables args to be passed via the gatsby-plugin.js

> Useful commands
- yarn workspaces info

> Remember to install deps using 
- yarn workspace workspacename install
- yarn workspace workspacename add dep-name

> Run the site using the events theme as a plugin script below
- yarn workspace my-site develop

> Run the theme as a standalone site
- yarn workspace not-plugin-gatsby-theme-events develop


> gatsby, themes, plugins

**Extra notes**
 If you use zsh, the * needs to be quoted, e.g. gatsby-theme-events@"*" or "gatsby-theme-events@*"

 package.json.name for referencing workspace, beware the @namespace/ easy to gotcha.

 Both event plugin/standalone have dependencies for running. peerDeps and devDependencies Could be cleaned up?


**Badges will go here**

- build status
- issues (waffle.io maybe)
- devDependencies
- npm package
- coverage
