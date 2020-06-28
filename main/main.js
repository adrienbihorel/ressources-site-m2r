$(document).ready(function() {

	var $viewport = $(document).find("#viewport");
	var $fil = $viewport.find("#fil");
	var $inner = $fil.find("#inner");
	var $pubs = $fil.find(".pub");
	var $blocs = $pubs.find(".aut, .med, .dis");
	var $aut = $pubs.find(".aut");
	var $med = $pubs.find(".med");
	var $dis = $pubs.find(".dis");

	var baseWidth = 1540;

	var $n0 = $fil.find(".n0");
	var $n1 = $fil.find(".n1");
	var $n2 = $fil.find(".n2");
	var $n3 = $fil.find(".n3");
	var $n4 = $fil.find(".n4");
	var $n5 = $fil.find(".n5");
	var $n6 = $fil.find(".n6");
	var $n7 = $fil.find(".n6");
	// var $pubsLength = $fil.find(".pub").length;
	// var $startOffset = $fil.find(".start").index();
	var $rightArrow = $(document).find("#right");


	var resizeViewport = function(event, ui) {
		console.log("resizeViewport");
		var windowWidth = $(window).width();
		var scale = windowWidth / baseWidth;
		$viewport.css({
			transform: "scale(" + scale + ")"
		});
	};





	var margin = 20;
	var scrollCenter = 260;
	// var $inFocus = $n0;

	var $puz1 = $n3;
	var $puz2 = $n4;
	var $puz3 = $n5;
	var puz2Top = $puz2.css("top");
	// var puz2Height = 0;






	var attrHeight = function(pub) {
		var pubHeight = margin;
		pub.children().each(function() {
			var pubChildHeight = $(this).outerHeight();
			pubHeight = pubHeight + pubChildHeight;
		});
		pub.css({
			"height": pubHeight,
		});
	}
	var attrHeights = function() {
		$pubs.each(function() {
			var $this = $(this);
			attrHeight($this);
		});
	}

	var scrollTo = function(pub) {
		console.log("scrollTo");
		var thisTop = scrollCenter - parseInt(pub.attr("data-top"));
		$inner.css({
			"top": thisTop
		});
	}

	var stackY = function() {
		console.log("stackY");
		$pubs.not(".puzzle-side").each(function() {
			var thisTop = 0;

			$(this).prevAll().not(".puzzle-side").each(function() {
				// if (!$(this).is($puz2)) {
				thisTop = thisTop + $(this).outerHeight();
				// } else {
				//   thisTop = thisTop + puz2Height;
				// }
			});

			if ($(this).is($puz2)) {
				// console.log("yes");
				puz2Top = thisTop;
			}

			$(this).css({
				"top": thisTop,
			}).attr("data-top", thisTop);
		});
	}

	var getPuzzHeight = function() {
		var puz1Height = parseInt($puz1.css("height"));
		var puz2Height = parseInt($puz2.css("height"));
		var puz3Height = parseInt($puz3.css("height"));
		var heights = [puz1Height, puz2Height, puz3Height]
		puz2Height = Math.max.apply(null, heights);
		// console.log(puzzHeight);
	}





	var puzzOn = function() {
		puzzClassOn();
		puzzXOn();
		mixDisOn();
		mixMedOn();
		// puzzXHalfOn();
		puzzYOn();
	}

	var puzzOff = function() {
		puzzClassOff();
		puzzXOff();
		puzzYOff();
		// idéalement onComplete...
		// setTimeout(function() {
		// 	puzzZOff();
		// }, 400)
	}

	var puzzClassOn = function() {
		console.log("puzzClass");
		$puz1.addClass("puzzle");
		$puz2.addClass("puzzle");
		$puz3.addClass("puzzle");

		$puz1.addClass("puzzle-side");
		$puz3.addClass("puzzle-side");
	};

	var puzzClassOff = function() {
		console.log("puzzClass");
		$puz1.removeClass("puzzle");
		$puz2.removeClass("puzzle");
		$puz3.removeClass("puzzle");

		$puz1.removeClass("puzzle-side");
		$puz3.removeClass("puzzle-side");
	};

	var puzzFocusOn = function() {
		$pubs.not(".puzzle").each(function() {
			// $(this).children().addClass("c-background");
			$(this).addClass("low-opacity");
		});
	};

	var puzzFocusOff = function() {
		$pubs.not(".puzzle").each(function() {
			// $(this).children().removeClass("c-background");
			$(this).removeClass("low-opacity");
		});
	};

	var blocsReorder = function() {
		console.log("blocsReorder");
		$pubs.each(function() {
			$(this).children(".aut").insertAfter($(this).children(".med"));
		});
	}

	var puzzZOff = function(callback) {
		console.log("puzzZOff");
		// chaque pub passe devant la précédente
		var zIndex = 0;
		var list = $blocs;
		$pubs.children().each(function() {
			zIndex++;
			$(this).css({
				"z-index": zIndex
			});
			// if ($(this).hasClass("last")) {
			// 	console.log("last");
			//
			// }
			// if (callback) {
			// 	// console.log("calling callback");
			// 	callback.call();
			// }
		});
	}

	var puzzZOn = function() {
		console.log("puzzZOn");
		// les blocs sont sur le même plan pour ne pas que ça foire au moment du mélange
		$aut.css({
			"z-index": 1
		});
		$med.css({
			"z-index": 0
		});
		$dis.css({
			"z-index": 2
		});
	}

	var puzzHOn = function() {
		console.log("puzzHOn");
		getPuzzHeight();
		$puz2.css({
			"height": puz2Height
		});
	}

	var puzzYOn = function() {
		console.log("puzzYOn");
		stackY();
		$puz1.css({
			"top": puz2Top
		}).attr("data-top", puz2Top);
		$puz3.css({
			"top": puz2Top
		}).attr("data-top", puz2Top);
	}

	var puzzYOff = function() {
		console.log("puzzYOff");
		stackY();
	}

	var puzzXHalfOn = function() {
		console.log("puzzXOn");
		$puz1.css({
			"left": "-80px",
		});
		$puz3.css({
			"left": "80px",
		});
	}

	var puzzXOn = function() {
		console.log("puzzXOn");
		$puz1.css({
			"left": "-400px",
		});
		$puz3.css({
			"left": "400px",
		});
	}

	var puzzXOff = function() {
		console.log("puzzXOff");
		$puz1.css({
			"left": "0px",
		});
		$puz3.css({
			"left": "0px",
		});
	}

	var mixDisOn = function() {
		$puz1.find(".dis").css({
			"left": 800,
		});
		$puz3.find(".dis").css({
			"left": -800,
		});
	}

	var mixDisOff = function() {
		$puz1.find(".dis").css({
			"left": 0,
		});
		$puz3.find(".dis").css({
			"left": 0,
		});
	}

	var mixMedOn = function() {
		$puz2.find(".med").css({
			"left": 400,
		});
		$puz3.find(".med").css({
			"left": -400,
		});
	}

	var mixMedOff = function() {
		$puz2.find(".med").css({
			"left": 0,
		});
		$puz3.find(".med").css({
			"left": 0,
		});
	}

	// var delayOn = function() {
	// 	$([$puz1, $puz2, $puz3]).each(function() {
	// 		$(this).children().each(function() {
	//
	// 		});
	// 	});
	// }

	var gigotOn = function() {
		$([$puz1, $puz2, $puz3]).each(function() {
			$(this).children().addClass("gigot");
		});
	}

	var gigotOff = function() {
		$([$puz1, $puz2, $puz3]).each(function() {
			$(this).children().removeClass("gigot");
		});
	}

	var initialize = function() {
		$pubs.css({
			"top": 0,
			"left": 0
		});
		$blocs.css({
			"left": 0
		})
		// $blocs.last().addClass("last");
		blocsReorder();
		attrHeights();
		stackY();
		scrollTo($n1);
		puzzZOff();
		puzzOn();
		resizeViewport();
	}

	initialize();
	$(window).resize(function() {
		resizeViewport();	
	});

	var steps = [
		function() {
			scrollTo($puz2);
			// puzzXOn();
			puzzFocusOn();
			puzzZOn();
		},
		function() {
			gigotOn();
		},
		function() {
			gigotOff();
			mixDisOff();
		},
		function() {
			mixMedOff();
		},
		function() {
			puzzZOff();
			puzzOff();
			puzzFocusOff();
			scrollTo($n6);
		},
		function() {
			puzzOn();
			scrollTo($n1);
		},
	];
	var stepsLength = steps.length;
	var stepCounter = 0;


	$rightArrow.click(function() {
		steps[stepCounter]();
		if (stepCounter < stepsLength - 1) {
			stepCounter++;
		} else {
			stepCounter = 0;
		}
	});

});
