(function($) {

$.fn.quizer = function(options) {



	var setting = $.extend({

		status: 0,
		loadedImages: {}
	},options);

	setting.allImgsList = getAllImages();

	//Components
	
	 

	function getWindowHeight() {

		return $(window).height();
	};

	function getAllImages() {

		var imagesArray = new Array(),
			qNaData = getData(['qNa']);

		$.each(qNaData, function(i, question) {

			$.each(question.options, function(x, option) {
				imagesArray.push(option.icon);
			});
		});

		return imagesArray;
	};

	function getData(array) {

		var data = null,
			arrayCount = array.length;
			obj = setting.data;

		if(arrayCount > 1) {
			$.each(array, function(i,val) {

				if (arrayCount-i != 1) {

					data = obj[val];
				} else {
					
					data = data[val];
				};	
			});
		} else {
			data = obj[array[0]];
		};

		return data;
	};



	var fixHeight = function() {
						this.css({ height: getWindowHeight() + 'px' });
						// console.log('fixHeight', this);

						return this;
					},

		setAnimation = function(transformString, time) {

						this.css({
							'-moz-transition': 'all ' + time + ' ease',
							'-o-transition': 'all ' + time + ' ease',
							'-webkit-transition': 'all ' + time + ' ease',
							transition: 'all ' + time + ' ease',
						});

						this.css({
							'-moz-transform': transformString,
							'-o-transform': transformString,
							'-webkit-transform': transformString,
							transform: transformString,
						});

						return this;

					},
		loadImg = function(callback) {

						this.load(function() {
							if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
					            return 'broken image!';
					        } else {
					        	callback();
					        }
						});

						return this;
					};


	$(window).resize(function() {

		$this.fixHeight();
		$overlay.fixHeight();
	});

	window.onbeforeunload = function() {
		
		$overlay.toggle('close');
		$test.close();
	}

	var $this = $(this);

	$this['fixHeight'] = fixHeight;
	$this['loadAllImages'] = function(callback) {

		$.each(setting.allImgsList, function(key, src) {

			setting.loadedImages[key] = false;

			var $img = $('<img/>').attr('src', src);

			$img['loadImg'] = loadImg;

			$img.loadImg(function() {
				var loadedArray = [],
					count = 0;
				setting.loadedImages[key] = true;
				$.each(setting.loadedImages, function(key, loaded) {
					// console.log(key, loaded);
					loadedArray.push(loaded);
					if (loaded) {
						count++;
					};
				});

				$overlay.child.loading.setText(count);

				// console.log($.inArray(false, loadedArray));



				if ($.inArray(false, loadedArray) == -1 ) {
					console.log('all images loaded');
					callback();
				};
			});

		});

		return this;
	};

	$this.css({
		top: 0,
		left: 0,
		position: 'fixed',
		'z-index': 9999,
		overflow: 'auto',
		width: '100%',
		height: getWindowHeight() + 'px'
	});







	var $mainWrapper = $('<div/>', {class: 'main-wrapper'});

	$mainWrapper.html("Nunc <a href='https://www.google.co.in'>luctus</a> eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
	$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
	$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");

	// $mainWrapper.click(function() {
	// 	$overlay.toggle('close');
	// });

	$mainWrapper.css({
		background: 'coral',
		width: '100%',
		'min-height': '100%'
	});






	function imageLoadCall(src, callback) {

		var $img = $('<img/>').attr('src', src );
		$img.load(function() {
			if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
	            return 'broken image!';
	        } else {
	        	callback(src);
	        }
		});

		return;
	};

	var TextElem = function(placeholder, classes) {
		this.placeholder = placeholder;
		this.elem = $('<div/>');
		this.elem
		.addClass(classes)
		.text(placeholder);
	};
	TextElem.prototype.updateText = function(newText) {
		this.elem.text(newText);
	}


	var Overlay = function(tag, classes) {

		this.elem = $('<'+ tag +'/>');
		$elem = this.elem;
		$elem
		.addClass(classes)
		.css({
			top: 0,
			left: 0,
			position: 'fixed',
			'z-index': 99999,
			'background-color': getData(['overlay','bgColor']),
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': '100px',
			width: '100%',
			height: getWindowHeight() + 'px'
		});

		imageLoadCall(getData(['overlay','img']), function(img) {
			$elem.css({'background-image': 'url(' + img + ')' });
		});


		this.loading = new TextElem('Loading', 'overlay-loading-wrapper');
		// this.loading = $('<div/>');
		this.loading.elem
		.css({
			position: 'absolute',
			bottom: 0,
		    left: 0,
		    'font-size': '70%',
		    padding: '5px 10px',
		})
		.appendTo(this.elem);

		console.log(this.loading.elem);
		// this.loading.updateText();

	};
	// $Overlay.prototype = $.extend({},$Elem.prototype);
	Overlay.prototype.open = function() {
		// console.log(this.elem);
		this.elem.fadeOut();
	};
	Overlay.prototype.close = function() {
		// console.log(this.elem);
		this.elem.fadeIn();
	};

	var $test = new Overlay('div', 'overlay test');

	// $test.html('test');
	$this.append($test.elem);

	setTimeout(function() { $test.open() }, 1000);
	setTimeout(function() { $test.loading.updateText('test') }, 2000);


	var $overlay = $('<div/>',{class: 'overlay'});
	$overlay['child'] = {};

	$overlay.child['loading'] = $('<div/>',{class: 'overlay-loading-wrapper'})
								.css({
									position: 'absolute',
									bottom: 0,
								    left: 0,
								    'font-size': '70%',
								    padding: '5px 10px',
								});
	$overlay.child.loading['setText'] = function(count) {

											if ( typeof count == 'undefined') {
												count = 0;
											}

											if (count == setting.allImgsList.length ) {
												this.text(getData(['overlay','placeholder']));
											} else {

												this.text('Loaded '+ count +' of ' + setting.allImgsList.length + ' images');
											}

										};

	// console.log(getData(['overlay']));
	$overlay['fixHeight'] = fixHeight;
	$overlay['setAnimation'] = setAnimation;
	$overlay['toggle'] = function(action) {
								switch(action) {
									case 'open':
										this.setAnimation('translateX(-1700px)', '1s');
										break;
									case 'close':
										this.setAnimation('translateX(0)', '0.5s');
										break;
								}

								return this;
							};

	// $overlay.click(function() {
	// 	$overlay.toggle('open');
	// });

	$overlay.css({
		top: 0,
		left: 0,
		position: 'fixed',
		'z-index': 99999,
		'background-color': getData(['overlay','bgColor']),
		'background-repeat': 'no-repeat',
		'background-position': 'center center',
		'background-size': '100px',
		width: '100%',
		height: getWindowHeight() + 'px'
	});

	var $overlayImg = $('<img/>').attr('src', getData(['overlay','img']));

	$overlayImg['loadImg'] = loadImg;
	$overlayImg.loadImg(function() {
		$overlay.css({ 'background-image': 'url(' + getData(['overlay','img']) + ')' });
	});

	$overlay.append($overlay.child.loading);
	$overlay.child.loading.setText();









	$this.append($mainWrapper);//.append($overlay);

	$this.loadAllImages(function() {
		$overlay.toggle('open');
	});
};

})(jQuery);