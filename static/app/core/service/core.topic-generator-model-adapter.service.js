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

        this.normalize = function(context, entityName, id, action) {
            /*[context, entityName, [id], [action]]*/
            var model = [
                context,
                entityName,
                [],
                []
            ];

            if (id)
                if ("string" === typeof id || "number" === typeof id)
                    model[2].push(id);
                else if (Array.isArray(id))
                for (var i = 0; i < id.length; i++)
                    model[2].push(id[i]);

            if (action)
                if ("string" === typeof action)
                    if (this.acceptedActions.indexOf(action) > -1)
                        model[3].push(action);
                    else
                        model[3] = this.acceptedActions;
            else if (Array.isArray(action))
                model[3] = action
                .filter(function(value, index, self) {
                    return /*unique*/ index === self.indexOf(value) && /*accepted*/ this.acceptedActions.indexOf(value) > -1;
                }.bind(this))
                .sort()
                .map(function(value) {
                    return value.toLowerCase()
                });

            return model;
        };

        /**
         * parse
         * @author touhid.alam <tua@selise.ch>
         * @returns {object} server accepted format
         */
        this.parse = function(model) {
            var aoo = [];

            if (!model.id) {
                aoo.push({
                    "Context": model.entityName
                });
            } else if ("string" === typeof model.id || "number" === typeof model.id) {
                if (model.action && model.action.length > 0) {
                    for (var i = 0; i < model.action.length; i++) {
                        aoo.push({
                            "Context": model.entityName,
                            "Value": model.id,
                            "ActionName": model.action[i]
                        });
                    }
                }
            } else {
                for (var i = 0; i < model.id.length; i++) {
                    if (model.action && model.action.length > 0) {
                        for (var j = 0; j < model.action.length; j++) {
                            aoo.push({
                                "Context": model.entityName,
                                "Value": model.id[i],
                                "ActionName": model.action[j]
                            });
                        }
                    } else {
                        aoo.push({
                            "Context": model.entityName,
                            "Value": model.id[i],
                        });
                    }
                }
            }

            return aoo;
        }
    }

})
.apply(this);
