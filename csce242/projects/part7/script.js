const toggle = document.querySelector('#toggle-nav');

toggle.onclick = () => {
	const navItems = document.getElementById('nav-items');
	navItems.classList.toggle('hidden-small');
};

const getURL = async url => {
	try {
		const res = await fetch(url);
		return res.json();
	}
	catch (e) {
		console.log(e);
	}
};

const getCoupons = () => {
	return getURL('https://mad1826.github.io/csce242/projects/part7/coupons.json');
};

const getCarts = () => {
	return getURL('https://mad1826.github.io/csce242/projects/part7/carts.json');
};

const getCouponImg = coupon => {
	const img = document.createElement('img');
	img.src = `images/${coupon.type}/${coupon.image}`;
	return img;
};

const createEmpty = largeOnly => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('item');
	if (largeOnly) {
		a.classList.add('large-only');
	}
	else {
		a.classList.add('small-only');
	}

	return a;
};

const createPrimaryFeatured = coupon => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('primary-featured');

	a.append(getCouponImg(coupon));

	return a;
};

const createSecondaryFeatured = coupon => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('secondary-featured');

	a.append(getCouponImg(coupon));

	const appendP = (content, className) => {
		const p = document.createElement('p');
		p.innerHTML = content;
		if (className) p.classList.add(className);
		a.append(p);
	};

	appendP(coupon.name, 'bold');

	if (coupon.deal) {
		a.append(formatDeal(coupon.prices[0], coupon.deal));
	}
	else {
		a.append(formatPrice(coupon.prices[0], coupon.prices[1]));
	}

	appendP(coupon.store.name);
	appendP(`Exp. ${coupon.expiresAt}`);

	return a;
};

const formatDeal = (price, deal) => {
	const p = document.createElement('p');

	const oldBuy = document.createElement('span');
	oldBuy.innerHTML = `$${price} - `;

	const newBuy = document.createElement('span');
	newBuy.classList.add('red');
	newBuy.innerHTML = deal;

	p.append(oldBuy, newBuy);

	return p;
};

const formatPrice = (oldPrice, newPrice, showPercent) => {
	const p = document.createElement('p');

	const oldBuy = document.createElement('span');
	oldBuy.classList.add('strikethrough');
	oldBuy.innerHTML = `$${oldPrice}`;

	const newBuy = document.createElement('span');
	newBuy.classList.add('red');
	if (showPercent) {
		const oldPriceNum = parseFloat(oldPrice.replace('/oz', ''));
		const newPriceNum = parseFloat(newPrice.replace('/oz', ''));
		const dealNum = 1 - (newPriceNum / oldPriceNum);
		newBuy.innerHTML = ` (${Math.ceil(dealNum * 100 - 1)}% off)`;
	}
	else {
		newBuy.innerHTML = ` $${newPrice}`;
	}

	p.append(oldBuy, newBuy);

	return p;
};

const formatLocation = (storeName, iframe, tagName, addClass = false) => {
	const store = document.createElement(tagName);
	if (addClass) store.classList.add('store-name');
	const location = document.createElement('a');
	location.href = '#';
	location.classList.add('open-location');
	location.innerHTML = storeName + ' &#128506';
	location.onclick = e => {
		e.preventDefault();
		const modal = document.getElementById('modal');
		modal.style.display = 'block';

		const modalContent = document.getElementById('modal-content');
		modalContent.innerHTML = '';

		const close = document.createElement('button');
		close.id = 'close-modal';
		close.innerHTML = 'X';
		close.onclick = () => {
			console.log('cilcked');
			modal.style.display = 'none';
		};
		modalContent.append(close);

		const iframeContainer = document.createElement('div');
		iframeContainer.innerHTML = iframe;
		modalContent.append(iframeContainer);
	};
	store.append(location);
	return store;
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

const createGroceryItem = (coupon, details) => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('item', 'grocery-item');

	a.append(getCouponImg(coupon));

	const p = document.createElement('p');
	p.innerHTML = coupon.name;
	a.append(p);

	const itemDetails = document.createElement('div');
	itemDetails.classList.add('item-details', 'hidden');

	details.forEach(detail => {
		itemDetails.append(new GroceryItemDetails(detail[0], detail[1], detail[2]).list);
	});

	a.append(itemDetails);

	a.onclick = e => {
		if ((e.target.tagName === 'A' && !e.target.classList.contains('grocery-item')) || e.target.tagName === 'UL' || e.target.tagName === 'LI') return; // Go to item details page as normal

		// The image was clicked and the details should be toggled
		e.preventDefault();

		if (itemDetails.classList.contains('hidden')) {
			itemDetails.classList.remove('hidden');
			a.style.marginBottom = `${details.length * 40}px`;
			a.style.outlineBottom = 'none';
		}
		else {
			itemDetails.classList.add('hidden');
			a.style.marginBottom = '15px';
		}
	};

	return a;
};

const createEntertainmentItem = coupon => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('item');

	a.append(getCouponImg(coupon));

	const div = document.createElement('div');
	const appendP = (content, className) => {
		const p = document.createElement('p');
		p.innerHTML = content;
		if (className) p.classList.add(className);
		div.append(p);
	};

	appendP(coupon.name, 'bold');
	appendP(coupon.store.name);

	const appendPrice = (title, oldPrice, newPrice) => {
		appendP(title, 'bold');

		const buyP = document.createElement('p');
		const oldBuy = document.createElement('span');
		oldBuy.classList.add('strikethrough');
		oldBuy.innerHTML = `$${oldPrice}`;
		const newBuy = document.createElement('span');
		newBuy.classList.add('red');
		newBuy.innerHTML = ` $${newPrice}`;

		buyP.append(oldBuy, newBuy);
		div.append(buyP);
	};

	appendPrice('Buy', coupon.prices[0], coupon.prices[1]);
	appendPrice('Rent', coupon.prices[2], coupon.prices[3]);

	appendP(`Exp. ${coupon.expiresAt}`);

	a.append(div);

	return a;
};

const createHygieneItem = coupon => {
	const a = document.createElement('a');
	a.href = 'item.html';
	a.classList.add('item', 'columns-all');

	a.append(getCouponImg(coupon));

	const details = document.createElement('div');
	details.classList.add('item-details');

	const appendP = (content, className) => {
		const p = document.createElement('p');
		p.innerHTML = content;
		if (className) p.classList.add(className);
		details.append(p);
	};

	appendP(coupon.name, 'bold');
	if (coupon.deal) {
		details.append(formatDeal(coupon.prices[0], coupon.deal));
	}
	else {
		details.append(formatPrice(coupon.prices[0], coupon.prices[1]));
	}
	appendP(coupon.store.name);

	details.append(document.createElement('br'));

	appendP(`Exp. ${coupon.expiresAt}`);

	details.append(document.createElement('br'));

	if (coupon.qualifyingItems) {
		appendP(`Qualifying items: ${coupon.qualifyingItems.join(', ')}`);
	}

	a.append(details);

	return a;
};

const createCartCoupon = coupon => {
	const div = document.createElement('div');
	div.classList.add('cart-coupon');

	const img = getCouponImg(coupon);
	img.classList.add('image');
	div.append(img);

	const details = document.createElement('div');
	details.classList.add('cart-coupon-details');

	const name = document.createElement('h3');
	name.classList.add('name');
	name.innerHTML = coupon.name;

	const store = formatLocation(coupon.store.name, coupon.store.location, 'h3', true);

	const share = document.createElement('img');
	share.classList.add('share');
	share.src = 'images/share.png';

	const remove = document.createElement('img');
	remove.classList.add('remove');
	remove.src = 'images/trash.png';

	if (coupon.deal) {
		const p = formatDeal(coupon.prices[0], coupon.deal);
		p.classList.add('price');
		details.append(p);
	}
	else {
		details.append(formatPrice(coupon.prices[0], coupon.prices[1], true));
	}

	const notes = document.createElement('p');
	notes.classList.add('notes');
	if (coupon.details) {
		notes.innerHTML = coupon.details;
	}
	else if (coupon.qualifyingItems) {
		notes.innerHTML = `Qualifying Items: ${coupon.qualifyingItems.join(', ')}`;
	}

	const exp = document.createElement('p');
	exp.classList.add('expires-at');
	exp.innerHTML = `Exp. ${coupon.expiresAt}`;

	details.append(name, store, share, remove, notes, exp);

	div.append(details);

	return div;
};

const loadItems = async () => {
	const coupons = await getCoupons();

	const onPage = page => window.location.pathname.endsWith(`${page}.html`);
	if (onPage('index')) { // index
		const expiring = document.getElementById('expiring-soon');

		coupons.slice(0, 2).forEach(coupon => {
			const a = createPrimaryFeatured(coupon);
			expiring.append(a);
		});

		const recommended = document.getElementById('recommended');

		coupons.slice(2, 6).forEach(coupon => {
			const a = createSecondaryFeatured(coupon);
			recommended.append(a);
		});
	}
	else if (onPage('grocery')) {
		const list = document.getElementById('grocery-items');

		const uniqueItems = []; // format: (itemName, [storeName, deal, exp])[]

		coupons.forEach(coupon => {
			if (coupon.type !== 'grocery') return;

			let found = false;
			uniqueItems.forEach(uniqueItem => {
				if (uniqueItem[0].name === coupon.name) { // found existing item
					uniqueItem[1].push([coupon.store.name, coupon.deal, coupon.expiresAt]);
					found = true;
				}
			});
			if (!found) { // item does not exist yet
				uniqueItems.push([coupon, [[coupon.store.name, coupon.deal, coupon.expiresAt]]]);
			}
		});

		uniqueItems.forEach(uniqueItem => {
			list.append(createGroceryItem(uniqueItem[0], uniqueItem[1]));
		});

		if (list.children.length % 2 === 1) { // there is an odd number of items
			list.append(createEmpty());
		}
	}
	else if (onPage('entertainment')) {
		const list = document.getElementById('entertainment-items');
		coupons.forEach(coupon => {
			if (coupon.type !== 'entertainment') return;

			list.append(createEntertainmentItem(coupon));
		});

		if (list.children.length % 2 === 1) { // there is an odd number of items
			list.append(createEmpty());
		}
	}
	else if (onPage('hygiene')) {
		const list = document.getElementById('hygiene-items');
		coupons.forEach(coupon => {
			if (coupon.type !== 'hygiene') return;

			list.append(createHygieneItem(coupon));
		});

		if (list.children.length % 2 === 1) { // there is an odd number of items
			list.append(createEmpty());
		}
	}
	else if (onPage('item')) {
		const item = coupons[0];
		const columns = document.getElementById('coupon-columns');

		// Image
		const imgContainer = document.createElement('div');
		imgContainer.id = 'coupon-image';
		imgContainer.classList.add('primary-featured');
		const img = getCouponImg(item);
		imgContainer.append(img);
		columns.append(imgContainer);

		// Data
		const data = document.createElement('div');
		data.id = 'coupon';
		data.classList.add('primary-featured');

		const name = document.createElement('h3');
		name.innerHTML = item.name;
		data.append(name);

		const store = document.createElement('div');
		store.classList.add('columns-all');
		const storeImgCol = document.createElement('p');
		storeImgCol.classList.add('coupon-column');
		const storeImg = document.createElement('img');
		storeImg.src = `images/stores/${item.store.logo}`;
		storeImgCol.append(storeImg);
		store.append(storeImgCol);
		const storeName = formatLocation(item.store.name, item.store.location, 'p', false);
		storeName.id = 'store-name';
		storeName.classList.add('coupon-column');
		store.append(storeName);
		data.append(store);

		const oldP = document.createElement('p');
		oldP.id = 'old-price';
		oldP.innerHTML = '$' + item.prices[0];
		data.append(oldP);

		const newP = document.createElement('p');
		newP.id = 'new-price';
		newP.classList.add('red');
		newP.innerHTML = '$' + item.prices[1] + ' !';
		data.append(newP);

		const add = document.createElement('button');
		add.innerHTML = 'Add to Cart';
		data.append(add);

		const exp = document.createElement('p');
		exp.id = 'expires-at';
		exp.innerHTML = `Exp. ${item.expiresAt}`;
		data.append(exp);

		columns.append(data);

		const details = document.getElementById('item-notes');
		if (item.details) details.innerHTML = item.details;

		const recommended = document.getElementById('recommended');

		coupons.slice(2, 6).forEach(coupon => {
			const a = createSecondaryFeatured(coupon);
			recommended.append(a);
		});
	}
	else if (onPage('cart')) {
		const carts = await getCarts();
		const cart = carts[0];
		document.getElementById('first-name').innerHTML = cart.firstName;

		const cartList = document.getElementById('cart-list');

		coupons.forEach(coupon => {
			if (cart.items.includes(coupon._id)) {
				cartList.append(createCartCoupon(coupon));
			}
		});

		document.getElementById('coupon-count').innerHTML = `${cartList.children.length}`;
	}
};

loadItems();