(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("topicGeneratorService", constructor);

    constructor.$inject = [];

    function constructor() {
        /**
         * @function generate
         * @arg {Object} model
         * @returns {string} topic
         */
        this.generate = function(model) {
            if (!model.context)
                throw "undefined context";
            if (!model.root)
                throw "undefined root";

            var topic = [];
            topic.push(model.context);
            topic.push(model.root);
            if (model.id) {
                if (typeof model.id === "string")
                    topic.push(model.id);
                else if (Array.isArray(model.id))
                    topic.push(model.id.join(","));
            }
            if (model.actions.length)
                topic.push(model.actions.join(","));

            return topic.join("/");
        };
    }

}).apply(this);
