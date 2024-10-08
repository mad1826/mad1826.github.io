const url = 'https://portiaportia.github.io/json/ice-creams.json';

const getURL = async () => {
	try {
		const response = await fetch(url);
		return response.json();
	}
	catch (error) {
		console.log(error);
	}
};

const getSection = iceCream => {
	const section = document.createElement('section');

	const container = document.createElement('div');
	container.classList.add('img-container');
	const img = document.createElement('img');
	img.src = `https://portiaportia.github.io/json/images/ice-creams/${iceCream.image}`;
	container.append(img);

	const overlay = document.createElement('div');
	overlay.classList.add('overlay');

	/*
	const p = document.createElement('p');
	p.innerHTML = iceCream.name;
	overlay.append(p);
	*/
	overlay.innerHTML = iceCream.name;

	container.append(overlay);

	section.append(container);

	return section;
};

const showIceCreams = async () => {
	const iceCreams = await getURL();

	iceCreams.forEach(iceCream => {
		document.getElementById('container').append(getSection(iceCream));
	});
};

showIceCreams();