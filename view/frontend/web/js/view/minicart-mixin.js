
 define([
], function () {
    'use strict';

    return function (Component) {
        return Component.extend({

            /**
             * @override
             */
            initialize: function () {
                var self = this;
                console.log('module')
                return this._super();
            },
        });
    }
})
