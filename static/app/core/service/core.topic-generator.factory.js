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
        var constructor = function(divider) {
            if (!divider)
                throw "[TopicGenerator] :: divider must be defined";

            this.divider = divider;
        }

        constructor.prototype.generate = function(model) {
            if (!model)
                throw "[topicGeneratorService] :: model must be defined";

            for (var i = 0; i < model.length; i++)
                if (Array.isArray(model[i]))
                    if (model[i].length === 0)
                        model.splice(i, 1);
                    else
                        model[i] = model[i].join(this.divider[1]);

            return model.join(this.divider[0]);
        };

        return constructor;
    }

}).apply(this);
