angular.module('mngr.util')
	.directive('mngrScrollPages', function () {
		return {
			link: function (scope, element, attrs) {
				var threshold = attrs.threshold || 0;
				var threshPercent = false;
				var elem = element[0];
				var nextPage = attrs.nextPage?attrs.nextPage:null;
				var prevPage = attrs.prevPage?attrs.prevPage:null;
				var lastTop = -1;

				if(threshold.charAt(threshold.length-1)==='%'){
					threshold = threshold.substr(0,threshold.length-1);
					threshPercent = true;
				}
				threshold = parseFloat(threshold);

				element.bind('scroll', function () {
					var offset = threshold;
					if(threshPercent){
						offset = elem.scrollHeight*(threshold/100.0);
					}

					if(prevPage && elem.scrollTop < lastTop && elem.scrollTop <= offset){
						if(scope.$apply(prevPage) && attrs.backScroll){
							lastTop = -1;
							elem.scrollTop = elem.scrollHeight-elem.offsetHeight-offset-1;
						}
					}
					if(nextPage && elem.scrollTop + elem.offsetHeight >= elem.scrollHeight - offset) {
						if(scope.$apply(nextPage) && attrs.backScroll){
							elem.scrollTop = offset+1;
						}
					}
					lastTop = elem.scrollTop;
				});
			}
		};
	}
);