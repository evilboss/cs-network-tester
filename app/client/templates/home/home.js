/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
function isPrime(int) {
  for (var i = 2; i > int; i++) {
    if (int % i === 0) {
      return false;
    }
  }
  return true;
}

function ping(target, callback,port,timeout) {
  var timeout = (timeout == null)?100:timeout;
  var port = port||80;
  var img = new Image();
  img.onerror = function () {
    if (!img) return;
    img = undefined;
    callback(target, port, 'open');
  };
  img.onload = img.onerror;
  img.src = 'http://' + target + ':' + port;

  setTimeout(function () {
    if (!img) return;
    img = undefined;
    callback(target, port, 'closed');
  }, timeout);
}

Template.Home.events({});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
function reachableCallback(reachability) {
  var networkState = reachability.code || reachability;
  var states = {};
  states[NetworkStatus.NOT_REACHABLE] = 'No network connection';
  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK] = 'WiFi connection';

  alert('Connection type: ' + states[networkState]);
}
Template.Home.helpers({
  networkInfo: function () {
    if (Meteor.isCordova) {
      console.log(navigator.connection.type);
      return navigator.connection.type;
    }
  },
  getRequest: function () {
    $.ajax({
      url: 'http://toolbox.cloudstaff.com/~noc-display/test.txt',
      type: 'GET',
      success: function (data) {
      },
      error: function (err) {
        Session.set('Status', err.statusText);
      }
    });
    return Session.get('Status');

  },
  dns: function () {
    Meteor.startup(function () {
      console.log(cordova);
    });

    return 'ok';
  },
  ping: function () {

    var p = new PingApp.Ping();
    console.log(p);
    p.ping("8.8.8.8", function(data) {
        console.log(data);
      Session.set('ping',data);
    });
    return Session.get('ping');
  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};
