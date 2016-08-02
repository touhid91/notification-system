(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("uriHelper", constructor);

    constructor.$inject = [];

    function constructor() {
        this.encodeQSComponent = function(attribute, value) {
            value = "object" === typeof value
                ? window.encodeURIComponent(JSON.stringify(value))
                : window.encodeURIComponent(value);
            return ([key, value].join("="));
        };

        this.composeQSFromKeyValues = function(queryKeyVals) {
            if (!queryKeyVals)
                return "";

            var qs = [];
            for (var i = 0; i < queryKeyVals.length; i++)
                qs.push(this.encodeQSComponent(Object.keys(queryKeyVals)[i], queryKeyVals)[i]);

            return qs;
        };

        this.composeURI = function(path, qs) {
            return path + "?" + qs;
        }
    }

}).apply(this);
