(function() {
    "use strict";

    var app = angular.module("app.root");

    app.controller("RootCtrl", function(PushNotificationService) {
        var pns = new PushNotificationService("ecap.pds");
        debugger;
    });

}).apply(this);
