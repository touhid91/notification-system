(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("topicGeneratorModelAdapter", constructor);

    constructor.$inject = [];

    function constructor() {
        this.acceptedActions = [
            "create",
            "delete",
            "modify",
            "view"
        ];

        this.adapt = function(context, entityName, id, action) {
            var model = {
                context: context,
                root: entityName,
                id: id,
                actions: []
            };

            if (typeof action === "string")
                if (this.acceptedActions.indexOf(action) > -1)
                    model.actions.push(action);
                else
                    model.actions = this.acceptedActions;
            else if (Array.isArray(action))
                model.actions = action
                .filter(function(value, index, self) {
                    return self.indexOf(value) === index;
                })
                .sort()
                .map(function(value) {
                    return value.toLowerCase()
                });

            return model;
        }
    }

}).apply(this);
