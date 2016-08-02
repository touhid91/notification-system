(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PDSPushNotificationService", PDSPushNotificationService);

    PDSPushNotificationService.$inject = ["pushNotificationService", "$q", "uriHelper"];

    function PDSPushNotificationService(pns, $q, uriHelper) {
        var constructor = function(serviceRoot) {
            this.serviceRoot = serviceRoot || "http://172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/";
        }

        constructor.prototype.initAsync = function(queryKeyVals) {

            if (!queryKeyVals.hasOwnProperty("connectionData"))
                throw "[PDSPushNotificationService] :: undefined connectionData in argument queryKeyVals";

            var deferral = $q.defer();

            pns.signalr
                .negotiate(this.serviceRoot)
                .then(function(response) {
                    var meta = response.data;

                    if (!queryKeyVals.hasOwnProperty("transport"))
                        queryKeyVals["transport"] = "webSockets";
                    if (!queryKeyVals.hasOwnProperty("connectionToken"))
                        queryKeyVals["connectionToken"] = meta.ConnectionToken;
                    if (!queryKeyVals.hasOwnProperty("tid"))
                        queryKeyVals["tid"] = Math.floor(Math.random() * 11);

                    deferral.resolve(pns.decorateNotificationSocket(/*TODO ws/s*/"ws:"+this.serviceRoot.slice(this.serviceRoot.indexOf("//")) + pns.signalr.connectPath, queryKeyVals));

                }.bind(this), deferral.reject);

            return deferral.promise;
        };
        return constructor;
    }

})
.apply(this);
