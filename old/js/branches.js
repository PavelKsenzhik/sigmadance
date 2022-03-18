function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

// Anim Items

window.onload = function() {
	const menu__list = document.querySelector('.menu__list');
	const burger = document.querySelector('.burger');
	const burgerLines = document.querySelectorAll('.burger__line');
	const animItems = document.querySelectorAll('._anim-items');
	const anchors = document.querySelectorAll('a[href*="#"]');
	const about__imgs = document.querySelectorAll('.about-pictr__img');
	const socialIcons = document.querySelectorAll('.social__icon');

	if(animItems.length > 0){
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll(params){
			for (let i = 0; i < animItems.length; i++) {
								const animItem = animItems[i];
								const animItemHeight = animItem.offsetHeight;
								const animItemOffset = offset(animItem).top;
								const animStart = 4;


								let animItemPoint = window.innerHeight - animItemHeight / animStart;

								if(animItemHeight > window.innerHeight){
									animItemPoint = window.innerHeight - window.innerHeight / animStart;
								}

								if((pageYOffset > animItemOffset - animItemPoint && pageYOffset < (animItemOffset + animItemHeight))){
									animItem.classList.add('_active');
								} /*else{
									animItem.classList.remove('_active');
								}*/
						}
		}
		function offset(el){
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
				return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
		}
		setTimeout(() =>animOnScroll(), 300)
		
	}

	// Burger

	burger.onmouseenter = function onZoom(){
		for(let i = 0; i < burgerLines.length; i++){
			burgerLines[i].style.height = '5px';
			burgerLines[i].style.width = '37px';
		}
	}

	burger.onmouseleave = function offZoom(){
			for(let i = 0; i < burgerLines.length; i++){
			burgerLines[i].style.height = '4px';
			burgerLines[i].style.width = '30px';
			}
	}

	function toggleBurger(){
		burger.classList.toggle('burger-clicked');
		for(let i = 0; i < burgerLines.length; i++){
			burgerLines[i].classList.toggle(`burger__line-${i + 1}-clicked`)
		}
		menu__list.classList.toggle('menu__list-clicked');
		document.querySelector('#body').classList.toggle('no-scroll');
		moveBlockSocial();
		for(let i = 0; i < socialIcons.length; i++){
			socialIcons[i].classList.toggle('social__icon-white')
		}
	}

	let socialDisplay = true;
	function moveBlockSocial(){
		let social = document.querySelector('.social');
		if(socialDisplay){
			menu__list.append(social);
			socialDisplay = false;
		} else{
			document.querySelector('.navigator').prepend(social);
			socialDisplay = true;
		}
	}

	burger.onclick = toggleBurger;

	//Go to main page

	document.querySelector('.menu__link-toMain').addEventListener('onclick',goToMain)
	function goToMain(){
		console.log('ds')
	}


	// ScrollTo

	for(let anchor of anchors){
		anchor.addEventListener("click", function(event){
			event.preventDefault();
			const blockID = anchor.getAttribute('href');
			document.querySelector('' + blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		})
	}


	// BackToTop

	function backToTop(){
		let button = document.querySelector('.back-to-top');
		window.addEventListener('scroll',() =>{
			if(window.pageYOffset >= 300){
				button.style.display = 'block';
			} else{
				button.style.display = 'none';
			}
		})
	}

	backToTop();

	// Time

	const menuItems = document.querySelectorAll('.menu__link');

	for( let item of menuItems){
		item.addEventListener('click',toggleBurger)
	}

	// moveHeaderBg

	document.querySelector('.header-bg').classList.add('_active')

}


// Lazy Load Map

const map_containers = document.querySelectorAll('#map_container');
let options_map = {
    once: true,//запуск один раз, и удаление наблюдателя сразу
    passive: true,
    capture: true
};

for(let i = 0; i < map_containers.length; i++ ){
	map_containers[i].addEventListener('click', start_lazy_map, options_map);
	map_containers[i].addEventListener('mouseover', start_lazy_map, options_map);
	map_containers[i].addEventListener('touchstart', start_lazy_map, options_map);
	map_containers[i].addEventListener('touchmove', start_lazy_map, options_map);
}

//let map_loaded = false;
function start_lazy_map() {
	let map_block = this.childNodes[1];
	map_block.setAttribute('src', map_block.getAttribute('data-src'));
	map_block.removeAttribute('data_src');

}