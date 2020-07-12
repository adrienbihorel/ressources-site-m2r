// import { Sortable, Plugins } from '@shopify/draggable';

$(document).ready(function() {
	var $html = $('html');
	var $viewport = $html.find('#viewport');
	var $fil = $viewport.find('#fil');
	var $puzzleContainer = $viewport.find('#puzzle-container');
	var $button = $(document).find('#right');
	var windowWidthBase = 1440;
	var gridSizeBase = 10;

	var resizeViewport = function(event, ui) {
		console.log("resizeViewport");
		var windowWidth = $(window).width();
		var scale = windowWidth / windowWidthBase;
		// $viewport.css({
		// 	transform: "scale(" + scale + ")"
		// });
		$html.css({
			'font-size': scale * gridSizeBase + "px"
		});
	};

	var $pubs = [];
	var $auts = [];
	var $meds = [];
	var $diss = [];

	var $puzzleCentralPub = null;
	var $puzzlePubsWrapper = null;
	var $puzzleAutsWrapper = null;
	var $puzzleMedsWrapper = null;
	var $puzzleDissWrapper = null;
	var $puzzlePubs = null;
	var $puzzleAuts = null;
	var $puzzleMeds = null;
	var $puzzleDiss = null;
	var $puzzlePub0Blocs = null;
	var $puzzlePub1Blocs = null;
	var $puzzlePub2Blocs = null;

	var sounds = {
		sound1: 'sounds/sound1.mp3',
		sound2: 'sounds/sound2.mp3'
	}

	var playSound = function(sound) {
		new Audio(sound).play();
	}

	var makeImgsUndraggable = function() {
		console.log('makeImgsUndraggable');
		$fil.find('img').each(function() {
			$(this).attr('draggable', 'false');
		});
	}

	var attrIds = function() {
		console.log('attrIds');
		$fil.find('.pub').each(function(i) {
			var $thisPub = $(this);
			$thisPub.add($thisPub.children()).each(function() {
				$(this).attr('pub-id', i);
			});
			$pubs.push($thisPub);
			$auts.push($thisPub.find('.aut'));
			$meds.push($thisPub.find('.med'));
			$diss.push($thisPub.find('.dis'));
		});
	}

	var attrZIds = function() {
		console.log('attrZIds');
		$($auts).each(function() {
			$(this).css({
				'z-index': 2
			});
		});
		$($meds).each(function() {
			$(this).css({
				'z-index': 0
			});
		});
		$($diss).each(function() {
			$(this).css({
				'z-index': 1
			});
		});
	}

	var puzzSelect = function(puzzleCentralPub) {
		console.log('puzzSelect');
		$puzzleCentralPub = puzzleCentralPub;
		$puzzlePubs = $puzzleCentralPub.add($puzzleCentralPub.prev()).add($puzzleCentralPub.next());
		$puzzleAuts = $puzzlePubs.find('.aut');
		$puzzleMeds = $puzzlePubs.find('.med');
		$puzzleDiss = $puzzlePubs.find('.dis');
		puzzlePubsIds = [];
		$puzzlePubs.each(function() {
			var pubId = $(this).attr('pub-id');
			puzzlePubsIds.push(pubId);
		});
		$puzzlePub0Blocs = $puzzlePubs.find('[pub-id="' + puzzlePubsIds[0] + '"]');
		$puzzlePub1Blocs = $puzzlePubs.find('[pub-id="' + puzzlePubsIds[1] + '"]');
		$puzzlePub2Blocs = $puzzlePubs.find('[pub-id="' + puzzlePubsIds[2] + '"]');
	}

	var puzzPubsWrapOn = function() {
		console.log('puzzPubsWrapOn');
		$puzzlePubsWrapper = $('<div class="pubs-wrapper"></div>').insertBefore($puzzlePubs[0]);
		$puzzlePubs.appendTo($puzzlePubsWrapper);
	}

	var puzzPubsWrapOff = function() {
		console.log('puzzPubsWrapOff');
		$puzzlePubs.insertAfter($puzzlePubsWrapper);
		$puzzlePubsWrapper.remove();
	}

	var puzzPubsWrapOpenOn = function() {
		console.log('puzzPubsWrapOpenOn');
		$puzzlePubsWrapper.addClass('pubs-wrapper-open');
	}

	var puzzPubsWrapOpenOff = function() {
		console.log('puzzPubsWrapOpenOff');
		$puzzlePubsWrapper.removeClass('pubs-wrapper-open');
	}

	var puzzBlocsWrapOn = function() {
		console.log('puzzBlocsWrapOn');
		$puzzleDissWrapper = $('<div class="puzzle-diss-wrapper"></div>').prependTo($puzzlePubsWrapper);
		$puzzleMedsWrapper = $('<div class="puzzle-meds-wrapper"></div>').prependTo($puzzlePubsWrapper);
		$puzzleAutsWrapper = $('<div class="puzzle-auts-wrapper"></div>').prependTo($puzzlePubsWrapper);
		$puzzleAuts.prependTo($puzzleAutsWrapper);
		$puzzleMeds.prependTo($puzzleMedsWrapper);
		$puzzleDiss.prependTo($puzzleDissWrapper);
	}

	var puzzBlocsWrapOff = function() {
		console.log('puzzBlocsWrapOff');
		$puzzlePub0Blocs.appendTo($puzzlePubs[0]);
		$puzzlePub1Blocs.appendTo($puzzlePubs[1]);
		$puzzlePub2Blocs.appendTo($puzzlePubs[2]);
		$puzzleDissWrapper.remove();
		$puzzleMedsWrapper.remove();
		$puzzleAutsWrapper.remove();
	}

	var puzzDraggablesOn = function() {
		console.log('puzzDraggablesOn');
		// wrap draggable items to allow for css transform scale
		// add draggable-source class to these items
		$([$puzzleAutsWrapper, $puzzleMedsWrapper, $puzzleDissWrapper]).each(function() {
			// this is pretty dirty
			$(this).children().each(function() {
				var $thisBloc = $(this);
				var $thisBlocStyle = $thisBloc.attr('style');
				var $draggableSource = $('<div class="bloc-wrapper draggable-source"></div>').insertBefore($thisBloc).attr('style', $thisBlocStyle);
				$thisBloc.appendTo($draggableSource);
				// var $thisBlocStyle = $thisBloc.css('z-index');
				// var $draggableSource = $('<div class="bloc-wrapper draggable-source"></div>').insertBefore($thisBloc).css('z-index', $thisBlocStyle);
				// $thisBloc.appendTo($draggableSource);
			});
		});

		var draggableOptions = {
			// draggable: '.bloc',
			swapAnimation: {
				duration: 200,
				easingFunction: 'cubic-bezier(0.25, 0, 0.25, 1)',
				horizontal: true
			},
			// mirror: {
			// 	constrainDimensions: true,
			// 	// cursorOffsetX: 10,
			// 	// cursorOffsetY: 10,
			// 	// xAxis: false
			// 	// appendTo: ''
			// },
			plugins: [Plugins.SwapAnimation],
			// plugins: [Plugins.SortAnimation]
		}
		var draggableAuts = new Draggable.Sortable(
			document.querySelectorAll('.puzzle-auts-wrapper'),
			draggableOptions);
		var draggableMeds = new Draggable.Sortable(
			document.querySelectorAll('.puzzle-meds-wrapper'),
			draggableOptions);
		var draggableDiss = new Draggable.Sortable(
			document.querySelectorAll('.puzzle-diss-wrapper'),
			draggableOptions);

		// play sounds
		// draggableAuts.on('drag:start', function() {
		// 	playSound(sounds.sound1);
		// }).on('drag:stop', function() {
		// 	playSound(sounds.sound2);
		// });
		// draggableMeds.on('drag:start', function() {
		// 	playSound(sounds.sound1);
		// }).on('drag:stop', function() {
		// 	playSound(sounds.sound2);
		// });
		// draggableDiss.on('drag:start', function() {
		// 	playSound(sounds.sound1);
		// }).on('drag:stop', function() {
		// 	playSound(sounds.sound2);
		// });


	}

	var puzzDraggablesOff = function() {
		console.log('puzzDraggablesOff');

	}

	var puzzOn = function(puzzleCentralPub) {
		console.log('puzzOn');
		puzzSelect(puzzleCentralPub);
		puzzPubsWrapOn();
		puzzPubsWrapOpenOn();
		puzzBlocsWrapOn();
		puzzDraggablesOn();
	}

	var puzzOff = function() {
		puzzBlocsWrapOff();
		puzzPubsWrapOpenOff();
		puzzPubsWrapOff();
	}

	var initialize = function() {
		resizeViewport();
		makeImgsUndraggable();
		attrIds();
		attrZIds();
	};

	initialize();
	$(window).resize(function() {
		resizeViewport();
	});

	var steps = [
		function() {
			console.log('step 1');
			puzzOn($pubs[2]);
		},
		function() {
			console.log('step 2');
			puzzOff();
		},
	];
	var stepsLength = steps.length;
	var stepCounter = 0;

	$button.click(function() {
		steps[stepCounter]();
		if (stepCounter < stepsLength - 1) {
			stepCounter++;
		} else {
			stepCounter = 0;
		}
	});



})
