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
						};


		$(window).resize(function() {

			$this.fixHeight();
		});


		var $this = $(this);

		$this.css({
			top: 0,
			left: 0,
			position: 'fixed',
			'z-index': 9999,
			overflow: 'auto',
			width: '100%',
			height: getWindowHeight() + 'px'
		});

		$this['fixHeight'] = fixHeight;


		var $mainWrapper = $('<div/>', {class: 'main-wrapper'});

		$mainWrapper.html("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
		$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");
		$mainWrapper.append("Nunc luctus eros tortor, nec consequat ex lacinia non. Sed dictum nulla in ipsum scelerisque, non dignissim ligula iaculis. In vulputate ipsum at lacus faucibus, sit amet tincidunt sem hendrerit. Curabitur non vulputate arcu, sit amet tempor risus. Etiam vel lacus eget nibh eleifend facilisis. Mauris tincidunt vulputate felis, vitae commodo mauris aliquam ac. Donec maximus finibus urna vitae sodales. Pellentesque at gravida lectus. Mauris in nisi at leo elementum scelerisque et sit amet enim. Proin augue felis, pulvinar at efficitur nec, interdum a massa.");

		$mainWrapper.click(function() {
			$overlay.fadeIn();
		});

		$mainWrapper.css({
			background: 'coral',
			width: '100%',
			'min-height': getWindowHeight() + 'px'
		});


		var $overlay = $('<div/>',{class: 'overlay'});

		// console.log(getData(['overlay']));

		$overlay.css({
			top: 0,
			left: 0,
			position: 'fixed',
			'z-index': 99999,
			'background-color': getData(['overlay','bgColor']),
			width: '100%',
			height: getWindowHeight() + 'px'
		});

		$overlay.click(function() {
			$overlay.fadeOut();
		});





		$this.append($mainWrapper).append($overlay);

	};

})(jQuery);