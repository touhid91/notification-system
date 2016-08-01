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
                        .get(notificationServiceEndpoint + "signalr/negotiate")
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
                                qs.push(processQueryStringAttribute("connectionId", meta.ConnectionId));
                                qs.push(processQueryStringAttribute("connectionData", [{
                                    name: hub.toLowerCase()
                                }]));
                                qs.push(processQueryStringAttribute("UserId", userId));
                                qs.push(processQueryStringAttribute("TenantId", tenantId));
                                qs.push(processQueryStringAttribute("tid", Math.floor(Math.random() * 11)));

                                var protocol = null === notificationServiceEndpoint.match(/https/)
                                    ? "ws"
                                    : "wss";
                                var wsu = protocol + ":" + notificationServiceEndpoint.slice(notificationServiceEndpoint.indexOf("//")) + "signalr/connect?" + qs.join("&");

                                var ws = new WebSocket(wsu);
                                ws.onopen = function() {
                                    console.info("onopen");
                                };

                                ws.onclose = function() {
                                    console.info("onclose");
                                };

                                ws.onerror = function() {
                                    console.error("onerror");
                                };

                                ws.onmessage = function() {
                                    console.info("onmessage");
                                };

                                return ws;
                            });
                        }, deferral.reject);

                    return deferral.promise;
            }

            function processQueryStringAttribute(key, value) {
                var val = "object" === typeof value
                    ? window.encodeURIComponent(JSON.stringify(value))
                    : value;
                return [key, val].join("=");
            }
        };
    }

}).apply(this);
