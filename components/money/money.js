(function() {

    class MoneyLeft {

        constructor($el) {
            this.$el = $el;
        }

        setAmount(amnt) {
            this._amount = amnt;
        }

        render() {
            this.$el.innerHTML = this._amount;
        }
    };

    window.MoneyLeft = MoneyLeft;
})();