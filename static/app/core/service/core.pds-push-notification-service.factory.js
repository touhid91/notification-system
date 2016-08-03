(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PDSPushNotificationService", PDSPushNotificationService);

    PDSPushNotificationService.$inject = [
        "pushNotificationService",
        "$q",
        "uriHelper",
        "TopicGenerator",
        "topicGeneratorModelAdapter"
    ];

    function PDSPushNotificationService(
        pns,
        $q,
        uriHelper,
        TopicGenerator,
        topicGeneratorModelAdapter) {
        var constructor = function(serviceRoot) {
            this.serviceRoot = serviceRoot || "http://172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/";
            this.topicGenerator = new TopicGenerator([">", "+"]);
            this.notificationSocket = null;
            this.context
            this.context = "ecap";
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

                    this.notificationSocket = pns.decorateNotificationSocket(
                        uriHelper.isHTTPS(this.serviceRoot) ? "wss:" : "ws:" +
                        this.serviceRoot.slice(this.serviceRoot.indexOf("//")) + pns.signalr.connectPath, queryKeyVals);

                    deferral.resolve();

                }.bind(this), deferral.reject);

            return deferral.promise;
        };

        constructor.prototype.subscribeAll = function(entityName, action, callback) {
            //TODO implement request to wsserver

            return this.notificationSocket.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, null, action)),
                callback);
        };

        constructor.prototype.subscribeSingle = function(entityName, id, action, callback) {
            //TODO implement request to wsserver

            return this.notificationSocket.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, id, action)),
                callback);
        };

        constructor.prototype.subscribeGroup = function(entityName, ids, action, callback) {
            //TODO implement request to wsserver

            return this.notificationSocket.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, ids, action)),
                callback);
        };

        constructor.prototype.unsubscribe = function(topic) {
            return this.notificationSocket.unsubscribe(topic);
        };


        return constructor;
    }

})
.apply(this);
