const getShoes = async () => {
	const url = 'https://portiaportia.github.io/json/shoes.json';

	try {
		const response = await fetch(url);
		return response.json();
	}
	catch (error) {
		console.log(error);
	}
};

const getShoeSection = shoe => {
	const section = document.createElement('section');

	const h3 = document.createElement('h3');
	h3.innerHTML = shoe.name;
	section.append(h3);

	const p = document.createElement('p');
	p.innerHTML = shoe.brand;
	section.append(p);

	const ul = document.createElement('ul');
	shoe.reviews.forEach(review => {
		const li = document.createElement('li');
		li.innerHTML = review;
		ul.append(li);
	});
	section.append(ul);

	return section;
};

const showShoes = async () => {
	const shoes = await getShoes();
	shoes.forEach(shoe => {
		document.getElementById('shoes-section').append(getShoeSection(shoe));
	});
};

// show all shoes when page loads
showShoes();