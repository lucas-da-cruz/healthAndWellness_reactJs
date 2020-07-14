const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/hw',
    createProxyMiddleware({
	   //target: 'http://localhost:8080', secure: false, changeOrigin: true 
	   target: 'https://api-health-wellness.herokuapp.com', changeOrigin: true 
    })
  );
};