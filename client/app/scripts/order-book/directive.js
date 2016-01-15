'use strict';

import angular from 'angular';
import OrderBookController from './controller';
var template = require("./template.html");

export default () => {
    // directive definition docs: https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object
    return {
        restrict: "E",
        scope: {},
        template: template,
        controller: OrderBookController,
        controllerAs: "controller"
    }
};