App.info({
    name: 'CS-Network-Tester',
    description: 'Network Tools for mobile',
    version: '0.0.1',
    author: 'Jr Reyes',
    email: 'jr.evilboss@gmail.com'

});
App.accessRule('http://meteor.local');
App.accessRule('*');

App.icons({
  // Android
  'android_hdpi': 'resources/icons/android/drawable-hdpi/ic_launcher.png',
  'android_ldpi': 'resources/icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'resources/icons/android/drawable-mdpi/ic_launcher.png',
  'android_xhdpi': 'resources/icons/android/drawable-xhdpi/ic_launcher.png'
});

// Set PhoneGap/Cordova preferences
App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
App.setPreference('SplashScreen', 'CDVSplashScreen');

