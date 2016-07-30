(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("PushNotificationService", PushNotificationService);

    PushNotificationService.$inject = [
        "connectionFactory",
        "SubscriptionManager",
        "TopicGenerator",
        "topicGeneratorModelAdapter"
    ];

    function PushNotificationService(
        connectionFactory,
        SubscriptionManager,
        TopicGenerator,
        topicGeneratorModelAdapter) {
        var constructor = function(context) {
            this.context = context;
            this.connection = connectionFactory.create(context);
            this.subscriptionManager = new SubscriptionManager([">", "+"]);
            this.topicGenerator = new TopicGenerator([">", "+"]);
        }

        constructor.prototype.subscribeAll = function(entityName, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, null, action)),
                callback);
        };

        constructor.prototype.subscribeSingle = function(entityName, id, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, id, action)),
                callback);
        };

        constructor.prototype.subscribeGroup = function(entityName, ids, action, callback) {
            //TODO implement request to wsserver

            return this.subscriptionManager.subscribe(
                this.topicGenerator.generate(
                    topicGeneratorModelAdapter.normalize(this.context, entityName, ids, action)),
                callback);
        };

        constructor.prototype.unsubscribe = function (topic) {
            return this.subscriptionManager.unsubscribe(topic);
        };

        return constructor;
    }

}).apply(this);
