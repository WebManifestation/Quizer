(function($) {

$.fn.quizer = function(options) {


		var setting = $.extend({},options);

		function getWindowHeight() {

			return $(window).height();
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
							console.log('fixHeight', this);

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
			getHeight = function() {

							return this.height();
						};


		$(window).resize(function() {

			$this.fixHeight();
			$overlay.fixHeight();
		});


		var $this = $(this);

		$this['fixHeight'] = fixHeight;

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

		$mainWrapper.html("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
		$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
		$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");

		$mainWrapper.click(function() {
			$overlay.toggle('close');
		});

		$mainWrapper.css({
			background: 'coral',
			width: '100%',
			'min-height': '100%'
		});







		var $overlay = $('<div/>',{class: 'overlay'});

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

		$overlay.click(function() {
			$overlay.toggle('open');
		});

		$overlay.css({
			top: 0,
			left: 0,
			position: 'fixed',
			'z-index': 99999,
			'background-color': getData(['overlay','bgColor']),
			'background-image': 'url(' + getData(['overlay','img']) + ')',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': '100px',
			width: '100%',
			height: getWindowHeight() + 'px'
		});






		$this.append($mainWrapper).append($overlay);

	};

})(jQuery);