/**
 * Created by zura on 12/10/2017.
 */
(function () {
  'use strict';

  angular.module('lobipanel')
    .directive('lobipanel', ['$timeout', lobipanel])
    .directive('lobipanelParent', ['$timeout', lobipanelParent])
  ;

  function lobipanel($timeout) {
    return {
      replace: true,
      restrict: 'AE',
      transclude: true,
      scope: {
        style: '@style',
        heading: '@heading',
        options: '=',
        events: '='
      },
      template: '<div class="panel" ng-class="[cls]">\n              <div class="panel-heading">\n                  <h3 class="panel-title">{{style}} - {{heading}}</h3>\n              </div>\n              <div class="panel-body" ng-transclude>\n                  \n              </div>\n          </div>\n        ',
      link: function link(scope, el, attrs) {
        scope.style = scope.style || 'primary';
        scope.cls = 'panel-' + scope.style;
        let $el = $(el);
        let instance = $el.data('lobiPanel');

        let events = [
            'init.lobiPanel',
            'beforeUnpin.lobiPanel',
            'onUnpin.lobiPanel',
            'beforeClose.lobiPanel',
            'onClose.lobiPanel',
            'beforeToFront.lobiPanel',
            'onToFront.lobiPanel',
            'beforePin.lobiPanel',
            'onPin.lobiPanel',
            'beforeMinimize.lobiPanel',
            'onMinimize.lobiPanel',
            'beforeMaximize.lobiPanel',
            'onMaximize.lobiPanel',
            'beforeFullScreen.lobiPanel',
            'onFullScreen.lobiPanel',
            'beforeSmallSize.lobiPanel',
            'onSmallSize.lobiPanel',
            'beforeLoad.lobiPanel',
            'startLoading.lobiPanel',
            'loaded.lobiPanel',
            'resizeStart.lobiPanel',
            'onResize.lobiPanel',
            'resizeStop.lobiPanel',
            'dragged.lobiPanel'
        ];
        angular.forEach(events, function(event){
          $el.on(event, function(){
            scope.$apply();
          });
        });


        if (scope.events && angular.isObject(scope.events)) {
          angular.forEach(scope.events, function (value, key) {
            if (!angular.isFunction(value)) {
              console.error(key + " event listener is not a function");
              return;
            }
            $el.on(key + '.lobiPanel', value);
          });
        }
        $timeout(function () {
          $el.lobiPanel(scope.options);
        }, 0);
      }
    };
  }

  function lobipanelParent(){
    return {
      restrict: 'A',
      scope: {},
      link: function (scope, el, attrs) {
          $(el).lobiPanelParent()
      }
    }
  }
})();