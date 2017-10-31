"use strict";

(function() {
	
	/**
	*Class representing a list of categories
	*/
    class Categories {

		/**
		*Create a table of categories
		*@param {HTMLElement} $el
		*@param {Array of strings} categs
		*@param {boolean} left/right
		*/
        constructor($el, categs, lr) {
            this.$el = $el;
			this._plusMinus = lr;
			$el.classList.add(lr ? 'left' : 'right');
			
			this.categs = categs;

            this._initEvents();
        }

		/**
		*Render a table of categories
		*/
        render() {
            this.$el.innerHTML = `<table><th>Choose a category</th>
			${this._getList()}
			<tr><td class='js-add'>+</td></tr></table>`;
        }
		
		/**
		*Get list of categories in a form of table rows/cells
		*return {string}
		*/
		_getList() {
			return this.categs.reduce((res, item) => res += `<tr><td>${item}</td></tr>`,'')
		}

        _initEvents() {
            this.$el.addEventListener("click", this._onClick.bind(this));
        }

        _onClick(e) {
			if (e.target.classList.contains('js-add')) {
				this.addCategory()
				} else if (e.target.tagName === "TD") {
					let category = e.target.innerHTML;
					let pickCategory = new CustomEvent('pickCategory', 
						{bubbles: true, detail: {category: category, sign: this._plusMinus}});
					this.$el.dispatchEvent(pickCategory)};
			}
		
		addCategory() {
			let newCat = prompt('New Category Name?', '');
			this.categs.push(newCat);
			this.render();
		}
    };

    window.Categories = Categories;
})();