module.exports = {
    resolve: {
      fallback: {
        // "zlib": require.resolve("browserify-zlib"),
        zlib: require.resolve('browserify-zlib'),

        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "http": require.resolve("stream-http"),
        "url": require.resolve("url/"),
        "fs": false,  // optional: if you don't need fs in the browser
        "net": false   // optional: if you don't need net in the browser
      }
    }
  };
  