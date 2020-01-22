if(document.readyState == 'loading'){
	document.addEventListener('DOMContentLoaded', ready)
}else{
	ready()
}

function ready(){
	var quantityInputs = document.getElementsByClassName('cart-quantity-input')
	for(var i = 0; i < quantityInputs.length; i++){
		var input = quantityInputs[i]
		input.addEventListener('change', quantityChange)
	}

	var removeCartItemButton = document.getElementsByClassName('btn-danger')
	for(var i = 0; i < removeCartItemButton.length; i++){
		var button = removeCartItemButton[i]
		button.addEventListener('click', removeCartItem)
	}

	var addToCartButtons = document.getElementsByClassName('shop-item-button')
	for(var i =0; i < addToCartButtons.length; i++){
		var button = addToCartButtons[i]
		button.addEventListener('click', addToCartClicked)
	}

	document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

}

function addToCartClicked(){
	var button 		= event.target;
	var shopItem 	= button.parentElement.parentElement
	var title 		= shopItem.getElementsByClassName('shop-item-title')[0].innerText
	var price 		= shopItem.getElementsByClassName('shop-item-price')[0].innerText
	var imageSrc 	= shopItem.getElementsByClassName('shop-item-img')[0].src 
	additemToCart(title, price, imageSrc);
	updateToCartTotal();
}

function removeCartItem(event){
	var buttonClick = event.target
	buttonClick.parentElement.parentElement.remove()
	updateToCartTotal()
}

function purchaseClicked(){
	alert('Tengs BoI')
	var cartItems = document.getElementsByClassName('cart-item')[0]
	while(cartItems.hasChildNodes()){
		cartItems.removeChild(cartItems.firstChild)
	}
	updateToCartTotal()
}

function additemToCart(title, price, imageSrc){
	var cartRow = document.createElement('div');
	cartRow.classList.add('cart-row')
	var cartItems = document.getElementsByClassName('cart-item')[0];
	var cartItemName = cartItems.getElementsByClassName('cart-item-title')
	for(var i = 0; i < cartItemName.length; i++){
		if(cartItemName[i].innerText == title){
			alert('produk anda beli sudah ada di dalam keranjang belanja')
			return 
		}
	}



	var cartRowContents = `<div class="cart-item cart-column">
							<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
							<span class="cart-item-title">${title}</span>
							</div>
							<span class="cart-price cart-column">${price}</span>
							<div class="cart-quantity cart-column">
							<input class="cart-quantity-input" type="number" value="1">
							<button class="btn btn-danger" type="button">Remove</button>
							</div>
						   `


	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
	cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChange);
}

function updateToCartTotal(){
	var cartItemContainer 	= document.getElementsByClassName('cart-item')[0]
	var cartRows 			= cartItemContainer.getElementsByClassName('cart-row')
	var total 				= 0
	for(var i = 0; i < cartRows.length; i++){
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-price')[0]
		var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
		var price = parseFloat(priceElement.innerText.replace('Rp. ', ""))
		var quantity = quantityElement.value
		total = total + (price*quantity)
	}
	total = Math.round(total * 100)/100
	document.getElementsByClassName('cart-total-price')[0].innerText = "Rp. "+ total.toLocaleString('en')
}


function quantityChange(event){
	var input = event.target
	if(isNaN(input.value)|| input.value <= 0){
		input.value = 1
	}
	updateToCartTotal()
}