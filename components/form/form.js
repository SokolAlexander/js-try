'use strict';

(function(){

    /**
     * class representing a form for data input
     */
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
         * render a form, call function to make an error
         */
        render() {
            this.$el.innerHTML = `<form><table class="form-wrapper"><tr>
                                  <td><input type="number" placeholder="amount of money"></td>
                                  <td><input type="text" placeholder="comment (unnessecary)">
                                  </td></tr></table></form><div class="error"></div>`;
            this._makeError();            
        }

        /**
         * initialise event listeners
         */
        _initEvents() {
            this.$el.addEventListener('submit', this._onSubmit.bind(this));
        }

        /**
         * prevent form from submitting
         * @param {event} event 
         */
        _onSubmit(event) {
            event.preventDefault();
        }
		
		/**
		*Get data from form if there is an amount, call _showWarning otherwise
		*@param {Object}
		*@return {Object}
		*/
		getData(item) {
            let amount = this.$el.querySelector("input[type='number']").value;
            let comment = this.$el.querySelector("input[type='text']").value;
			
			if (!amount) {
				this._showWarning();
				return false;
			}
			
			this._hideWarning();
            this.$el.querySelector('form').reset();
			
			return {category: item.category,
					amount: amount,
                    comment: comment}
		}
        
        /**
         * create warning requesting an amount
         */
        _makeError() {
            this.error = this.$el.querySelector('.error');
            this.error.innerHTML = 'Enter a number';
        }

		/**
		*Show the warning requesting an amount
		*/
		_showWarning() {
			this.error.classList.add('display-error');
		}
        
        /**
         * hide the warning requesting an amount
         */
		_hideWarning() {
			this.error.classList.remove('display-error');
			}
		}
		
    //export
    window.Form = Form;
})();