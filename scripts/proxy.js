module.exports = [
  () => ({
    context: (pathname, req) => {
      if (req.get('Accept').indexOf('text/html') >= 0) {
        return false;
      }
      return true;
    },
    target: 'http://test.gs.zufangzi.com',
    // secure: true,
    changeOrigin: true,
    logLevel: 'silent'
  })
];
