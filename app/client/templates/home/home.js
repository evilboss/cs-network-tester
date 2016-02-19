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

function ping(target, callback, port, timeout) {
  var timeout = (timeout == null) ? 100 : timeout;
  var port = port || 80;
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
      Session.set('connection', navigator.connection.type);
      return navigator.connection.type;
    }
  },
  getRequest: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    $.ajax({
      url: 'https://toolbox.cloudstaff.com/~noc-display/test.txt',
      type: 'GET',
      success: function (data) {
        Session.set('Status', data);
      },
      error: function (err) {
        Session.set('Status', err.statusText);
      }
    });
    return Session.get('Status');

  },
  dns: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    var p = new PingApp.Ping();
    p.ping("cloudstaff.com", function (data) {
      Session.set('dns', data);
    });
    if (Session.get('dns')) {
      return Session.get('dns') + ' ms';
    }

  },
  ping: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    var p = new PingApp.Ping();
    p.ping("8.8.8.8", function (data) {
      Session.set('ping', data);
    });
    if (Session.get('ping')) {
      return Session.get('ping') + ' ms';
    }

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
