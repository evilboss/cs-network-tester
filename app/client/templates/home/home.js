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

function ping(ip, callback) {
  if (!this.inUse) {
    this.status = 'unchecked';
    this.inUse = true;
    this.callback = callback;
    this.ip = ip;
    var _that = this;
    this.img = new Image();
    this.img.onload = function () {
      _that.inUse = false;
      _that.callback('responded');

    };
    this.img.onerror = function (e) {
      if (_that.inUse) {
        _that.inUse = false;
        _that.callback('responded', e);
      }

    };
    this.start = new Date().getTime();
    this.img.src = "http://" + ip;
    this.timer = setTimeout(function () {
      if (_that.inUse) {
        _that.inUse = false;
        _that.callback('timeout');
      }
    }, 1500);
  }
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
    ping('8.8.8.8', function (result) {
      console.log(result);
      Session.set('Ping', result);
    });
    return Session.get('Ping');
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
