(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PDSPushNotificationService", PDSPushNotificationService);

    PDSPushNotificationService.$inject = [
        "pushNotificationService",
        "$q",
        "uriHelper",
        "TopicGenerator",
        "topicGeneratorModelAdapter",
        "SignalrSocket",
        "CONSTANT"
    ];

    function PDSPushNotificationService(
        pns,
        $q,
        uriHelper,
        TopicGenerator,
        topicGeneratorModelAdapter,
        SignalrSocket,
        CONSTANT) {
        var constructor = function(queryKeyVals) {
            this.serviceRoot = "http://172.16.0.223/Selise.AppSuite.Notifier.NotifierServer/";
            this.topicGenerator = new TopicGenerator(CONSTANT.SEPERATOR);
            this.socket = new SignalrSocket(this.serviceRoot, queryKeyVals);
        }

        constructor.prototype.create = function () {
            return this.socket.create();
        };

        constructor.prototype.subscribeAll = function(entityName, action, callback) {
            //TODO implement request to wsserver
            debugger;

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
            if (!Array.isArray(topic))
                return this.notificationSocket.unsubscribe(topic);
            else {
                var result = true;
                for (var i = 0; i < topic.length; i++)
                    result = result && this.notificationSocket.unsubscribe(topic[i]);
                return result;
            }
        };


        return constructor;
    }

})
.apply(this);
