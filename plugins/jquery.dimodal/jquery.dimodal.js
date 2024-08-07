/*

// Параметры вызова
-------------------
name: false, // Имя модального окна, можно обращаться по нему, например показывать.
button: false, // Селектор кнопки, которая будет вызывать показ (селектор, jq объект).
content: false,	// Селектор контента, который будет помещен в модальное окно (селектор, jq объект, ajax объект).
ajaxContentFormat: function(){}, // Функция, которая обработает аякс ответ, чтобы достать из него необходимый контент для показа.
cloneContent: false, // Будет ли клонироваться указанный контент или будет переноситься в модалку оригинал.
autoOpen: false, // Окно появится автоматически после вызова.
closeOnEscape: true, // Закрывать ли окно по кнопке Esc.
destroyOnClose: false, // Уничтожать окно после его скрытия.
closeOnBackgroundClick: true, // Закрывать окно по клику на фон.
displayCloseButton: true, // Отображать крестик закрытия.
customCloseButton: false, // Селектор для собственной кнопки закрытия окна, кнопка должна быть в контенте модального окна. (селектор, jq объект)
stopPropagation: false, // Выключить прокликивание через обёртку конкретного модального окна до документа
legacyDifbackSupport: false, // Поддержка для плагина дифбек(который я застал)
contentBackgroundColor: transparent, // Фон подложки модального окна(если у котента окна нет своего фона).
contentAligment: 'center', // Позиционирование модалки в окне. Может принимать значения 'right', 'left', 'full', 'center'. Также может принимать собственные значения, создается css классами.
contentOpenAnimationName: 'fadein', // Анимация показывания модалки. Также может принимать собственные значения, создается css классами.
animationForceName: 'dimodal-animation--force', // Класс анимаций, которая ускоряет до 0 другие анимации. 
animationFillmodeFix: 'dimodal-animation--fillmodefix', // Класс анимации, исправляющая анимацию в хроме.
backgroundClass: '', // Дополнительный класс на фоне модалки.
modalClasses: '', // Дополнительные классы для модалки.
itemHolderTemplate:	'', // Шаблон разметки для окна.
onBeforeHolderOpen: function(){}, // Колбек перед тем, как откроется главный держатель всех окон.
onAfterHolderOpen: function(){}, // Колбек после того, как откроется главный держатель всех окон.
onBeforeHolderClose: function(){}, // Колбек перед тем, как закроется главный держательно всех окон.
onAfterHolderClose: function(){}, // Колбек после того, как закроется главный держатель всех окон.
onBeforeClose: function(){}, // Колбек перед тем, как закроется окно(до анимации, можно сбросить через return false;).
onAfterClose: function(){}, // Колбек после того, как закроется окно(после анимации).
onBeforeDestroy: function(){}, // Колбек перед тем, как уничтожится окно.
onAfterDestroy: function(){}, // Колбек после того, как уничтожится окно.
onStateChange: function(){} // Колбек показалось/скрылось окно (срабатывает независимо от анимаций).

// (Deprecated) Параметры вызова 
-------------------
autoShow: false, // Окно появится автоматически после вызова.
hideOnEscape: true, // Закрывать ли окно по кнопке Esc.
destroyOnHide: false, // Уничтожать окно после его скрытия.
hideOnBackgroundClick: true, // Закрывать окно по клику на фон.
displayHideButton: true, // Отображать крестик закрытия.
contentShowAnimationName: 'fadein', // Анимация показывания модалки. Также может принимать собственные значения, создается css классами.
contentHideAnimationName: 'fadeout', // Анимация скрывания модалки. Также может принимать собственные значения, создается css классами.
backgroundShowAnimationName: 'fadein', // Анимация показывания фона. Также может принимать собственные значения, создается css классами.
backgroundHideAnimationName: 'fadeout', // Анимация скрывания фона. Также может принимать собственные значения, создается css классами.
onBeforeShow: function(){}, // Колбек перед тем, как покажется окно(перед анимацией, контент в окне уже присутствует, можно сбросить через return false;).
onAfterShow: function(){}, // Колбек после того, как покажется окно(после анимации).
onBeforeHide: function(){}, // Колбек перед тем, как закроется окно(до анимации, можно сбросить через return false;).
onAfterHide: function(){}, // Колбек после того, как закроется окно(после анимации).


// Объявление окна через контент
// Deprecated, существует более короткая запись инициализации
-------------------
$.dimodal('content', '.content', {
	button: '.button'
});

// Объявление окна через кнопку и указание контента
// Deprecated, существует более короткая запись инициализации
-------------------
$.dimodal('button', '.button', {
	content: '.content'
});

// Объявление окна одним объектом
-------------------
$.dimodal({
	button: '.button',
	content: '.content'
});

// Объявление окна через контент и указание кнопки
-------------------
$('.content').dimodal({
	button: '.button'
});

// Показать окно по имени, имя это параметр name при инициализации
-------------------
$.dimodal('open', name);

// Скрыть окно по имени, имя это параметр name при инициализации
-------------------
$.dimodal('close', name);

// Скрыть все окна
-------------------
$.dimodal('closeAll');

// Показать все окна мгновенно
-------------------
$.dimodal('openAllForce');

// Скрыть все окна мгновенно
-------------------
$.dimodal('closeAllForce');

// Получить текущее открытое окно на переднем плане
-------------------
$.dimodal('getCurrentItem');

// Получить все инициализированные окна
-------------------
$.dimodal();

// Получить текущюю инициализацию плагина в колбеке, пример
-------------------
$.dimodal({
	button: '.button',
	onAfterOpen: function(){

		this - это текущий плагин
		в нем лежат и опции и переменные

		this.$element - это контент модалки

		this.и так далее

	}
});


*/

;(function($, window, document, undefined){
	
	'use strict';
 
	// Имя плагина
	var pluginName = 'dimodal';

	// Стандартные настройки плагина
	var defaults = {
		name: false,
		button: false,
		content: false,
		ajaxContentFormat: function(data){
			return data.html;
		},
		autoOpen: false,
		closeOnEscape: true,
		closeOnBackgroundClick: true,
		destroyOnClose: false,
		displayCloseButton: true,
		stopPropagation: false,
		legacyDifbackSupport: false,
		contentBackgroundColor: 'transparent', // #fff, rgb()
		contentAligment: 'center', // .dimodal-aligner--aligned-CENTER
		contentOpenAnimationName: 'fadein', // .dimodal-content-animation--FADEIN-1
		contentCloseAnimationName: 'fadeout', // .dimodal-content-animation--FADEOUT-0
		backgroundOpenAnimationName: 'fadein', // .dimodal-background-animation--FADEIN-1
		backgroundCloseAnimationName: 'fadeout', // .dimodal-background-animation--FADEOUT-0
		animationForceName: 'dimodal-animation--force',
		animationFillmodeFix: 'dimodal-animation--fillmodefix',
		modalClasses: '',
		backgroundClass: '',
		onBeforeHolderOpen: function(){},
		onAfterHolderOpen: function(){},
		onBeforeHolderClose: function(){},
		onAfterHolderClose: function(){},
		onBeforeOpen: function(){},
		onAfterOpen: function(){},
		onBeforeClose: function(){},
		onAfterClose: function(){},
		onBeforeDestroy: function(){},
		onAfterDestroy: function(){},
		onStateChange: function(){},
		itemHolderTemplate:	'<div class="dimodal-item">'+
								'<div class="dimodal-background"></div>'+
								'<div class="dimodal-scroller">'+
									'<div class="dimodal-aligner">'+
										'<div class="dimodal-content">'+
											'<div class="dimodal-content__inner"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>',
		closeButtonTemplate: '<div class="dimodal-hide dimodal-close dimodal-close j-dimodal-close"><i class="fa fa-fw fa-times"></i></div>',
		
		// (Deprecated) Блок устаревших опций для обратной совместимости
		autoShow: null,
		hideOnEscape: null,
		destroyOnHide: null,
		hideOnBackgroundClick: null,
		displayHideButton: null,
		contentShowAnimationName: null,
		contentHideAnimationName: null,
		backgroundShowAnimationName: null,
		backgroundHideAnimationName: null,
		onBeforeShow: null,
		onAfterShow: null,
		onBeforeHide: null,
		onAfterHide: null
	};

	// Состояния
	var states = {
		closed: 'closed',
		opened: 'opened'
	};
	
	// Глобальные переменные
	var globals = {
		transitionEventName: false,
		animationStartEventName: false,
		animationEndEventName: false,
		isScreenLocked: false,
		$mainHolder: false,
		mainHolderClosed: false,
		incrementId: false,
		currentItem: false,
		currentIncrementId: false,
		escapeAttached: false,
		hashchangeAttached: false,
		openCounter: 0,
		items: {}
	};

	// Конструктор плагина
	function plugin(element, options){
		this.incrementId = false;
		this.openNumber = false;
		this.currentButton = false;
		this.$currentButton = false;
		this.element = element;
		this.$element = $(element);
		this.$itemHolder = false;
		this.state = states.closed;
		this.callOptions = options;
		this.options = $.extend({}, defaults, options);
		this.dataOptions = this.$element.data(pluginName);
		
		// forgot wtf is this
		if(typeof this.dataOptions === 'string'){
			this.dataOptions = this.dataOptions.replace(/\'/g, '"');
			this.dataOptions = this._tryParseJson(this.dataOptions);
			if(typeof this.dataOptions === 'object'){
				var actual_this = this;
				$.each(this.options, function(key){
					if(actual_this.dataOptions[key]){
						var obj = new Object();
						obj[key] = actual_this.dataOptions[key];
						actual_this.options = $.extend({}, actual_this.options, obj);
					}
				});
			}
		}

		this._contentOpenAnimationName = 'dimodal-content-animation--'+this.options.contentOpenAnimationName+'-1';
		this._contentCloseAnimationName = 'dimodal-content-animation--'+this.options.contentCloseAnimationName+'-0';

		this._backgroundOpenAnimationName = 'dimodal-background-animation--'+this.options.backgroundOpenAnimationName+'-1';
		this._backgroundCloseAnimationName = 'dimodal-background-animation--'+this.options.backgroundCloseAnimationName+'-0';

		//<fallback>
		if(this.options.contentShowAnimationName !== null){
			this._contentOpenAnimationName = 'dimodal-content-animation--'+this.options.contentShowAnimationName+'-1';
		}
		if(this.options.contentHideAnimationName !== null){
			this._contentCloseAnimationName = 'dimodal-content-animation--'+this.options.contentHideAnimationName+'-0';
		}

		if(this.options.backgroundShowAnimationName !== null){
			this._backgroundOpenAnimationName = 'dimodal-background-animation--'+this.options.backgroundShowAnimationName+'-1';
		}
		if(this.options.backgroundHideAnimationName !== null){
			this._backgroundCloseAnimationName = 'dimodal-background-animation--'+this.options.backgroundHideAnimationName+'-0';
		}
		//</fallback>

		this._init();
	}

	// Добавляем методы
	$.extend(plugin.prototype, {
		//<examples>
		_private: function(){
			// Private function, do not touch it, it is plugin functions.
		},
		public: function(){
			// Public function, you can call it.
		},
		example_callback_function: function(){
			//In your plugin call inside callback function use:
			//this - everything you need about you call and plugin
			//this.element - DOM element, content in call options
			//this.$element - jquery element, content in call options
			//this.options - merged options with defaults
			//this.callOptions - options you used in your call
			//this.otherFunction(); call another function like this.close() to close modal; 
		},
		//</examples>
		_init: function(){

			var actual_this = this;

			if(!globals.$mainHolder){
				globals.$mainHolder = true;
				globals.$mainHolder = actual_this._createMainHolder();
				if(!actual_this._isMainHolderClosed()){
					this._closeMainHolder();
				}
			}
			if(!globals.transitionEventName){
				globals.transitionEventName = actual_this._getTransitionEventName();
			}
			if(!globals.animationStartEventName){
				globals.animationStartEventName = actual_this._getAnimationStartEventName();
			}
			if(!globals.animationEndEventName){
				globals.animationEndEventName = actual_this._getAnimationEndEventName();
			}
			if(!globals.escapeAttached){
				globals.escapeAttached = true;
				$(document).on('keyup', function(e){
					if(e.keyCode === 27 && globals.currentItem){
						//<fallback>
						if(actual_this.options.hideOnEscape !== null){
							actual_this.options.closeOnEscape = actual_this.options.hideOnEscape;
						}
						//</fallback>
						if(actual_this.options.closeOnEscape === true)
						{
							globals.currentItem._close();
						}					
					}
				});
			}
			if(!actual_this.incrementId){
				if(globals.incrementId === false){
					globals.incrementId = 0;
				}else{
					globals.incrementId++;
				}
				actual_this.incrementId = globals.incrementId;
				globals.items[actual_this.incrementId] = actual_this;
			}
			if(!actual_this.$itemHolder){
				actual_this.$itemHolder = actual_this._createItemHolder();
				actual_this.$itemHolder.on('click', '.j-dimodal-close', function(){
					actual_this._close();
				});
				actual_this.$itemHolder.on('click', function(e){
					//<fallback>
					if(actual_this.options.hideOnBackgroundClick !== null){
						actual_this.options.closeOnBackgroundClick = actual_this.options.hideOnBackgroundClick;
					}
					//</fallback>
					if(actual_this.options.closeOnBackgroundClick === true)
					{
						if(!actual_this.$itemHolder.find('.dimodal-content').is(e.target) && !actual_this.$itemHolder.find('.dimodal-content').has(e.target).length){
							actual_this._close();
						}
					}
				});
				
				if(actual_this.options.customCloseButton){
					
					actual_this.$itemHolder.find(actual_this.options.customCloseButton).on('click', function(){
						actual_this._close();
					});
				}
				
				//<fallback>
				if(actual_this.options.autoShow !== null){
					actual_this.options.autoOpen = actual_this.options.autoShow;
				}
				//</fallback>
				if(actual_this.options.autoOpen){
					actual_this._open();
				}
			}
			if(this.options.button){
				
				var button_type = typeof this.options.button;
				
				if(actual_this.options.button instanceof jQuery){
					(actual_this.options.button).on('click', function(){
						actual_this.currentButton = this;
						actual_this.$currentButton = $(this);
						actual_this._open();
					});
				}else if(button_type === 'string'){
					
					$(document).on('click', this.options.button, function(){
						actual_this.currentButton = this;
						actual_this.$currentButton = $(this);
						actual_this._open();
					});
					
				}

			}

			// does it work??
			var hash = window.location.hash.slice(1);
			if(hash !== '' &&  hash === actual_this.options.name){
				actual_this._open();
				history.pushState('', document.title,window.location.pathname + window.location.search);
			}
		},
		_createMainHolder: function(){
			var $body = $(document.body);
			var $mainHolderTemplate = $('<div class="dimodal"></div>');
			$mainHolderTemplate.appendTo($body);

			return $mainHolderTemplate;
		},
		_createItemHolder: function(){
			var $itemHolderTemplate = $(this.options.itemHolderTemplate);
			
			if(this.options.stopPropagation === true){
				$itemHolderTemplate.on('click', function(e){
					e.stopPropagation();
				});
			}
			
			// Имя окна в дата атрибут, чтобы можно было видеть в разметке
			if(this.options.name){
				$itemHolderTemplate.attr('data-dimodal-name', this.options.name);
			}
			
			$itemHolderTemplate.addClass(this.options.modalClasses);
			$itemHolderTemplate.appendTo(globals.$mainHolder);

			var actual_this = this;
			var content_type = typeof this.options.content;

			// Установить скрытое состояние для фона, зафорсить его
			$itemHolderTemplate.find('.dimodal-background').addClass(this.options.backgroundClass);

			// Установить скрытое состояние для фона, зафорсить его
			$itemHolderTemplate.find('.dimodal-background').addClass(this.options.animationForceName).addClass(this._backgroundCloseAnimationName);
			
			// Установить скрытое состояние для обёртки контента, зафорсить его
			$itemHolderTemplate.find('.dimodal-content').addClass(this.options.animationForceName).addClass(this._contentCloseAnimationName);

			//<fallback>
			if(this.options.displayHideButton !== null){
				this.options.displayCloseButton = this.options.displayHideButton;
			}
			//</fallback>
			// Добавить кнопку закрыть форму если такая нужна
			if(this.options.displayCloseButton === true){
				$itemHolderTemplate.find('.dimodal-content').append(actual_this.options.closeButtonTemplate);
			}

			// Заалигнить контент
			$itemHolderTemplate.find('.dimodal-aligner').addClass('dimodal-aligner--aligned-'+actual_this.options.contentAligment);
			
			// Задать фон подложке
			$itemHolderTemplate.find('.dimodal-content__inner').css('background-color', actual_this.options.contentBackgroundColor);
			
			// Положить контент в холдер
			var content_we_working_with;
			if(actual_this.options.cloneContent === true){
				content_we_working_with = actual_this.$element.clone();
			}else{
				content_we_working_with = actual_this.$element;
			}
			$itemHolderTemplate.find('.dimodal-content__inner').append(content_we_working_with);
			
			// Если был задан параметр контент, то используем его вместо элемент
			if(this.options.content){
				if(this.options.content instanceof jQuery){
					
					if(actual_this.options.cloneContent === true){
						var $clone = this.options.content.clone();
						$itemHolderTemplate.find('.dimodal-content__inner').html($clone);
					}else{
						$itemHolderTemplate.find('.dimodal-content__inner').html(this.options.content);
					}
					
					
				}else if(content_type === 'object'){
					if(actual_this.options.content.ajax){
						$.ajax(this.options.content.ajax).done(function(data){
							var html;
							if($.isFunction(actual_this.options.ajaxContentFormat)){
								html = actual_this.options.ajaxContentFormat(data);
							}
							$itemHolderTemplate.find('.dimodal-content__inner').html(html);
						});
					}
				}else if(content_type === 'function'){

				}else if(content_type === 'string'){
					if($(document.body).find(this.options.content).length){
						
						if(actual_this.options.cloneContent === true){
							//var $clone = $(this.options.content).clone();
							$itemHolderTemplate.find('.dimodal-content__inner').html($clone);
						}else{
							$itemHolderTemplate.find('.dimodal-content__inner').html($(this.options.content));
						}
						
						
					}else{

					}
				}
			}

			return $itemHolderTemplate;
		},
		_getScrollbarWidth: function(){
			var outer = document.createElement('div');
			var inner = document.createElement('div');
			var widthNoScroll;
			var widthWithScroll;
			outer.style.visibility = 'hidden';
			outer.style.width = '100px';
			document.body.appendChild(outer);
			widthNoScroll = outer.offsetWidth;
			outer.style.overflow = 'scroll';
			inner.style.width = '100%';
			outer.appendChild(inner);
			widthWithScroll = inner.offsetWidth;
			outer.parentNode.removeChild(outer);
			return widthNoScroll - widthWithScroll;
		},
		_getViewportWidth: function(){
			var width;
			if(window.innerWidth){
				width = window.innerWidth;
			}else if(document.documentElement && document.documentElement.clientWidth){
				width = document.documentElement.clientWidth;
			}else{
				console.warn('Can not detect viewport width.');
			}
			return width;
		},
		_getTransitionEventName: function(){
			var i;
			var el = document.createElement('div');
			var transitions = {
				'transition': 'transitionend',
				'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
				'MozTransition': 'transitionend',
				'WebkitTransition': 'webkitTransitionEnd'
			};

			for(i in transitions){
				if(el.style[i] !== undefined){
					return transitions[i];
				}
			}
		},
		_getAnimationStartEventName: function(){
			var i;
			var el = document.createElement('div');

			var animations = {
				'animation': 'animationstart',
				'OAnimation': 'oAnimationStart',
				'MozAnimation': 'animationstart',
				'WebkitAnimation': 'webkitAnimationStart'
			};

			for (i in animations){
				if(el.style[i] !== undefined){
					return animations[i];
				}
			}
		},
		_getAnimationEndEventName: function(){
			var i; 
			var el = document.createElement('div');

			var animations = {
				'animation': 'animationend',
				'OAnimation': 'oAnimationEnd',
				'MozAnimation': 'animationend',
				'WebkitAnimation': 'webkitAnimationEnd'
			};

			for (i in animations){
				if(el.style[i] !== undefined){
					return animations[i];
				}
			}
		},
		_openMainHolder: function(){
			var actual_this = this;
			actual_this.options.onBeforeHolderOpen.call(this);
			globals.mainHolderClosed = false;
			globals.$mainHolder.css({
				'visibility': 'visible',
				'z-index': '1000'
			});
			actual_this.lockScreen();
			actual_this.options.onAfterHolderOpen.call(this);
		},
		_closeMainHolder: function(){
			this.options.onBeforeHolderClose.call(this);
			globals.mainHolderClosed = true;
			globals.openCounter = 0;
			globals.$mainHolder.css({
				'visibility': 'hidden',
				'z-index': '-1'
			});
			this.unlockScreen();
			this.options.onAfterHolderClose.call(this);
		},
		_openItemContent: function(force){
	
			var actual_this = this;
			var deferred = $.Deferred();
			var block = actual_this.$itemHolder.find('.dimodal-content');
			
			if(block.hasClass(actual_this._contentOpenAnimationName)){
				
				deferred.resolve();
				
				block.addClass(actual_this.options.animationFillmodeFix);
				
			}else{
				
				block.one(globals.animationEndEventName, function() {
					
					deferred.resolve();

					block.addClass(actual_this.options.animationFillmodeFix);
					
				});
				
			}
			
			if(force){
				block.addClass(actual_this.options.animationForceName);
			}else{
				block.removeClass(actual_this.options.animationForceName);
			}
			
			block.removeClass(actual_this._contentCloseAnimationName);
			block.addClass(actual_this._contentOpenAnimationName);
			
			return deferred.promise();
		},
		_closeItemContent: function(force){

			var actual_this = this;
			var deferred = $.Deferred();
			var block = actual_this.$itemHolder.find('.dimodal-content');
			
			block.removeClass(actual_this.options.animationFillmodeFix);
			
			if(block.hasClass(actual_this._contentCloseAnimationName)){
				
				deferred.resolve();

			}else{
				block.one(globals.animationEndEventName, function() {
					
					deferred.resolve();
					
				});
			}
			
			if(force){
				block.addClass(actual_this.options.animationForceName);
			}else{
				block.removeClass(actual_this.options.animationForceName);
			}
			
			block.removeClass(actual_this._contentOpenAnimationName);
			block.addClass(actual_this._contentCloseAnimationName);
			
			return deferred.promise();
		},
		_openItemBackground: function(force){
			
			var actual_this = this;
			var deferred = $.Deferred();
			var block = actual_this.$itemHolder.find('.dimodal-background');
			
			if(block.hasClass(actual_this._backgroundOpenAnimationName)){
				
				deferred.resolve();
				
				block.addClass(actual_this.options.animationFillmodeFix);
				
			}else{
				block.one(globals.animationEndEventName, function(){
					
					deferred.resolve();
					
					block.addClass(actual_this.options.animationFillmodeFix);
					
				});	
			}
			
			if(force){
				block.addClass(actual_this.options.animationForceName);
			}else{
				block.removeClass(actual_this.options.animationForceName);
			}
			
			block.removeClass(actual_this._backgroundCloseAnimationName);
			block.addClass(actual_this._backgroundOpenAnimationName);
			
			return deferred.promise();
		},
		_closeItemBackground: function(force){
			
			var actual_this = this;
			var deferred = $.Deferred();
			var block = actual_this.$itemHolder.find('.dimodal-background');
			
			block.removeClass(actual_this.options.animationFillmodeFix);

			if(block.hasClass(actual_this._backgroundCloseAnimationName)){
				
				deferred.resolve();
				
			}else{
				block.one(globals.animationEndEventName, function(){
					
					deferred.resolve();
					
				});
			}
			
			if(force){
				block.addClass(actual_this.options.animationForceName);
			}else{
				block.removeClass(actual_this.options.animationForceName);
			}
			
			block.removeClass(actual_this._backgroundOpenAnimationName);
			block.addClass(actual_this._backgroundCloseAnimationName);
			
			return deferred.promise();
		},
		_isMainHolderClosed: function(){
			return globals.mainHolderClosed;
		},
		_isScreenLocked: function(){
			return globals.isScreenLocked;
		},
		_isAllItemsClosed: function(){
			var allItemsClosed = true;
		
			$.each(globals.items, function(key, val){
				if(globals.items[key].state !== 'closed'){
					allItemsClosed = false;
				}
			});

			return allItemsClosed;
		},
		_tryParseJson: function(string){
			try{
				var o = JSON.parse(string);
                                // Проверка json
				// Handle non-exception-throwing cases:
				// Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
				// but... JSON.parse(null) returns null, and typeof null === "object", 
				// so we must check for that, too. Thankfully, null is falsey, so this suffices:
				if(o && typeof o === 'object'){
					return o;
				}
			}
			catch(e){}
			
			console.warn('String `'+string+'` is not valid json string');
			return false;
		},
		_setState: function(state){
			this.state = states[state];
			this.options.onStateChange.call(this);
		},
		_moveOnFront: function(){
			// ONLY CSS
			this.$itemHolder.css({'z-index': globals.openCounter});
		},
		_moveOutFront: function(){
			// ONLY CSS
			this.$itemHolder.css({'z-index': ''});
			if(this.$itemHolder.attr('style') === ''){
				this.$itemHolder.removeAttr('style');
			}
		},
		_setCurrent: function(){
			globals.currentIncrementId = this.incrementId;
			globals.currentItem = this;
		},
		_unsetCurrent: function(){
			if(this._isAllItemsClosed()){
				globals.currentIncrementId = false;
				globals.currentItem = false;
			}else{
				var maxOpenNumber = 0;
				$.each(globals.items, function(){
					if(this.openNumber && this.openNumber > maxOpenNumber){
						maxOpenNumber = this.openNumber;
					}
				});
				$.each(globals.items, function(){
					if(this.openNumber === maxOpenNumber){
						globals.currentIncrementId = this.incrementId;
						globals.currentItem = this;
						return false;
					}
				});
			}	
		},
		getItemIncrementId: function(){
			return this.incrementId;
		},
		show: function(){ // Deprecated
			this._open();
		},
		open: function(){
			this._open();
		},
		showForce: function(){ // Deprecated
			this._open(true, true);
		},
		openForce: function(){
			this._open(true, true);
		},
		_open: function(forceContent, forceBackground){
			
			var deferred = $.Deferred();
			var actual_this = this;
			var onBeforeOpenSuccess = true;

			//<fallback>
			if(actual_this.options.onBeforeShow !== null){
				actual_this.options.onBeforeOpen = actual_this.options.onBeforeShow;
			}
			//</fallback>
			
			if(actual_this.options.onBeforeOpen && actual_this.options.onBeforeOpen.call(this) === false){
				onBeforeOpenSuccess = false;
			}

			if(onBeforeOpenSuccess){
				
				// Что-то для плагина дифбек
				if(actual_this.options.legacyDifbackSupport === true){
					//actual_this.$element.find('.field textarea, .field input').val('').prop('checked', false);
					actual_this.$element.find('.fform-data, .diFBack-form').show();
					actual_this.$element.find('.success, .msg').hide();
				}
				
				if(this._isMainHolderClosed()){
					this._openMainHolder();
				}

				this._setState('opened');
				globals.openCounter++;
				this.openNumber = globals.openCounter;
				this._moveOnFront();
				this._setCurrent();

				if(!this._isAllItemsClosed()){
					$.each(globals.items, function(){
						if(this.incrementId !== globals.currentIncrementId && this.state === 'opened'){
							this._closeItemBackground(true);
							forceBackground = true;
						}
					});
				}

				var promise_openContent = this._openItemContent(forceContent);
				var promise_openBackground = this._openItemBackground(forceBackground);

				$.when(promise_openContent, promise_openBackground).done(function(){
					deferred.resolve();
					
					//<fallback>
					if(actual_this.options.onAfterShow !== null){
						actual_this.options.onAfterOpen = actual_this.options.onAfterShow;
					}
					//</fallback>
					
					actual_this.options.onAfterOpen.call(actual_this);
				});
				
			}else{
				deferred.reject();
			}
			
			return deferred.promise();
		},
		hide: function(){ // Deprecated
			this._close();
		},
		close: function(){
			this._close();
		},
		hideForce: function(){ // Deprecated
			this._close(true, true);
		},
		closeForce: function(){
			this._close(true, true);
		},
		_close: function(forceContent, forceBackground){

			var deferred = $.Deferred();
			var actual_this = this;
			var onBeforeCloseSuccess = true;
			var fn = false;
			
			//<fallback>
			if(actual_this.options.onBeforeHide !== null){
				actual_this.options.onBeforeClose = actual_this.options.onBeforeHide;
			}
			//</fallback>
			
			if(actual_this.options.onBeforeClose && actual_this.options.onBeforeClose.call(this) === false){
				onBeforeCloseSuccess = false;
			}
			
			if(onBeforeCloseSuccess){
				this._setState('closed');
				this.openNumber = false;
				this._unsetCurrent();

				if(!this._isAllItemsClosed()){
					$.each(globals.items, function(){
						if(this.incrementId === globals.currentIncrementId && this.state === 'opened'){
							this._openItemBackground(true);
							forceBackground = true;
						}
					});
				}

				var promise_closeContent = this._closeItemContent(forceContent);
				var promise_closeBackground = this._closeItemBackground(forceBackground);
				
				$.when(promise_closeContent, promise_closeBackground).done(function(){
					actual_this._moveOutFront();
					deferred.resolve();
					

					//<fallback>
					if(actual_this.options.onAfterHide !== null){
						actual_this.options.onAfterClose = actual_this.options.onAfterHide;
					}
					//</fallback>
					actual_this.options.onAfterClose.call(actual_this);
					
					//<fallback>
					if(actual_this.options.destroyOnHide !== null){
						actual_this.options.destroyOnClose = actual_this.options.destroyOnHide;
					}
					//</fallback>
					
					if(actual_this.options.destroyOnClose){
						actual_this._destroy();
					}
					if(actual_this._isAllItemsClosed()){
						if(!actual_this._isMainHolderClosed()){
							actual_this._closeMainHolder();
						}			
					}
				});
			}else{
				deferred.reject();
			}
			

			return deferred.promise();		
	
		},
		destroy: function(){
			this._destroy(true);
		},
		_destroy: function(called_manually){ // Внутренние вызовы _detroy() должны выполняться только на скрытых модалках
	
			this.options.onBeforeDestroy.call(this);
			var actual_this = this;
			
			var promise;
			if(called_manually){
				if(this.state !== 'closed'){
					promise = this._close();
				}else{
					promise = true;
				}
			}
			
			$.when(promise).done(function(){
				delete(globals.items[actual_this.incrementId]);
				actual_this.$element.removeData(pluginName);
				actual_this.$itemHolder.detach();
				actual_this.options.onAfterDestroy.call(actual_this);
			});

		},
		getState: function(){
			return this.state;
		},
		lockScreen: function(){
			
			var actual_this = this;
			
			if(!this._isScreenLocked()){
				globals.isScreenLocked = true;
				
				var $body = $(document.body);
				$body.css({
					'overflow': 'hidden',
					'margin-right': (parseInt($body.css('margin-right'), 10) + actual_this._getScrollbarWidth())+'px'
				});
				
				var $fixedElements = $('*').not('[class^="dimodal"]').filter(function(){
					if($(this).css('position') === 'fixed' && $(this).css('right') === '0px')
					{
						return $(this);
					}
				});
				
				$fixedElements.each(function(){
					$(this).addClass('dimodal--fixedfix');
					$(this).css({
						'margin-right': (parseInt($(this).css('margin-right'), 10) + actual_this._getScrollbarWidth())+'px'
					});
				});

			}
		},
		unlockScreen: function(){
			
			var actual_this = this;
			
			if(this._isScreenLocked()){
				globals.isScreenLocked = false;
				var $body = $(document.body);

				var bodyNewMarginRight = parseInt($body.css('margin-right'), 10) - actual_this._getScrollbarWidth();
				var bodyNewMarginRightString = '';
				
				if(bodyNewMarginRight === 0){
					bodyNewMarginRightString = '';
				}else{
					bodyNewMarginRightString = bodyNewMarginRight+'px';
				}
				
				$body.css({
					'overflow': '',
					'margin-right': bodyNewMarginRightString
				});
				
				if($body.attr('style') === ''){
					$body.removeAttr('style');
				}
				
				$('.dimodal--fixedfix').each(function(){
					
					var newMarginRight = parseInt($(this).css('margin-right'), 10) - actual_this._getScrollbarWidth();
					var newMarginRightString = '';

					if(newMarginRight === 0){
						newMarginRightString = '';
					}else{
						newMarginRightString = newMarginRight+'px';
					}

					$(this).css({
						'margin-right': newMarginRightString
					});

					if($(this).attr('style') === ''){
						$(this).removeAttr('style');
					}
					
					$(this).removeClass('dimodal--fixedfix');
					
				});
				
			}
		}
	});

	$.fn.dimodal = function(options){
		return this.each(function(){
			var $this = $(this);
			var data = $this.data(pluginName);

			if(!data){
				data = new plugin(this, options);
				$this.data(pluginName, data);
			}

			// Disabled it cause its does not actually work
			/*
			if(typeof options === 'string' && options.charAt(0) !== '_' && $.isFunction(plugin.prototype[options])){
				console.log('its string');
				data[options].apply(data, Array.prototype.slice.call(arguments, 1));
			}else if(typeof options === 'object'){
				console.log('its object');
			}else{
				$.error('Для плагина "'+pluginName+'" метода "'+options+'" не существует.');
			}
			*/
			
		});
	};
	
	// Создание глобальной функции
	$.extend({
		[pluginName]: function(argument1, argument2, argument3){
			
			if(arguments.length === 3){ // Поддержка вызовов более старой версии плагина, где могло быть три аргумента вызова
				
				// argument1 - action(string)
				// argument2 - target(string)
				// argument3 - options(object)
				
				if(argument1 === 'button'){
					argument3.button = argument2;
					return $('<div/>').dimodal(argument3);
				}
				if(argument1 === 'content'){
					return $(argument2).dimodal(argument3);
				}
				if(argument1 === 'show' || argument1 === 'open'){
					$.each(globals.items, function(){
						if(this.options.name === argument2){
							this.open();
						}
					});
				}
				if(argument1 === 'hide' || argument1 === 'close'){
					if(argument2){
						$.each(globals.items, function(){
							if(this.options.name === argument2){
								this.close();
							}
						});
					}else{
						$.each(globals.items, function(){
							this.close();
						});
					}
				}
				if(argument1 === 'showAll' || argument1 === 'openAll'){
					$.each(globals.items, function(){
						this.open();
					});
				}
				if(argument1 === 'showAllForce' || argument1 === 'openAllForce'){
					$.each(globals.items, function(){
						this.openForce();
					});
				}
				if(argument1 === 'hideAll' || argument1 === 'closeAll'){
					$.each(globals.items, function(){
						this.close();
					});
				}
				if(argument1 === 'hideAllForce' || argument1 === 'closeAllForce'){
					$.each(globals.items, function(){
						this.closeForce();
					});
				}
				if(argument1 === 'getCurrentIncrementId'){
					return globals.currentIncrementId;
				}
				if(argument1 === 'getCurrentItem'){
					return globals.currentItem;
				}

			}else if(arguments.length === 2){
				
				// argument1 - action(string)
				// argument2 - options(string)
				
				if(argument1 === 'show' || argument1 === 'open'){
					$.each(globals.items, function(){
						if(this.options.name === argument2){
							this.open();
						}
					});
				}
				
				if(argument1 === 'hide' || argument1 === 'close'){
					$.each(globals.items, function(){
						if(this.options.name === argument2){
							this.close();
						}
					});
				}
				
			}else if(arguments.length === 1){
				
				// argument1 - action(string/object)
				
				if(typeof argument1 === 'string'){
					
					if(argument1 === 'showAll' || argument1 === 'openAll'){
						$.each(globals.items, function(){
							this.open();
						});
					}

					if(argument1 === 'showAllForce' || argument1 === 'openAllForce'){
						$.each(globals.items, function(){
							this.openForce();
						});
					}

					if(argument1 === 'hideAll' || argument1 === 'closeAll'){
						$.each(globals.items, function(){
							this.hide();
						});
					}
					
					if(argument1 === 'hideAllForce' || argument1 === 'closeAllForce'){
						$.each(globals.items, function(){
							this.closeForce();
						});
					}
					
					if(argument1 === 'getCurrentIncrementId'){
						return globals.currentIncrementId;
					}
					
					if(argument1 === 'getCurrentItem'){
						return globals.currentItem;
					}
					
				}else if(typeof argument1 === 'object'){
					
					return $(argument1.content).dimodal(argument1);
					
				}
				
			}else if(arguments.length === 0){
				
				return globals.items;
				
			}

		}
	});
	

})(jQuery, window, document);