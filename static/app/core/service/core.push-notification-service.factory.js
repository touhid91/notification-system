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

        constructor.prototype.subscribe = function(entityName, action, callback) {
            //TODO implement request to wsserver
            //
            var topic = topicGeneratorService.generate(
                topicGeneratorModelAdapter.adapt(this.context, entityName, null, action));

            var ts = this.subscriptionManager.subscribe(topic, callback);
            return [topic, ts].join("/");
        };
    }

}).apply(this);
