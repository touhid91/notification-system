(function() {

    "use strict";

    var module = angular.module("app.core");

    module.service("signalrSocketHelper", constructor);

    constructor.$inject = ["$http", "uriHelper"];

    function constructor($http, uriHelper) {
        this.negotiatePath = "signalr/negotiate";
        this.connectPath = "signalr/connect";

        this.negotiate = function(serviceRoot, queryKeyVals) {
            var url = serviceRoot + this.negotiatePath;
            return $http.get(uriHelper.composeURI(url, uriHelper.composeQSFromKeyValues(queryKeyVals)));
        };

        this.createWSUrl = function(serviceRoot, queryKeyVals, meta) {
            if (!queryKeyVals.hasOwnProperty("transport"))
                queryKeyVals["transport"] = "webSockets";
            if (!queryKeyVals.hasOwnProperty("connectionToken"))
                queryKeyVals["connectionToken"] = meta.ConnectionToken;
            if (!queryKeyVals.hasOwnProperty("tid"))
                queryKeyVals["tid"] = Math.floor(Math.random() * 11);

            return uriHelper.isHTTPS(this.serviceRoot) ? "wss:" : "ws:" +
                serviceRoot.slice(this.serviceRoot.indexOf("//")) + this.connectPath, queryKeyVals;
        }

        this.payloadParser = function(hub) {
            var count = 0;
            return {
                serialize: function(action, message) {
                    return {
                        A: [JSON.stringify(message)],
                        H: hub,
                        I: count++,
                        M: action
                    };
                },
                deserialize: function(message) {
                    return;
                }
            }
        }
    };
})
.apply(this);
