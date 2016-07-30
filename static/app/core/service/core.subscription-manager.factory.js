(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("SubscriptionManager", SubscriptionManager);

    SubscriptionManager.$inject = ["TopicRegistry"];

    function SubscriptionManager(TopicRegistry) {
        var constructor = function(divider) {
            if (!divider)
                throw "[SubscriptionManager] :: divider must be defined";

            this.divider = divider;
            this.registry = new TopicRegistry(divider);
        }

        /**
         * @function subscribe
         * @arg {string} topic
         * @returns {number} timestamp
         */
        constructor.prototype.subscribe = function(topic, callback) {
            var key = [topic, new Date().getTime()].join(this.divider[0]);
            this.registry.replace(key, callback);
            return key;
        };

        /**
         * @function subscribe
         * @arg {string} topic
         * @returns {number} topic
         */
        constructor.prototype.unsubscribe = function(topic) {
            this.registry.delete(topic);
            return topic;
        };

        return constructor;
    }

}).apply(this);
