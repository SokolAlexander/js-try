'use strict';

(function() {
	
	class Report {
		
		constructor($el) {
			this.$el = $el;

			this._initEvents();

		}

		_initEvents() {
			this.$el.addEventListener('click', this._onClick.bind(this));
		} 

		_onClick(e) {
			console.log(e.target);
		}
		
		setData(data) {
			this.data = data;
			this.render();
			
			this.isRendered = true;
		}
		
		render() {
			let repString = '<ul>';
			
			for (let key in this.data) {
				repString += '<li>' + key + ': ' + this.data[key] + '</li>';
			}
			
			this.$el.innerHTML = repString + 
				'</ul><div class="show-pie js-show-pie"></div>';
		}


		_getPercents(data) {

			let total = 0;
			for (let key in data) {
				total += data[key];
			}
			
			let percents = [];
			let i = 0;
			for (let key in data) {
				percents[i] = +(data[key]/total).toFixed(3);
				i++;
			};

			return percents;
		}

		_getDegrees(percent) {
			console.log(360*percent + 90.0);
			return 360*percent + 90;
		}

		makePie(repData) {	

			console.log(repData);
			let $pieEl = document.querySelector('.js-pie');
			let percents = this._getPercents(repData);
			console.log(percents);
			
			let colour = 'AFC';
			let rotation = 0;
			let zIndex = 200;

			for (let i = 0; i < percents.length; i++) {

				let newDiv = document.createElement('div');
				newDiv.style.backgroundColor = '#' + colour;
				newDiv.classList.add('pie-elem');

				if (percents[i] > 0.25) {
					let additItem = percents[i] - 0.25;
					percents[i] = 0.25;
					percents.splice(i+1, 0, additItem)
					} else {
						colour = (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1,6); 
						};

				let sector = this._getDegrees(percents[i]);

				newDiv.style.transform = 'rotateZ(' + rotation + 'deg) skewY(' + (sector + 1) + 'deg)';
				
				newDiv.style.zIndex = zIndex - 1;

				rotation += sector - 90;

				newDiv.classList.add('sector');
				$pieEl.appendChild(newDiv);
				
			};
			
			console.log(percents);
		
			
		}
	}
	
	window.Report = Report;
})();