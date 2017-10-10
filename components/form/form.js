'use strict';

(function(){

    class Form {

        /**
         * create a form
         * @param {HTMLElement}  
         */
        constructor($el) {
            this.$el = $el;
            this.render();
            this._initEvents();
        }

        /**
         * render a form
         */
        render() {
            this.$el.innerHTML = `<form><input type="url" placeholder="URL"><input type="text" placeholder="anchor">
                                  <input type="submit" value="click!"></form>`;
        }

        /**
         * initialize event listeners
         */
        _initEvents() {
            this.$el.addEventListener('submit', this._onSubmit.bind(this));
        }

        _onSubmit(event) {
            event.preventDefault();
            let url = this.$el.querySelector("input[type='URL']").value;
            let anchor = this.$el.querySelector("input[type='text']").value;

            if (url && anchor) console.log(`form submitted, url: ${url}, anchor: ${anchor}`);
        }
    };


    //export
    window.Form = Form;
})();