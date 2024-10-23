document.getElementById('form-raccoon').onsubmit = ev => {
	ev.preventDefault();

	const form = ev.target;

	const raccoonName = form.elements['raccoon-name'].value;
	const demeanor = form.elements['demeanor'].value;
	// const termsChecked = form.elements['terms'].checked;
	const size = getRadioValue('size');

	console.log(`${raccoonName} is ${size} sized and has a ${demeanor} demeanor`);
};

const getRadioValue = radioName => {
	const radios = document.getElementsByName(radioName);

	for (const radio of radios) {
		if (radio.checked) return radio.value;
	}

	return '';
};