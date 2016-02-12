App.info({
    name: 'CS-Network-Tester',
    description: 'Network Tools for mobile',
    version: '0.0.1',
    author: 'Jr Reyes',
    email: 'jr.evilboss@gmail.com'

});
App.accessRule('http://meteor.local');
App.accessRule('*');
// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');