// "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"

const colors = [];
colors['Cocktail'] = 'Orange';
colors['Ordinary Drink'] = '#cbcdb5';
colors['Punch / Party Drink'] = 'Red';
colors['Shake'] = 'beige';
colors['Other / Unknown'] = 'yellow';
colors['Cocoa'] = 'brown';
colors['Shot'] = 'blue';
colors['Coffee / Tea'] = 'brown';
colors['Homemade Liqueur'] = 'black';
colors['Beer'] = 'red';
colors['Soft Drink'] = 'green';

const getCategories = async () => {
	const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

	try {
		const response = await fetch(url);
		return response.json();
	}
	catch (error) {
		console.log(error);
	}
};

const getDrinks = async category => {
	const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

	try {
		const response = await fetch(url);
		return response.json();
	}
	catch (error) {
		console.log(error);
	}
};

const createNav = async () => {
	const categories = await getCategories();
	const nav = document.getElementById('cat-nav');

	const getAllDrinks = async category => {
		document.getElementById('current-cat').innerHTML = `Category: ${category}`;
		const cocktails = document.getElementById('cocktails');
		cocktails.innerHTML = '';
		const drinks = await getDrinks(category);

		drinks.drinks.forEach(drink => {
			const div = document.createElement('div');
			div.classList.add('drink');
			div.style.border = `5px solid ${colors[category]}`;

			const p = document.createElement('p');
			const a = document.createElement('a');
			a.href = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`;
			a.target = 'blank';
			a.innerHTML = drink.strDrink;
			p.append(a);
			div.append(p);

			const img = document.createElement('img');
			img.src = drink.strDrinkThumb;
			div.append(img);

			cocktails.append(div);
		});
	};

	categories.drinks.forEach(cat => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = '#';
		a.innerHTML = cat.strCategory;

		a.onclick = async ev => {
			ev.preventDefault();
			getAllDrinks(cat.strCategory);
		};

		li.append(a);
		nav.append(li);
	});

	const createRandomBtn = () => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = '#';
		a.innerHTML = 'Random';
		li.id = 'random-btn';

		const getRandomCat = () => {
			return categories.drinks[Math.floor(categories.drinks.length * Math.random())].strCategory;
		};

		a.onclick = ev => {
			ev.preventDefault();
			getAllDrinks(getRandomCat());
		};

		li.append(a);
		nav.append(li);
	};

	createRandomBtn();
};

createNav();