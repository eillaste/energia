class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	updateView(userChoice) {
		let minPrice = Math.min(...Object.values(model.hinnaklassid).flat());
		let maxPrice = Math.max(...Object.values(model.hinnaklassid).flat());
		let minPeriod = model.serviceData[model.hinnaklass]['periood'].min;
		let maxPeriod = model.serviceData[model.hinnaklass]['periood'].max;
		let defaultCreditAmount = model.serviceData['krediidisummaVaikevaartus'];
		let period = model.formData['periood'];
		let summa = model.formData['summa'];
		view.updateService(userChoice, minPrice, maxPrice, defaultCreditAmount, period, minPeriod, maxPeriod, summa);
		view.updateSummary(model.calculatorData);

		document.querySelectorAll("input[type='radio']").forEach((i) => (i.parentNode.style.background = '#fff'));
		document.querySelectorAll("input[type='radio']:checked")[0].parentNode.style.background = '#f6f9f9';
		//controller.changeService.bind(controller);
	}

	updateModel(userChoice) {
		model.update(userChoice);
	}

	changeService(event) {
		let userChoice = event.target.value;
		this.updateModel(userChoice);
		view.updateSlider(model.formData.summa);

		this.updateView(userChoice);
		view.setBubble();
	}

	updateSliderProgress(event) {
		var value = event.target.value;
		view.updateSlider(value);
	}

	changeProperty(event) {
		if (event.target.value == '') {
			event.target.value = 0;
		}
		if (event.target.id == 'sissemakse') {
			if (event.target.value >= 0 && event.target.value <= model.formData.summa) {
				document.querySelectorAll('.user_input').forEach((i) => (i.disabled = false));
				model.updateFormData(event.target.id, parseInt(event.target.value));
				view.updateSummary(model.calculatorData);
			} else {
				document.querySelectorAll('.user_input').forEach((i) => (i.disabled = true));
			}
		} else {
			model.updateFormData(event.target.id, parseInt(event.target.value));
			view.updateSummary(model.calculatorData);
		}
	}

	updateBubble() {
		view.setBubble();
	}

	thx() {
		if (document.querySelectorAll('.user_input')[0].disabled == false) {
			alert('Aitäh! :)');
		}
	}
}
