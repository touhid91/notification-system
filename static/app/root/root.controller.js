(function() {
    "use strict";

    var module = angular.module("app.root");

    module.controller("RootCtrl", constructor);

    constructor.$inject = ["PDSPushNotificationService"];

    function constructor(PDSPushNotificationService) {
        var pns = new PDSPushNotificationService(undefined, {
            "transport": "webSockets",
            "TenantId": "fa17992a-1490-4796-aad7-4651fac517c2",
            "UserId": "2494b8a1-5153-481f-9393-53595f53084b",
            "connectionData": [{
                name: "notifierserverhub".toLowerCase()
            }]
        });
        pns.create()

        .then(function() {
            var topicAll = pns.subscribeAll("person", "create", function() {
                console.log("person updated");
            });

            var topicSingle1 = pns.subscribeSingle("person", "1", "wrongaction", function() {
                console.log("person 1 updated");
            });

            var topicSingle2 = pns.subscribeSingle("person", "1", "*", function() {
                console.log("person 1 updated");
            });

            var topicGroup = pns.subscribeGroup("person", ["1", "2"], "create", function() {
                console.log("people 1 2 updated");
            });

            pns.unsubscribe([topicAll, topicSingle2, topicSingle1, topicGroup]);
        });
    }
})
.apply(this);
