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

        /**
         * Submit form
         * @param {event} event 
         */
        _onSubmit(event) {
            event.preventDefault();
            
            
            let url = this.$el.querySelector("input[type='URL']").value;
            let anchor = this.$el.querySelector("input[type='text']").value;
            
            let formSubmit = new CustomEvent('formSubmit', {bubbles: true, detail: {url: url, anchor: anchor}});

            if (url && anchor) {
                console.log(`form submitted, url: ${url}, anchor: ${anchor}`);
                this.$el.dispatchEvent(formSubmit);
                };
        }
    };


    //export
    window.Form = Form;
})();