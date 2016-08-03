(function() {
    "use strict";

    var module = angular.module("app.root");

    module.controller("RootNodeSocketCtrl", constructor);

    constructor.$inject = ["pushNotificationService"];

    function constructor(pushNotificationService) {
        //var ns = pushNotificationService.decorateNotificationSocket("ws://localhost:3001");
        var ns = pushNotificationService.createSocket("ws://localhost:3001", {});

        var sub1Id = ns.subscribe(function(payload){
            console.log(sub1Id, payload);
            ns.unsubscribe(sub1Id);
        });

        var sub2Id = ns.subscribe(function(payload){
            console.log(sub2Id, payload);
        });
        // ns.unsubscribe(sub1Id);
        // ns.unsubscribe(sub2Id);
    };
})
.apply(this);
