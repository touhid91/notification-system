(function() {
    "use strict";

    var module = angular.module("app.core");

    module.factory("TopicGenerator", TopicGenerator);

    TopicGenerator.$inject = [];

    function TopicGenerator() {
        /**
         * @function generate
         * @param {heterogeneous array} model
         * @returns {string} topic
         */
        var constructor = function(seperator) {
            if (!seperator)
                throw "[TopicGenerator] :: seperator must be defined";

            this.seperator = seperator;
        }

        constructor.prototype.generate = function(model) {
            if (!model)
                throw "[topicGeneratorService] :: model must be defined";

            for (var i = 0; i < model.length; i++)
                if (Array.isArray(model[i]))
                    if (model[i].length === 0)
                        model.splice(i, 1);
                    else
                        model[i] = model[i].join(this.seperator[1]);

            return model.join(this.seperator[0]);
        };

        return constructor;
    }

}).apply(this);
