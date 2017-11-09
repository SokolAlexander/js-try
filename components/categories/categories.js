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
		*@param {boolean} leftOrRight
		*/
        constructor($el, categs, lr) {
            this.$el = $el;
			this._plusMinus = lr;
			this.moveRight();

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
		 * move categories right (show left one, hide the right one)
		 * @return {boolean} position of elements
		 */
		moveRight() {
			this.$el.classList.add(this._plusMinus ? 'left' : 'right-hidden');
			this.$el.classList.remove(this._plusMinus ? 'left-hidden' : 'right');
			return false;
		}

		/**
		 * move categories right (show right one, hide the left one)
		 * @return {boolean} position of elements
		 */
		moveLeft() {
			this.$el.classList.add(this._plusMinus ? 'left-hidden' : 'right');
			this.$el.classList.remove(this._plusMinus ? 'left' : 'right-hidden');
			return true;			
		}
		
		/**
		*Get list of categories in a form of table rows/cells
		*return {string}
		*/
		_getList() {
			return this.categs.reduce((res, item) => res += `<tr><td>${item}<div class="delete-cat"></div></td></tr>`,'')
		}

        _initEvents() {
            this.$el.addEventListener("click", this._onClick.bind(this));
        }

        _onClick(e) {
			if (e.target.classList.contains('js-add')) {
				this.addCategory()
				} else if (e.target.classList.contains('delete-cat')) {
					//console.log(e.target.parentNode.innerHTML);
					this.deleteCat(e.target.parentNode);
						} else if (e.target.tagName === "TD") {
						let category = this._getCategName(e.target);
						let pickCategory = new CustomEvent('pickCategory', 
							{bubbles: true, detail: {category: category}});
						this.$el.dispatchEvent(pickCategory)};
			}
		
		addCategory() {
			let newCat = prompt('New Category Name?', '');
			if (newCat) this.categs.push(newCat);
			this.render();
		}
		
		_getCategName(item) {
			let i = item.innerHTML.indexOf('<');
			return item.innerHTML.slice(0, i);
		}
		
		deleteCat(item) {
			let categName = this._getCategName(item);
			this.categs = this.categs.filter((itemC, index) => {
				return itemC !== categName});
			this.render();
		}
    };

    window.Categories = Categories;
})();