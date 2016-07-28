(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PushNotificationService", PushNotificationService);

    pushNotificationService.$inject = [
        "webSocketConnectionFactory",
        "SubscriptionManager",
        "topicGeneratorService",
        "topicGeneratorModelAdapter"
    ];

    function PushNotificationService(
        webSocketConnectionFactoryService,
        SubscriptionManager,
        topicGeneratorService,
        topicGeneratorModelAdapter) {
        var constructor = function(context) {
            this.context = context;
            this.connection = webSocketConnectionFactoryService.create(context);
            this.subscriptionManager = new SubscriptionManager();
        }

        constructor.prototype.subscribeAll = function(entityName, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                topicGeneratorService.generate(
                    topicGeneratorModelAdapter.adapt(this.context, entityName, null, action)),
                callback);
        };

        constructor.prototype.subscribeSingle = function(entityName, id, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                topicGeneratorService.generate(
                    topicGeneratorModelAdapter.adapt(this.context, entityName, id, action)),
                callback);
        };

        constructor.prototype.subscribeGroup = function(entityName, ids, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                topicGeneratorService.generate(
                    topicGeneratorModelAdapter.adapt(this.context, entityName, id, action)),
                callback);
        };
    }

}).apply(this);
