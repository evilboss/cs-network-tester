/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'click #exit-app': function () {
    navigator.app.exitApp();
  }
});

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
  networkResult: function () {
    var connectionType = Session.get('connection');
    if (connectionType === 'wifi') {
      return 'led-green'
    }
    if (connectionType === '4g') {
      return 'led-blue'
    }
    if (connectionType === '3g') {
      return 'led-yellow'
    }
    return 'led-red';
  },
  getRequest: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    var url = "https://toolbox.cloudstaff.com/~noc-display/test.txt";
    HTTP.get(url, {}, function (err, result) {
      if(result){
        if(result.content){
          Session.set('Status',result.content);
        }
      }
      console.log(err, result.content);
    });

    return Session.get('Status');
  },
  httpStatus: function () {
    if (!Session.get('Status')) {
      return 'led-red';
    }
    return 'led-green';
  },
  dns: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    var dnsping = new PingApp.Ping();
    dnsping.ping('http://' + faker.random.uuid() + '.cloudstaff.io', function (data) {
      Session.set('dns', data);
    });
    if (Session.get('dns')) {
      return Spacebars.SafeString('<strong class="green-text">Success</strong>');
    }
    return Spacebars.SafeString(' <strong class="red-text text-darken-4">Failed</strong>');

  },
  dnsResult: function () {
    if (Session.get('dns')) {
      return 'led-green'
    }
    return 'led-red';

  },
  ping: function () {
    if (Session.get('connection') == 'none') {
      return 'Not Connected';
    }
    var pinger = new PingApp.Ping();
    console.log(pinger);
    pinger.ping('8.8.8.8', function (data) {
      Session.set('ping', data);
    });
    if (Session.get('ping')) {
      var pingResult = parseInt(Session.get('ping'));
      if (pingResult < 100) {
        return Spacebars.SafeString(' <strong class="green-text">Very Fast</strong>');
      }
      if (pingResult < 200) {
        return Spacebars.SafeString(' <strong class="blue-text">Fast</strong>');
      }
      if (pingResult < 500) {
        return Spacebars.SafeString('<strong class="yellow-text text-darken-3">Slow</strong>');
      }
      return Spacebars.SafeString('<strong class="red-text text-darken-4">Very Slow</strong>');
    }
    return Spacebars.SafeString(' <strong class="red-text text-darken-4">Error</strong>');


  },
  pingResult: function () {
    if (Session.get('ping')) {
      var pingResult = parseInt(Session.get('ping'));
      if (pingResult < 100) {
        return 'led-green';
      }
      if (pingResult < 200) {
        return 'led-blue';
      }
      if (pingResult < 500) {
        return 'led-yellow';
      }
      return 'led-red';
    }
    return 'led-red';


  }
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {


};


Template.Home.rendered = function () {
  $('.modal-trigger').leanModal();
};

Template.Home.destroyed = function () {
};
