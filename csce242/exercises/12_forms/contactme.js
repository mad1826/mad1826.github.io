const sendEmail = async (json, result) => {
	try {
		const response = await fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		});

		return response;
	}
	catch (error) {
		console.log(error);
		result.innerHTML = 'Sorry, your email couldn\'t be sent';
	}
};

document.getElementById('contact-form').onsubmit = async e => {
	e.preventDefault();

	const form = e.target;
	const formData = new FormData(form);
	const obj = Object.fromEntries(formData);
	const json = JSON.stringify(obj);

	const result = document.getElementById('result');
	result.innerHTML = 'Sending...';

	const httpResult = await sendEmail(json, result);

	if (httpResult.status === 200) {
		result.innerHTML = 'Email successfully sent';
	}
	else {
		result.innerHTML = 'Sorry, your email wasn\'t sent';
	}
};