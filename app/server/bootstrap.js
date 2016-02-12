Meteor.startup(function () {
  console.log('Configuring content-security-policy:');
  BrowserPolicy.content.allowOriginForAll("http://meteor.local");
  BrowserPolicy.content.allowSameOriginForAll();
  BrowserPolicy.content.allowOriginForAll('http://*.cloudstaff.com');
  BrowserPolicy.content.allowEval();
  BrowserPolicy.framing.disallow();

  WebApp.connectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

});
