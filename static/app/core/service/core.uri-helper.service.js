(function() {
    "use strict";

    var module = angular.module("app.core");

    module.service("uriHelper", constructor);

    constructor.$inject = [];

    function constructor() {
        this.encodeQSComponent = function(attribute, value) {
            value = "object" === typeof value ?
                window.encodeURIComponent(JSON.stringify(value)) :
                window.encodeURIComponent(value);
            return ([attribute, value].join("="));
        };

        this.composeQSFromKeyValues = function(queryKeyVals) {
            if (!queryKeyVals)
                return "";

            var keys = Object.keys(queryKeyVals),
                qs = [];
            for (var i = 0; i < keys.length; i++)
                qs.push(this.encodeQSComponent(keys[i], queryKeyVals[keys[i]]));

            return qs.join("&");
        };

        this.composeURI = function(path, qs) {
            return path + "?" + qs;
        }

        this.isHTTPS = function(path) {
            new URL(path)
                .protocol.indexOf("https") === 0;
        }
    }

})
.apply(this);
