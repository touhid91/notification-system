(function() {
    "use strict";

    var module = angular.module("app.root");

    module.controller("RootCtrl", constructor);

    constructor.$inject = ["PDSPushNotificationService"];

    function constructor(PDSPushNotificationService){
        var pns = new PDSPushNotificationService();
        pns.initAsync({
                "transport":"webSockets",
                "TenantId":"fa17992a-1490-4796-aad7-4651fac517c2",
                "UserId":"2494b8a1-5153-481f-9393-53595f53084b",
                "connectionData": [{ name: "notifierserverhub".toLowerCase() }]
            })

            .then(function(ns){
                var topic = ns.subscribeAll("person", "create", function() {
                    console.log("person updated");
                });

                ns.unsubscribe(topic);
            });
        }
}).apply(this);
