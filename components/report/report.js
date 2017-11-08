'use strict';

(function() {
	
	class Report {
		
		constructor($el) {
			this.$el = $el;

			this._initEvents();

		}

		_initEvents() {
			this.$el.addEventListener('click', this._onClick.bind(this));
			this.$el.addEventListener('mouseOver', this._onHover.bind(this));
		} 

		// _onClick(e) {
		// 	console.log(e.target);
		// }

		// _onHover(e) {
		// 	if (e.target.classList.contains('pie')) {
		// 		console.log(e.target);
		// 	}
		// }
		
		setData(data) {
			this.data = data;
			this._makePie(data);
			
			this.isRendered = true;
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

		_makePie(repData) {	

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

		_makePieLegend(colours, repData, percents) {
			
			let $legendEl = document.querySelector('.js-pie-legend');
			if ($legendEl) this.$el.removeChild($legendEl);
			
			$legendEl = document.createElement('div');
			$legendEl.classList.add('pie-legend', 'js-pie-legend');
			this.$el.appendChild($legendEl);
			
			let categs = Object.keys(repData);
			let res = '';
			for (let i = 0; i < categs.length; i++) {
			res += `<div style='background-color: #${colours[i]};'>
			</div><span>${categs[i]}</span> 
			<span>${repData[categs[i]]} 
			(${(this._getPercents(repData)[i]*100).toFixed(2)}%)</span>`;
			}
			$legendEl.innerHTML = res;
		}
	}
	
	window.Report = Report;
})();