class Model {
	constructor(service) {
		this.serviceName = service;
		this.serviceData = services[service];
		this.hinnaklass = Object.keys(this.serviceData)[0];

		this.formData = {};
		this.calculatorData = {};

		this.setFormData();
		this.setServicePriceClass();
		this.setCalculatorData();
	}

	setCalculatorData() {
		this.calculatorData.intress = this.serviceData[this.hinnaklass].intress;
		this.calculatorData.lepingutasu = this.serviceData[this.hinnaklass].lepingutasu;
		this.calculatorData.igakuineHaldustasu = this.serviceData[this.hinnaklass].igakuineHaldustasu;
		this.calculatorData.periood = this.formData.periood;
		let calculationResults = this.calculateMonthlyFeeAndTotalCost();
		this.calculatorData.projektiMaksumus = calculationResults[0];
		this.calculatorData.kuumakse = calculationResults[1];
	}

	setFormData() {
		this.formData.summa = this.serviceData.krediidisummaVaikevaartus;
		this.formData.periood = this.serviceData.perioodiVaikevaartus;
		this.formData.sissemakse = 0;
	}

	update(service) {
		this.serviceName = service;
		this.serviceData = services[service];
		this.setFormData();
		this.setServicePriceClass();
		this.setCalculatorData();
	}

	setServicePriceClass() {
		let hinnaKlass = {};
		let hks = Object.keys(this.serviceData).filter((name) => name.includes('hinnaklass'));
		hks.forEach(
			(hinnaklass) => (hinnaKlass[hinnaklass] = Object.values(this.serviceData[hinnaklass].krediidisumma))
		);
		this.hinnaklassid = hinnaKlass;
		this.hinnaklass = Object.entries(hinnaKlass).filter(
			(entry) => entry[1][0] <= this.formData.summa && entry[1][1] >= this.formData.summa
		)[0][0];
	}

	updateFormData(property, value) {
		this.formData[property] = value;
		this.setServicePriceClass();
		this.setCalculatorData();
	}

	calculateMonthlyFeeAndTotalCost() {
		// Equation sources:
		// https://www.calculatorsoup.com/calculators/financial/loan-calculator.php
		// https://www.calculatorsoup.com/calculators/financial/amortization-schedule-calculator.php?actions=update&ipv=8,000.00&inper=60&iper=12&irate=7.9
		// https://www.wolframalpha.com/input/?i=%288000*%280.079%2F12%29*%281%2B%280.079%2F12%29%29%5E60%29%2F%28%281%2B%280.079%2F12%29%29%5E60-1%29

		let periods = this.formData.periood;
		let interestRate = this.calculatorData.intress;
		let i = interestRate / 100 / 12;
		let loanAmount = this.formData.summa;
		let contractFee = this.calculatorData.lepingutasu;
		let firstContribution = this.formData.sissemakse;
		let monthlyAdministrativeCharge = this.calculatorData.igakuineHaldustasu;
		let monthlyFee =
			(loanAmount - firstContribution) * i * (1 + i) ** periods / ((1 + i) ** periods - 1) +
			monthlyAdministrativeCharge;
		let total = monthlyFee * periods + contractFee;
		return [ (Math.round(total * 10) / 10).toFixed(2), (Math.round(monthlyFee * 10) / 10).toFixed(2) ];
	}
}
