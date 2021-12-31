const path = require("path");
const withImages = require("next-images");
const { withFederatedSidecar } = require('@module-federation/nextjs-mf');

module.exports = withImages({
  webpack(config, options) {
    return config;
  },
});

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = withFederatedSidecar({
  name: "checkout",
  filename: "static/chunks/remoteEntry.js",
  exposes: {
    "./app": "./src/components/App.js",
    "./checkout": "./pages/checkout",
    "./pages-map": "./pages-map.js"
  },
  shared: {
    react: {
      requiredVersion: false,
      singleton: true,
    }
  }
})({
  webpack5: true,
  webpack(config, options){
    const { webpack } = options;

    config.experiments = { topLevelAwait: true};
    config.output.publicPath = "auto";

    config.module.rules.push({
      test: /_app.js/,
      loader: "@module-federation/nextjs-mf/lib/federation-loader.js"
    });
    if (options.isServer) {
      Object.assign(config.resolve.alias, {
        checkout: false,
        shop: false,
      });
    }else {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          remoteType: "var",
          remotes: {
            shop: "shop",
            checkout: "checkout"
          },
          shared: {
            "@module-federation/nextjs-mf/lib/noop": {
              eager: false,
            },
            react: {
              singleton: true,
              eager: true,
              requiredVersion: false
            }
          }
        })
      );
    }
    return config;
  }
})
