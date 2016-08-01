(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("connectionFactory", constructor);

    constructor.$inject = ["$http", "$q"];

    function constructor($http, $q) {
        /**
         * @function create
         * @arg {string} context
         * @returns a new instance of WebSocket
         */
        this.createAsync = function(context) {
            switch (context) {
                case "ecap.pds":
                    // TODO move into seperate provider
                    var deferral = $q.defer();

                    //TODO add endpoint in shellapi
                    var notificationServiceEndpoint = "http://172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/";

                    $http
                        .get(notificationServiceEndpoint + "signalr/negotiate?UserId=2494b8a1-5153-481f-9393-53595f53084b&TenantId=fa17992a-1490-4796-aad7-4651fac517c2&connectionData=%5B%7B%22name%22%3A%22notifierserverhub%22%7D%5D&clientProtocol=1.3&_=1470043291626")
                        .then(function(response) {
                            var meta = response.data;
                            deferral.resolve(function(hub, userId, tenantId) {
                                if (!hub)
                                    throw "[connectionFactory] :: undefined param hub";
                                if (!userId)
                                    throw "[connectionFactory] :: undefined param userId";
                                if (!tenantId)
                                    throw "[connectionFactory] :: undefined param tenantId";

                                var qs = [];

                                qs.push(processQueryStringAttribute("transport", "webSockets"));
                                qs.push(processQueryStringAttribute("connectionToken", meta.ConnectionToken));
                                qs.push(processQueryStringAttribute("UserId", userId));
                                qs.push(processQueryStringAttribute("TenantId", tenantId));
                                qs.push(processQueryStringAttribute("connectionData", [{
                                        name: hub.toLowerCase()
                                    }
                                ]));
                                qs.push(processQueryStringAttribute("tid", Math.floor(Math.random() * 11)));

                                var protocol = null === notificationServiceEndpoint.match(/https/)
                                    ? "ws"
                                    : "wss";
                                var wsu = protocol + ":" + notificationServiceEndpoint.slice(notificationServiceEndpoint.indexOf("//")) + "signalr/connect?" + qs.join("&");

                                return new WebSocket(wsu);
                            });
                        }, deferral.reject);

                    return deferral.promise;
            }

            function processQueryStringAttribute(key, value) {
                var val = "object" === typeof value
                    ? window.encodeURIComponent(JSON.stringify(value))
                    : window.encodeURIComponent(value);
                return [key, val].join("=");
            }
        };
    }

}).apply(this);
