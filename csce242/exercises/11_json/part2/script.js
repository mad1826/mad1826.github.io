const getBreweries = async () => {
	const url = 'https://api.openbrewerydb.org/breweries';

	try {
		const response = await fetch(url);
		return response.json();
	}
	catch (error) {
		console.log(error);
	}
};

const getSection = brewery => {
	const section = document.createElement('section');

	const h3 = document.createElement('h3');
	h3.innerHTML = brewery.name;
	section.append(h3);

	const p = document.createElement('p');
	p.innerHTML = brewery.brewery_type;
	section.append(p);

	const div = document.createElement('div');
	div.style.width = '100%';
	div.innerHTML = `<iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${encodeURIComponent(brewery.street)},%${encodeURIComponent(brewery.city)},%${brewery.country}+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps systems</a></iframe>`;
	section.append(div);

	return section;
};

const showBreweries = async () => {
	const breweries = await getBreweries();
	breweries.forEach(shoe => {
		document.getElementById('breweries-section').append(getSection(shoe));
	});
};

// show all shoes when page loads
showBreweries();