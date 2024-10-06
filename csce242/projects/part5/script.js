const toggle = document.querySelector('#toggle-nav');

toggle.onclick = () => {
	const navItems = document.getElementById('nav-items');
	navItems.classList.toggle('hidden-small');
};

class GroceryItemDetails {
	constructor(store, deal, exp) {
		this.store = store;
		this.deal = deal;
		this.exp = exp;
	}

	get list() {
		const a = document.createElement('a');
		a.href = 'item.html';
		const ul = document.createElement('ul');

		const appendLi = content => {
			const li = document.createElement('li');
			li.innerHTML = content;
			ul.append(li);
		};
		appendLi(this.store);
		appendLi(this.deal);
		appendLi(this.exp);

		a.append(ul);
		return a;
	}
}

const groceryItems = document.getElementsByClassName('grocery-item');
for (const groceryItem of groceryItems) {
	const itemDetails = document.createElement('div');
	itemDetails.classList.add('item-details', 'hidden');

	const allLists = [
		new GroceryItemDetails('Walmart', 'Buy 1, Get 1 Free', 'Exp. 11/1/24').list,
		new GroceryItemDetails('Food Lion', '50% Off', 'Exp. 1/1/25').list,
		new GroceryItemDetails('Aldi', 'Buy 3, Get 1 50% Off', 'Exp. 1/1/25').list
	];

	itemDetails.append(...allLists);

	groceryItem.append(itemDetails);

	groceryItem.onclick = e => {
		if ((e.target.tagName === 'A' && !e.target.classList.contains('grocery-item')) || e.target.tagName === 'UL' || e.target.tagName === 'LI') return; // Go to item details page as normal

		// The image was clicked and the details should be toggled
		e.preventDefault();

		if (itemDetails.classList.contains('hidden')) {
			itemDetails.classList.remove('hidden');
			groceryItem.style.marginBottom = `${allLists.length * 35}px`;
			groceryItem.style.outlineBottom = 'none';
		}
		else {
			itemDetails.classList.add('hidden');
			groceryItem.style.marginBottom = '0px';
		}
	};
}