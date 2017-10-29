'use strict';

(function(){

    class Form {

        /**
         * create a form
         * @param {HTMLElement}  
         */
        constructor($el) {
            this.$el = $el;
            this._initEvents();
        }

        /**
         * render a form
         */
        render() {
            this.$el.innerHTML = `<form><table class="form-wrapper"><tr><td><input type="number" placeholder="amount of money"></td>
                                  <td><input type="text" placeholder="comment (unnessecary)">
                                  </td></tr></table></form>`;
        }

        /**
         * initialise event listeners
         */
        _initEvents() {
            this.$el.addEventListener('submit', this._onSubmit.bind(this));
        }

        /**
         * Submit form
         * @param {event} event 
         */
        _onSubmit(event) {
            event.preventDefault();
            debugger;
            
            let url = this.$el.querySelector("input[type='URL']").value;
            let anchor = this.$el.querySelector("input[type='text']").value;
            
            let formSubmit = new CustomEvent('formSubmit', {bubbles: true, detail: {url: url, anchor: anchor}});

            if (url && anchor) {
                console.log(`form submitted, url: ${url}, anchor: ${anchor}`);
                this.$el.dispatchEvent(formSubmit);
                this.$el.querySelector('form').reset();
                };
        }
    };


    //export
    window.Form = Form;
})();