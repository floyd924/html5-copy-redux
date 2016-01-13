'use strict';

var module = angular.module('bitcoinExchange', ['order-book']);

// Sourced from http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
module.factory('socket', function ($rootScope) {
    var socket = io.connect("http://localhost"); // this should match the port your server opens to websocket traffic
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});