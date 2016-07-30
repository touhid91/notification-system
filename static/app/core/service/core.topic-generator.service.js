(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("topicGeneratorService", constructor);

    constructor.$inject = [];

    function constructor() {
        /**
         * @function generate
         * @param {heterogeneous array} model
         * @param {linear array} divider
         * @returns {string} topic
         */
        this.generate = function(model, divider) {
            if(!model)
                throw "model must be defined";

            if(!divider)
                throw "divider must be defined";

            for (var i = 0; i < model.length; i++)
                if (Array.isArray(model[i]))
                    model[i] = model[i].join(divider[1]);

            return model.join(divider[0]);
        };
    }

}).apply(this);
