/**
 *   Qty increment-decrement functionality
 *
 *   @param {String} plusSelector - selector for plus button
 *   @param {String} minusSelector - selector for minus button
 *   @param {String} inputSelector - selector for input qty
 */

define(["jquery"], function ($) {
    "use strict";

    $.widget("mage.minicartUpdateQty", {
        options: {
            plusSelector: '[data-update-qty="plus"]',
            minusSelector: '[data-update-qty="minus"]',
            updateSelector: '[data-update-qty="update"]',
            inputSelector: '[data-update-qty="input"]',
            qtyIncrement: "data-qty-increment",
            isGrouped: false,
        },

        /**
         * Widget initialization
         * @private
         * @returns {void}
         */
        _create: function () {
            var self = this,
                qty = self.element,
                plusButton = qty.find(self.options.plusSelector),
                minusButton = qty.find(self.options.minusSelector),
                updateButton = qty.find(self.options.updateSelector);

            self.inputQty = qty.find(self.options.inputSelector);

            plusButton.on("click", function () {
                self.increment();
                self.toogleInputChange();
            });

            plusButton.on("keydown", function (e) {
                switch (e.keyCode) {
                    case 13:
                        if (!self._checkIsDisableInput(self.inputQty)) {
                            self.increment();
                        }

                        break;
                    default:
                        break;
                }
            });

            minusButton.on("click", function () {
                self.decrement();
                self.toogleInputChange();
            });

            minusButton.on("keydown", function (e) {
                switch (e.keyCode) {
                    case 13:
                        if (!self._checkIsDisableInput(self.inputQty)) {
                            self.decrement();
                        }

                        break;
                    default:
                        break;
                }
            });
        },

        /**
         * Increment input value
         * @returns {void}
         */
        increment: function () {
            if (this.getProductQtyIncrements()) {
                var value =
                    parseInt(this.inputQty.val()) +
                    parseInt(this.getProductQtyIncrements());
                this.inputQty.val(value);
                return;
            }
            var value = this.inputQty.val();

            this.inputQty.val(++value);
        },

        /**
         * Decrement input value
         * @returns {void}
         */
        decrement: function () {
            var minQty = this.isGrouped() ? 0 : 1;
            if (this.getProductQtyIncrements()) {
                var value =
                    parseInt(this.inputQty.val()) -
                    parseInt(this.getProductQtyIncrements());
                    if (value > minQty) {
                        this.inputQty.val(value);
                    }
                return;
            }

            var value = this.inputQty.val();


            if (value > minQty) {
                this.inputQty.val(--value);
            }
        },
        getProductQtyIncrements: function () {
            if (
                typeof this.inputQty.attr(this.options.qtyIncrement) !==
                    "undefined" &&
                this.inputQty.attr(this.options.qtyIncrement) !== false
            ) {
                return this.inputQty.attr(this.options.qtyIncrement);
            }
            return false;
        },
        /**
         * @return {boolean}
         */
        isGrouped: function () {
            return this.options.isGrouped;
        },

        /**
         * @returns {void}
         */
        toogleInputChange: function () {
            this.inputQty.trigger("change");
        },

        /**
         * Check input is disabled or not
         *
         * @param {Object} [input]
         * @private
         * @returns {boolean}
         */
        _checkIsDisableInput: function (input) {
            return !!input.prop("disabled");
        },
    });
});
