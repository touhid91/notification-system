(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PDSPushNotificationService", pns);

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

                    deferral.resolve(pns.decorateNotificationSocket(this.serviceRoot + pns.signalr.connectPath, queryKeyVals));

                }.bind(this), deferral.reject);

            return deferral.promise;
        };

        constructor.prototype.subscribeAll = function(entityName, action, callback) {
            //TODO implement request to wsserver

            return this
                .subscriptionManager
                .subscribe(this.topicGenerator.generate(topicGeneratorModelAdapter.normalize(this.context, entityName, null, action)), callback);
        };

        constructor.prototype.subscribeSingle = function(entityName, id, action, callback) {
            //TODO implement request to wsserver

            return this
                .subscriptionManager
                .subscribe(this.topicGenerator.generate(topicGeneratorModelAdapter.normalize(this.context, entityName, id, action)), callback);
        };

        constructor.prototype.subscribeGroup = function(entityName, ids, action, callback) {
            //TODO implement request to wsserver

            return this
                .subscriptionManager
                .subscribe(this.topicGenerator.generate(topicGeneratorModelAdapter.normalize(this.context, entityName, ids, action)), callback);
        };

        constructor.prototype.unsubscribe = function(topic) {
            return this
                .subscriptionManager
                .unsubscribe(topic);
        };

        return constructor;
    }

})
.apply(this);
