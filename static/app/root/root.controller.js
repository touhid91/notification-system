(function() {
    "use strict";

    var app = angular.module("app.root");

    app.controller("RootCtrl", function(PushNotificationService) {
        var pns = new PushNotificationService("ecap.pds");
        var topic = pns.subscribeAll("person","create", function(){
            console.log("person updated");
        });

        pns.unsubscribe(topic);
        debugger;
    });

}).apply(this);
