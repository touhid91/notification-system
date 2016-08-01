(function() {
    "use strict";

    var app = angular.module("app.root");

    app.controller("RootCtrl", function(PushNotificationService) {
        var pns = new PushNotificationService("ecap.pds", ["notifierserverhub", "2494b8a1-5153-481f-9393-53595f53084b", "fa17992a-1490-4796-aad7-4651fac517c2"]);
        var topic = pns.subscribeAll("person", "create", function() {
            console.log("person updated");
        });

        pns.unsubscribe(topic);
    });

}).apply(this);
