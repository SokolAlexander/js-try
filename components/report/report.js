'use strict';

(function() {
	
	/**
	 * class representing a report
	 */
	class Report {
		
		/**
		 * create a report
		 * @param {HTMLElement}  
		 */
		constructor($el) {
			this.$el = $el;
		}

		/**
		 * set data of a report and call makePie
		 * @param {Object} data 
		 */
		setData(data) {
			this.data = data;
			this._makePie();
		}
		
		/**
		 * get percents of each category, and compute total
		 * @param {Object} data 
		 * @returns {Array of numbers}
		 */
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

		/**
		 * get degrees of skewing for pie element
		 * @param {number} percent 
		 * @returns {number}
		 */
		_getDegrees(percent) {
			return 360*percent + 90;
		}

		/**
		 * draw a pie diagram
		 * @param {Object} repData 
		 */
		_makePie() {
			let repData = this.data;	

			let $pieEl = document.createElement('div');
			$pieEl.classList.add('pie', 'js-pie');
			this.$el.appendChild($pieEl);
			
			let percents = this._getPercents(repData);
			if (!percents.length) {
				this.$el.innerHTML = '';
				return;
				};
			
			let colour = 'AFC';
			let colours = [colour];
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
					colours.push(colour);
				};

				let sector = this._getDegrees(percents[i]);

				newDiv.style.transform = 'rotateZ(' + rotation + 'deg) skewY(' + (sector + 0.5) + 'deg)';
				
				newDiv.style.zIndex = zIndex + 1;

				rotation += sector - 90;

				newDiv.classList.add('sector');
				$pieEl.appendChild(newDiv);
			};
			
		this._makePieLegend(colours, repData, percents);
		}

		/**
		 * draw a legend for pie
		 * @param {Array of colours in RRGGBB format} colours 
		 * @param {Object} repData 
		 * @param {Array of numbers} percents 
		 */
		_makePieLegend(colours, repData, percents) {
			
			let $legendEl = document.querySelector('.js-pie-legend');
			if ($legendEl) this.$el.removeChild($legendEl);
			
			$legendEl = document.createElement('div');
			$legendEl.classList.add('pie-legend', 'js-pie-legend');
			this.$el.appendChild($legendEl);
			
			let total = 0;
			let categs = Object.keys(repData);
			let res = '';
			for (let i = 0; i < categs.length; i++) {
			res += `<div style='background-color: #${colours[i]};'>
			</div><span>${categs[i]}:</span> 
			<span>${repData[categs[i]]} 
			(${(this._getPercents(repData)[i]*100).toFixed(2)}%)</span>`;
			total += +repData[categs[i]];
			}

			res += `<div class='total'>
			Total: ${total}</div>`
			$legendEl.innerHTML = res;
		}
	}
	
	window.Report = Report;
})();