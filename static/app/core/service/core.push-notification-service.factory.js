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
        var constructor = function(context, config) {
            this.context = context;
            this.subscriptionManager = new SubscriptionManager([">", "+"]);
            this.topicGenerator = new TopicGenerator([">", "+"]);

            connectionFactory.createAsync(context)
                .then(function(provide) {
                    if (!config || !Array.isArray(config))
                        throw "[[PushNotificationService]] :: config must be defined to establish ws connection";
                    this.ws = provide.apply(this, /*TODO add config adapter*/ config);
                }.bind(this));
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

        constructor.prototype.unsubscribe = function(topic) {
            return this.subscriptionManager.unsubscribe(topic);
        };

        return constructor;
    }

}).apply(this);
