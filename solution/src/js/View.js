class View {
	constructor() {
		//form data
		this.sum = document.querySelector('#summa');
		this.periood = document.querySelector('#periood');
		this.quantity = document.querySelector('#sissemakse');
		this.sumMin = document.querySelector('#slider-left');
		this.sumMax = document.querySelector('#slider-right');
		this.sliderDefault = document.querySelector('.slider');
		this.range = document.querySelector('.range');
		this.bubble = document.querySelector('.bubble');
		this.sissemakse = document.querySelector('#sissemakse');

		//summary data
		this.intress = document.querySelector('#intress');
		this.lepingutasu = document.querySelector('#lepingutasu');
		this.igakuineHaldustasu = document.querySelector('#igakuineHaldustasu');
		this.perioodSummary = document.querySelector('#perioodSummary');
		this.projektiMaksumus = document.querySelector('#projektiMaksumus');
		this.kuumakse = document.querySelector('#kuumakse');
	}

	update(property, value) {
		if (property == 'periood') {
			property = 'perioodSummary';
		}
		if (
			property == 'lepingutasu' ||
			property == 'igakuineHaldustasu' ||
			property == 'projektiMaksumus' ||
			property == 'kuumakse'
		) {
			this[property].innerHTML = value + '&nbsp;€';
		} else if (property == 'perioodSummary') {
			this[property].innerHTML = value + '&nbsp;kuud';
		} else {
			this[property].innerHTML = value + '&nbsp;%';
		}
	}

	updateService(service, minPrice, maxPrice, defaultCreditAmount, period, minPeriod, maxPeriod, summa) {
		this.sissemakse.value = 0;
		this.updateFormDefaults(minPrice, maxPrice, defaultCreditAmount, period, minPeriod, maxPeriod, summa);
	}

	updateSlider(value) {
		let v = (value - this.sumMin.innerHTML) / (this.sumMax.innerHTML - this.sumMin.innerHTML) * 100;
		this.sum.style.background =
			'linear-gradient(to right, #3db336 0%, #3db336 ' + v + '%, #ace0ab ' + v + '%, #ace0ab 100%)';
		this.sissemakse.max = value;
	}
	updateSummary(data) {
		Object.entries(data).forEach((entry) => this.update(entry[0], entry[1]));
	}

	updateFormDefaults(minPrice, maxPrice, defaultCreditAmount, period, minPeriod, maxPeriod, summa) {
		this.sum.min = minPrice;
		this.sum.max = maxPrice;
		this.sum.value = defaultCreditAmount;
		this.sumMin.innerHTML = minPrice;
		this.sumMax.innerHTML = maxPrice;
		this.quantity.max = summa;
		this.periood.value = period;
		this.sliderDefault.value = summa;

		while (this.periood.firstChild) {
			this.periood.removeChild(this.periood.lastChild);
		}

		for (let i = minPeriod; i <= maxPeriod; i++) {
			let option = document.createElement('option');
			option.value = i;
			option.text = i + ' kuud';
			if (i == period) {
				option.selected = true;
			}
			view.periood.appendChild(option);
			i += 5;
		}
	}
	setBubble() {
		const val = this.range.value;
		const min = this.range.min;
		const max = this.range.max;
		var clientWidth = this.range.clientWidth;
		let pixelPostion = clientWidth * val / max + 22 * (1 - val / max);
		this.bubble.value = val + ' €';
		this.bubble.style.left = pixelPostion + 'px';
	}
}
