angular.module('app')
.factory('connections', function() {
    var currentRequests = {
        value: 0
    };

    currentRequests.setConnections = function(val) {
      this.value = val;
    };

    currentRequests.addConnection = function() {
      this.value++;
    };

    currentRequests.removeConnection = function() {
      this.value--;
    };

    currentRequests.getValue = function() {
        return this.value;
    };

    return currentRequests;
});