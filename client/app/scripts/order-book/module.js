'use strict';

require("./styles.scss");

import angular from 'angular';
import OrderBookController from './controller';
import OrderBookDirective from './directive';

let module = angular.module('order-book', []);

module.controller("OrderBookController", OrderBookController);

module.directive("orderBook", OrderBookDirective);

export default module;