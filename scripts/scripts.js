$(function(){
	
	//	Проверялка ширины элементов
	//	$('*').each(function(){
	//		if($(this).outerWidth() > 320){
	//			console.log($(this));
	//		}
	//	});
	
	// Метод jquery для поиска подстроки в строке без учета большие/маленькие буквы
	jQuery.expr[':'].icontains = function(a, i, m) {
		return jQuery(a).text().toUpperCase()
			.indexOf(m[3].toUpperCase()) >= 0;
	};
	
	// Модальные окна
	if(true){
			
		
		$(document).on('click', '[name="comment-challenge"]', function(){
			var widget = $(this).closest('.dtx-comment');
			var modal_content = widget.find('[data-name="dtx-comment__challenge"]');
			$.dimodal({
				content: modal_content,
				cloneContent: true,
				destroyOnClose: true,
				displayCloseButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentOpenAnimationName: 'mixed',
				contentCloseAnimationName: 'mixed',
				customCloseButton: '.dtx-modalHead__close'
			});
		});
		
		
		$(document).on('click', '[name="comment-accept"]', function(){
			var widget = $(this).closest('.dtx-comment');
			var modal_content = widget.find('[data-name="dtx-comment__accept"]');
			$.dimodal({
				content: modal_content,
				cloneContent: true,
				destroyOnClose: true,
				displayCloseButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentOpenAnimationName: 'mixed',
				contentCloseAnimationName: 'mixed',
				customCloseButton: '.dtx-modalHead__close'
			});
		});
		

		
		// Модальное окно редактирования списка курсов
		$.dimodal({
			name: 'editData',
			content: '.dtx-dataEditor',
			button: '.dtx-editData',
			contentAligment: 'mixed',
			contentShowAnimationName: 'mixed',
			contentHideAnimationName: 'mixed',
			displayHideButton: false,
			onBeforeShow: function(){
				var plugin_this = this;
				var modal_x = this.$element.find('.dtx-modalHead__close');
				modal_x.on('click', function(){
					plugin_this.hide();
					modal_x.off('click');
				});
			}
		});

		// Модалькое окно для нижнего мобильного меню
		$.dimodal({
			name: 'mobileMenu',
			button: '.dtx-menuLauncher',
			content: '.dtx-modal--menu',
			displayHideButton: false,
			contentAligment: 'mixed',
			contentShowAnimationName: 'mixed',
			contentHideAnimationName: 'mixed',
			onBeforeShow: function(){
				// Делаем мобильно меню выше модального окна
				$('.dtx-sidebar').addClass('dtx-sidebar--mobileVisible');
				if(this.$currentButton){
					this.$currentButton.addClass('dtx-menuItem--active');
				}
				
			},
			onBeforeHide: function(){
				if(this.$currentButton){
					this.$currentButton.removeClass('dtx-menuItem--active');
				}
			},
			onAfterHide: function(){
				// Возвращаем мобильное меню в нормальное состояние
				$('.dtx-sidebar').removeClass('dtx-sidebar--mobileVisible');
			}
		});

		// Разлогин
		$.dimodal({
			name: 'exitQuestion',
			button: '[name="profile-exit"]',
			content: '[data-modal-name="profile-exit"]',
			stopPropagation: true,
			displayCloseButton: false,
			customCloseButton: '.dtx-modalHead__close',
			contentAligment: 'mixed',
			contentOpenAnimationName: 'mixed',
			contentCloseAnimationName: 'mixed'
		});
		
		// Закрыть модалку меню по клику по вернхнему меню
		$(document).on('click', '.nft-wrapper', function(){
			$.dimodal('hide', 'mobileMenu');
		});
		
		// Скрыть открытое модальное окно с меню
		$(document).on('click', '.dtx-menuItem--active', function(){
			$.dimodal('hide', 'mobileMenu');
			return false;
		});
		
	}
	
	// Блок для отображения заполненности текстовых полей
	if(true){

		function fillInput(el){
			if($(el).val().length){
				$(el).closest('.atm-input').addClass('atm-input--filled');
			}else{
				$(el).closest('.atm-input').removeClass('atm-input--filled');
			}
		}

		function fillSearch(el){
			if($(el).val().length){
				$(el).closest('.atm-search').addClass('atm-search--filled');
			}else{
				$(el).closest('.atm-search').removeClass('atm-search--filled');
			}
		}

		function fillTextarea(el){
			if($(el).val().length){
				$(el).closest('.atm-textarea').addClass('atm-textarea--filled');
			}else{
				$(el).closest('.atm-textarea').removeClass('atm-textarea--filled');
			}
		}
		
		function fillSelect(el){
			var widget = $(el).closest('.atm-select');
			var select = widget.find('.atm-select__select');
			var text = select.find('option:selected').text();
			var value = select.val();
			widget.find('.atm-select__replacer').text(text);
			widget.find('.atm-select__input').val(value);
			if($(el).val()){
				widget.addClass('atm-select--filled');
			}else{
				widget.removeClass('atm-select--filled');
			}
		}

		// Изменение инпута
		$(document).on('blur change input keyup', '.atm-input__input', function(){
			fillInput(this);
		});

		// Изменение поискового поля
		$(document).on('blur change input keyup', '.atm-search__search', function(){
			fillSearch(this);
		});

		// Изменение текстарии
		$(document).on('blur change input keyup', '.atm-textarea__textarea', function(){
			fillTextarea(this);
		});
		
		// Изменение селекта
		$(document).on('blur change input keyup', '.atm-select__select', function(){
			fillSelect(this);
		});

		// При загрузке страницы
		$('.atm-input__input').each(function(){
			fillInput(this);
		});

		// При загрузке страницы
		$('.atm-search__search').each(function(){
			fillSearch(this);
		});

		// При загрузке страницы
		$('.atm-textarea__textarea').each(function(){
			fillTextarea(this);
		});	
		
		// При загрузке страницы
		$('.atm-select__select').each(function(){
			fillSelect(this);
		});	
	
	}

	// Маски на инпутах
	if(true){
		$('[data-mask="phone"]').inputmask('+9 (999) 999-99-99');
		$('[data-mask="email"]').inputmask({
			mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
			greedy: !1,
			onBeforePaste: function(pastedValue, opts) {
				pastedValue = pastedValue.toLowerCase();
				return pastedValue.replace("mailto:", "");
			},
			definitions: {
				'*': {
					validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
					cardinality: 1,
					casing: "lower"
				},
				"-": {
					validator: "[0-9A-Za-z-]",
					cardinality: 1,
					casing: "lower"
				}
			}
		});
	}
	
	// Сбросы ошибок
	if(true){
		// Сброс отображения ошибки при изменении на элементы формы
		$(document).on('keyup input change blur', 'input, textarea', function(){
			$(this).closest('.atm-field').removeClass('atm-field--error');
		});

		// Сброс ошибки с инпута проверки телефона
		$(document).on('keyup input change blur', '.atm-phoneDigits__input--error', function(e){
			$(this).removeClass('atm-phoneDigits__input--error');
		});
	}
	
	// Формы
	if(true){
		// Форма логина
		$('[name="form-auth"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});

				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					form_el.find('[name="next"]').click();
				}
			},
			success: function(){
				console.log('success');
			}
		});

		// Форма регистрации физ лица
		$('[name="form-register-2"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					form_el.find('[name="next"]').click();
				}
			},
			success: function(){
				console.log('success');
			}
		});

		// Форма регистрации юр лица
		$('[name="form-register-1"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					form_el.find('[name="next"]').click();
				}
			},
			success: function(){
				console.log('success');
			}
		});

		// Форма регистрации юр лица с выставленной фирмой
		$('[name="form-register-1a"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					form_el.find('[name="next"]').click();
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма подтверждения номера телефона
		$('[name="form-confirm-phone"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Добавляем модификатор ошибки
							.addClass('atm-phoneDigits__input--error');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					var widget = form_el.closest('.atm-substep');
					widget.hide();
					form_el.find('[data-tosection="reset"]').click();
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма установки нового пароля
		$('[name="form-password-reset"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				var password = '';
				var password_repeat = '';
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				form_data.forEach(item => {
					if(item.name === 'password'){
						password = item.value;
					}
					if(item.name === 'password_repeat'){
						password_repeat = item.value;
					}
				});
				if(password !== password_repeat){
					form_data.forEach(item => {
						if(item.name === 'password_repeat'){
							form_el.find('[name="'+item.name+'"]')
								// Обертка поля
								.closest('.atm-field')
								// Добавляем модификатор ошибки
								.addClass('atm-field--error')
								// Поле текста ошибки
								.find('.atm-field__errorText')
								// Указываем текст ошибки
								.text('Пароли не совпадают');
						}
					});
					validated = false;
				}
				
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					form_el.closest('.atm-substep').hide().siblings('.atm-substep').show();
					form_el.closest('.atm-containerWrapper').find('.atm-containerWrapper__text').find('[data-tosection="login"]').hide().next().hide();
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма восстановления по email для юр.лица
		$('[name="form-remind-1-email"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					var widget = form_el.closest('.atm-substep');
					var form_entire = widget.find('.atm-form');
					var email = null;
					form_data.forEach(item => {
						if(item.name === 'email'){
							email = item.value;
						}
					});
					form_entire.hide();
					widget.siblings('.atm-remindSuccessEmail').show().find('.atm-accept__info2 a').text(email);
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма восстановления по телефону для юр.лица
		$('[name="form-remind-1-phone"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					var widget = form_el.closest('.atm-substep');
					widget.hide().siblings('.atm-confirmPhone').show().find('[name="phone_1"]').focus();
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма восстановления по email для физ.лица
		$('[name="form-remind-2-email"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					var widget = form_el.closest('.atm-substep');
					var form_entire = widget.find('.atm-form');
					var email = null;
					form_data.forEach(item => {
						if(item.name === 'email'){
							email = item.value;
						}
					});
					form_entire.hide();
					widget.siblings('.atm-remindSuccessEmail').show().find('.atm-accept__info2 a').text(email);
				}
			},
			success: function(){
				console.log('success');
			}
		});
		
		// Форма восстановления по телефону для физ.лица
		$('[name="form-remind-2-phone"]').ajaxForm({
			beforeSubmit: function(form_data, form_el, options){
				var validated = true;
				form_data.forEach(item => {
					if(item.required === true && item.value === ''){
						form_el.find('[name="'+item.name+'"]')
							// Обертка поля
							.closest('.atm-field')
							// Добавляем модификатор ошибки
							.addClass('atm-field--error')
							// Поле текста ошибки
							.find('.atm-field__errorText')
							// Указываем текст ошибки
							.text('Данное поле обязательно для заполнения');

						validated = false;
					}
				});
				if(validated === false){
					return false;
				}else{
					console.log('Перенести обработчик в success событие');
					var widget = form_el.closest('.atm-substep');
					widget.hide().siblings('.atm-confirmPhone').show().find('[name="phone_1"]').focus();
				}
			},
			success: function(){
				console.log('success');
			}
		});
	}
	
	// Заполнение полей -> сохранение значения в кнопке след. шаг
	if(true){
		// Поле email
		$(document).on('keyup blur', '[name="email"]', function(){
			var widget = $(this).closest('.atm-substep');
			var email = $(this).val();
			widget.find('[name="next"]').attr('data-email', email);
		});

		// Поле имя компании
		$(document).on('keyup blur', '[name="company_name"]', function(){
			var widget = $(this).closest('.atm-substep');
			var company_name = $(this).val();
			widget.find('[name="next"]').attr('data-choosed-name', company_name);
		});

		// Поле фио
		$(document).on('keyup blur', '[name="fio"]', function(){
			var widget = $(this).closest('.atm-substep');
			var fio = $(this).val();
			widget.find('[name="next"]').attr('data-fio', fio);
		});

		// Поле телефон
		$(document).on('keyup blur', '[name="phone"]', function(){
			var widget = $(this).closest('.atm-substep');
			var phone = $(this).val();
			widget.find('[name="next"]').attr('data-phone', phone);
		});
	}
	
	// Обработчики селекта
	if(true){
		
		// Фокусировка на инпуте селекта(открывание селекта)
		$(document).on('focus', '.atm-select__input', function(){
			
			// Полная конструкция селекта
			var widget = $(this).closest('.atm-select');
			
			if(widget.hasClass('atm-select--focused')){
				// Убираем фокусы со всех селектов
				$('.atm-select--focused').removeClass('atm-select--focused');
			}else{
				// Убираем фокусы со всех селектов
				$('.atm-select--focused').removeClass('atm-select--focused');
				// Добавляем модификтор фокусировки
				widget.addClass('atm-select--focused');
				// Убираем все прошлые опции, чтобы их пересоздать
				widget.find('.atm-select__scroller').html('');
				// Проходим по всем опциям настоящего селекта
				widget.find('.atm-select__select').find('option').each(function(){
					var text = $(this).text();
					var value = $(this).val();
					var disabled = $(this).prop('disabled');
					var selected = $(this).is(':selected');
					var hidden = null;
					// For some browsers, `attr` is undefined; for others,
					// `attr` is false.  Check for both.
					if(typeof $(this).attr('hidden') !== 'undefined' && $(this).attr('hidden') !== false){
						hidden = true;
					}else{
						hidden = false;
					}

					var disabled_html = '';
					var selected_html = '';
					var hidden_html = '';

					if(selected){
						selected_html = ' atm-select__option--selected';
					}else{
						selected_html = '';
					}

					if(disabled){
						disabled_html = ' atm-select__option--disabled';
					}else{
						disabled_html = '';
					}

					if(hidden){
						hidden_html = ' atm-select__option--hidden';
					}else{
						hidden_html = '';
					}

					// Заполняем искусственные опции
					$('<div class="atm-select__option'+selected_html+disabled_html+hidden_html+'" data-value="'+value+'">'+text+'</div>').appendTo(widget.find('.atm-select__scroller'));
				});				
			}
			


		});
		
		// Выбор опции искуственного селекта
		$(document).on('click', '.atm-select__option', function(){
			var widget = $(this).closest('.atm-select');
			var value = $(this).attr('data-value');
			widget.find('.atm-select__select').val(value).change();
			widget.removeClass('atm-select--focused');
		});

		// Блок прокликивания до документа
		$(document).on('click', '.atm-select', function(e){
			e.stopPropagation();
		});
		
		// Убрать фокусировки по клику вне селекта
		$(document).on('click', function(){
			$('.atm-select--focused').removeClass('atm-select--focused');
		});
		
		// Переброс фокусировки на инпут
		$(document).on('click', '.atm-select__replacer', function(){
			var widget = $(this).closest('.atm-select');
			widget.find('.atm-select__input').focus();
		});
	}
	
	// Развернуть / свернуть блок
	$(document).on('click', '.dtx-subtitle', function(){
		var widget = $(this).closest('.dtx-container');
		if(widget.find('.dtx-collapser').length){
			widget.toggleClass('dtx-container--collapsed');
		}
	});
	
	// Развернуть / свернуть блок вопрос-ответ 
	$(document).on('click', '.dtx-qaItem__header', function(){
		var widget = $(this).closest('.dtx-qaItem');
		widget.toggleClass('dtx-qaItem--collapsed');
	});

	// Выбор вкладки в регистрации, списке преподавателей
	$(document).on('click', '.atm-tabsButton__radio', function(e){
		var widget = $(this).closest('.atm-tabs');
		var stepId = $(this).val();
		var name = $(this).attr('name');
		var curerntStepId = $(this).attr('data-current-step');
		
		console.log(name);
		
		// Если происходит искуственный клик или если текущий шаг больше кликнутого пользователем или это вообще не табы регистрации
		if(e.originalEvent === undefined || ((curerntStepId !== undefined) && (curerntStepId > stepId)) || name !== 'register-step'){
			widget.find('.atm-tabsButton__radio').attr('data-current-step', stepId);

			$(this).closest('.atm-tabs').find('.atm-tabsButton__content').removeClass('atm-tabsButton__content--no-separator');
			$(this).closest('.atm-tabsButton').prev().find('.atm-tabsButton__content').addClass('atm-tabsButton__content--no-separator');

			widget.find('.atm-tabs__tab').hide();
			widget.find('.atm-tabs__tab[data-id="'+stepId+'"]').show();			
		}else{
			e.preventDefault();
		}
		

	});
	
	// Сброс текста в поисковом поле
	$(document).on('click', '.atm-search__cancel', function(){
	
		var widget = $(this).closest('.atm-search');
		
		if(widget.hasClass('atm-search--choosed')){
			widget.removeClass('atm-search--choosed');
			widget.find('.atm-search__search').data('choosed-id', '');
		}
		
		if(widget.hasClass('atm-search--filled')){
			widget.find('.atm-search__search').val('');
		}
		
		widget.find('.atm-search__search').focus().keyup();

	});
	
	// Сброс текста в текствовом поле
	$(document).on('click', '.atm-input__cancel', function(){
	
		var widget = $(this).closest('.atm-input');
		
		if(widget.hasClass('atm-input--filled')){
			widget.find('.atm-input__input').val('');
		}
		
		widget.find('.atm-input__input').focus().keyup();

	});
	
	// При клике на левую лупу в поисковом поле сделать фокус на ее инпут
	$(document).on('click', '.atm-search__icon', function(){
		var widget = $(this).closest('.atm-search');
		widget.find('.atm-search__search').focus();
	});
	
	// Выбор представителя в восстановлении пароля
	$(document).on('change', '[name="face"]', function(){
		var face_id = parseInt($(this).val());
		var color = $(this).closest('.atm-container__face').data('color');
		var widget = $(this).closest('.atm-container');
		
		$('body').css('background', color);
		$('.atm-tabsButton__cornerMask').css('background', color);
		widget.find('.atm-container__radiobuttons-option').hide();

		widget.find('.atm-container__radiobuttons-option[data-id="'+face_id+'"]').show();
		
	});
	
	// Выбор представителя в регистрации
	$(document).on('change', '[name="face-register"]', function(){
		var face_id = parseInt($(this).val());
		var color = $(this).closest('.atm-container__face').data('color');
		var tabs = $(this).closest('.atm-tabs');
		var widget = $(this).closest('.atm-tabs__tab');
		
		// Ставим цвет фону и уголкам на кнопках шагов
		$('body').css('background', color);
		$('.atm-tabsButton__cornerMask').css('background', color);

		// Добавляем параметр
		widget.find('[name="next"]').attr('data-face-register-id', face_id);
		
		// Выключаем лишние шаги в случае с физ. лицом
		if(face_id === 1){
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="4"]').prop('disabled', false);
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="5"]').prop('disabled', false);
		}else if(face_id === 2){
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="4"]').prop('disabled', true);
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="5"]').prop('disabled', true);
		}
		
		// Включаем/выключаем кнопку вперед
		if(face_id === 0){
			widget.find('[name="next"]').prop('disabled', true);
		}else{
			widget.find('[name="next"]').prop('disabled', false);
		}
		
	});
	
	// Выбор есть ли компания на сайте в регистрации
	$(document).on('change', '[name="company-known-id"]', function(){
		var answer = $(this).val();
		var widget = $(this).closest('.atm-substep');
		var tabs = $(this).closest('.atm-tabs');
		
		// Включаем кнопку вперед, добавляем параметры
		widget.find('[name="next"]').prop('disabled', false).attr('data-company-known-id', answer);

		// Выключаем лишний шаг в случае с не положительным ответом
		if(answer === '1'){
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="5"]').prop('disabled', false);
		}else{
			tabs.find('.atm-tabsButton__radio[name="register-step"][value="5"]').prop('disabled', true);
		}
	});
	
	// Поиск по компаниям в регистрации (проходит невидимо)
	$(document).on('keyup', '[name="company_name"]', function(){
		var widget = $(this).closest('.atm-container');
		var companies_note = widget.find('.atm-companiesNote');
		var companies_note_company_name = companies_note.find('.atm-companiesNote__companyName');
		var input_wrapper = $(this).closest('.atm-input');
		var value = $(this).val();
		
		companies_note.find('.atm-companiesNote__choose').hide();
		input_wrapper.removeClass('atm-input--accepted');
		widget.find('.atm-companies, .atm-companiesNote').hide();
		companies_note_company_name.text('');
		
		if(value === ''){
			widget.find('.atm-company').attr('data-found', false).hide();
		}else{
			widget.find('.atm-company').attr('data-found', false).hide();
			widget.find('.atm-company:icontains("'+value+'")').attr('data-found', true).show();
		}
	});
	
	// Показ, что такая компания уже есть на сайте
	$(document).on('blur', '[name="company_name"]', function(){
		var widget = $(this).closest('.atm-container');
		var input_wrapper = $(this).closest('.atm-input');
		
		if(!input_wrapper.hasClass('atm-input--accepted')){
			if(widget.find('.atm-company[data-found="true"]').length === 0){
				widget.find('.atm-companies, .atm-companiesNote').hide();
			}else{
				widget.find('.atm-companies, .atm-companiesNote').show();
			}
		}
	});
	
	// Кнопка вперед (weak)
	$(document).on('click', '[name="next"]', function(){
		var widget = $(this).closest('.atm-tabs');
		var current_step_id = parseInt(widget.find('.atm-tabsButton__radio[name="register-step"]:checked').val());
		var next_step_header = widget.find('.atm-tabsButton__radio[name="register-step"][value="'+(parseInt(current_step_id)+1)+'"]');
		var next_step_tab = widget.find('.atm-tabs__tab[data-id="'+(current_step_id+1)+'"]');
		var face_id = $(this).attr('data-face-register-id');
		var company_known_id = $(this).attr('data-company-known-id');
		var company_id = $(this).attr('data-choosed-id');
		var company_name = $(this).attr('data-choosed-name');
		var email = $(this).attr('data-email');
		var fio = $(this).attr('data-fio');
		
		next_step_tab.find('[name="next"]').attr('data-face-register-id', face_id);
		next_step_tab.find('[name="next"]').attr('data-company-known-id', company_known_id);
		next_step_tab.find('[name="next"]').attr('data-choosed-name', company_name);
		
		next_step_tab.find('[data-face-register-id], [data-company-known-id]').hide();
		next_step_tab.find('[data-face-register-id="'+face_id+'"], [data-company-known-id="'+company_known_id+'"]').show();
		
		next_step_tab.find('.atm-container__subtitleCompany').text(company_name);
		next_step_tab.find('.atm-container__subtitleFio').text(fio);
		next_step_tab.find('[name="company_id"]').val(company_id);
		next_step_tab.find('[name="company_name"]').val(company_name);
		next_step_tab.find('.atm-accept__info a').text(email);
		
		
		next_step_header.prop('checked', true).click();
	});
	
	// Кнопка назад
	$(document).on('click', '[name="back"]', function(){
		var widget = $(this).closest('.atm-tabs');
		var currentStep = widget.find('.atm-tabsButton__radio[name="register-step"]:checked').val();
		var prevStep = widget.find('.atm-tabsButton__radio[name="register-step"][value="'+(parseInt(currentStep)-1)+'"]');

		prevStep.prop('checked', true).click();
	});
	
	// Перескок на предыдущий инпут при стирании в пустом инпуте
	$(document).on('keydown', '.atm-phoneDigits__input', function(e){

		// Замена значения в инпуте
		if(!isNaN(e.key)){
			if($(this).val() !== ''){
				$(this).val(e.key);
			}
		}

		// Перескок обратно
		if((e.which === 8 || e.which === 46) && $(this).val() === ''){
			$(this).prev().focus();
		}
		
		// Игнор не цифр
		if(e.which !== 8 && e.which !== 46 && isNaN(e.key)){
			return false;
		}
	});
	
	// Перескок на следующий инпут при вводе кода из смс
	$(document).on('keyup', '.atm-phoneDigits__input', function(){
		if($(this).val() !== ''){
			$(this).next().focus();
		}
	});
	
	// Сменить тип восстановления пароля
	$(document).on('click', '.atm-container__forgot', function(e){
		e.preventDefault();
		$(this).closest('.atm-container__remindOption').siblings().show();
		$(this).closest('.atm-container__remindOption').hide();
	});
	
	// Переключиться на другое действие
	$(document).on('click', '.atm-tosection', function(e){
		e.preventDefault();
		var tosection = $(this).data('tosection');

		// Состояние должно как-то сбрасываться
		if('weak'){
			$('[name="face"][value="1"]').click();
			$('[name="face-register"][value="0"]').click();
		}

		$(this).closest('.atm-sections').find('[data-section]').hide();
		$(this).closest('.atm-sections').find('[data-section="'+tosection+'"]').show();
		
		if(tosection === 'login'){
			location.reload();
		}
		
	});
	
	// Поиск по компаниям на шаге поиска уже существующей компании
	$(document).on('keyup', '[name="companies-search"]', function(){
		var widget = $(this).closest('.atm-container');
		var value = $(this).val();
		
		// Убираем стиль выбрано
		if($(this).closest('.atm-search').hasClass('atm-search--choosed')){
			$(this).closest('.atm-search').removeClass('atm-search--choosed');
		}
		
		// Отключаем кнопку вперед и убираем выбранные параметры
		widget.find('[name="next"]').prop('disabled', true).removeAttr('data-choosed-id').removeAttr('data-choosed-name');
		
		// Если текст был стёрт
		if(value === ''){
			// Скрыть обертку для списка компаний и для блока ничего не найдено
			// Показать все компании
			widget.find('.atm-companies__exists').hide();
			widget.find('.atm-companies__empty').hide();
			widget.find('.atm-company').show();
		}else{
			// Скрыть все компании
			// Показать обёртку для списка компаний, компании с совпадающими названиями
			widget.find('.atm-company').hide();
			widget.find('.atm-companies__exists').show();
			widget.find('.atm-company:icontains("'+value+'")').show();
			
			// Если компаний не нашлось, показать/скрыть обертку для списка компаний и блок ничего не найдено
			if(widget.find('.atm-company:visible').length === 0){
				widget.find('.atm-companies__exists').hide();
				widget.find('.atm-companies__empty').show();
			}else{
				widget.find('.atm-companies__exists').show();
				widget.find('.atm-companies__empty').hide();
			}
		}
	});
	
	// Выбор компании
	$(document).on('click', '.atm-company', function(){
		
		// Идентификатор компании
		var id = $(this).data('id');
		// Название компании
		var name = $(this).find('.atm-company__name').text();
		// Область в пределах текущего таба
		var widget = $(this).closest('.atm-substep');
		// Основная обертка поля поиска
		var search_wrapper = widget.find('.atm-search');
		// Поле поиска
		var search_input = search_wrapper.find('.atm-search__search');
		// Обертка списка компаний
		var companies_exists = $(this).closest('.atm-companies__exists');
		// Список компаний
		var companies = $(this).closest('.atm-companies');
		// Обертка для блока такая компания уже есть
		var companies_note = widget.find('.atm-companiesNote');
		// Строка под выбранную компанию
		var companies_note_company_name = companies_note.find('.atm-companiesNote__companyName');
		// Обертка с кнопками подтверждения/отмены выбора компании
		var companies_note_choose = companies_note.find('.atm-companiesNote__choose');
		// Поле названия компании на этапе регистрации компании
		var register_input = widget.find('[name="company_name"]');
		// Основная обертка поля названия компании
		var register_wrapper = register_input.closest('.atm-input');
		
		// На шаге поиска существующей компании
		if(!companies.hasClass('atm-companies--register')){
			companies_exists.hide();
			search_wrapper.addClass('atm-search--choosed');
			search_input.data('choosed-id', id);
			search_input.val(name).change();
			
			// Включаем кнопку вперед, добавляем параметр
			widget.find('[name="next"]').prop('disabled', false).attr('data-choosed-id', id).attr('data-choosed-name', name);
			
		// На шаге регистрации компании
		}else{
			companies_note_company_name.text(name);
			companies_note_choose.show();
			companies.hide();
			register_wrapper.addClass('atm-input--accepted');
			widget.find('[name="choose_yes"]').attr('data-company-id', id);
		}
		
	});
	
	// Выбор это не моя компания в регистрации
	$(document).on('click', '[name="choose_no"]', function(){
		var widget = $(this).closest('.atm-container');
		
		widget.find('[name="company_name"]').closest('.atm-input').removeClass('atm-input--accepted');
		widget.find('.atm-companiesNote__choose').hide();
		widget.find('.atm-companiesNote__companyName').text('');
		widget.find('.atm-companies').show();
	});
	
	// Выбор это моя компания в регистрации
	$(document).on('click', '[name="choose_yes"]', function(){
		var widget = $(this).closest('.atm-substep');
		var company_name = widget.find('.atm-companiesNote__companyName').text();
		var company_id = $(this).attr('data-company-id');
		
		widget.find('[name="company_name"]').closest('.atm-container__field').hide();
		widget.find('.atm-companiesNote').hide();
		widget.find('.atm-companiesNote__choose').hide();
		widget.find('.atm-container__subtitleText').text('Подтверждение компании');
		widget.find('.atm-container__subtitleCompany').text(company_name);
		widget.find('[name="company_id"]').val(company_id);
		widget.find('[name="next"]').attr('data-choosed-name', company_name);
	});
	
	// Не прокликивать до документа в диалоге
	$(document).on('click', '.dtx-dialog', function(e){
		e.stopPropagation();
	});
	
	// Убрать диалоги по клику вне
	// Также убрать меню
	$(document).on('click', function(){
		$('.dtx-dialog__radio').prop('checked', false);
		$('.nft-burger__checkbox').prop('checked', false);
		$('.nft-profile__checkbox').prop('checked', false);
	});
	
	// При изменении чекбокса диалога подставлять модификатор на обёртку
	$(document).on('change', '.dtx-dialog__radio', function(){
		var widget = $(this).closest('.dtx-dialog');
		var checked = $(this).prop('checked');
		if(checked === false){
			widget.removeClass('dtx-dialog--opened');
		}else{
			widget.addClass('dtx-dialog--opened');
		}
	});
	
	// Прокрутка окна чата вниз
	$('.dtx-chat__content').each(function(){
		this.scrollTop = this.scrollHeight;
	});
	
	// Поиск по компаниям в регистрации (проходит невидимо)
	$(document).on('keyup', '[name="company_name"]', function(){
		var widget = $(this).closest('.atm-container');
		var companies_note = widget.find('.atm-companiesNote');
		var companies_note_company_name = companies_note.find('.atm-companiesNote__companyName');
		var input_wrapper = $(this).closest('.atm-input');
		var value = $(this).val();
		
		companies_note.find('.atm-companiesNote__choose').hide();
		input_wrapper.removeClass('atm-input--accepted');
		widget.find('.atm-companies, .atm-companiesNote').hide();
		companies_note_company_name.text('');
		
		if(value === ''){
			widget.find('.atm-company').attr('data-found', false).hide();
		}else{
			widget.find('.atm-company').attr('data-found', false).hide();
			widget.find('.atm-company:icontains("'+value+'")').attr('data-found', true).show();
		}
	});
	
	// Поиск по чему-либо 
	$(document).on('keyup', '[name="any-search"]', function(){
		var widget = $(this).closest('.dtx-anySearch');
		var value = $(this).val();
		
		// Если текст был стёрт
		if(value === ''){
			// Показать все строки
			widget.find('.dtx-anySearch__item').removeClass('dtx-anySearch__item--hiddenBySearch');
		}else{
			// Скрыть все строки
			widget.find('.dtx-anySearch__item').addClass('dtx-anySearch__item--hiddenBySearch');
			// Показать совпадения
			widget.find('.dtx-anySearch__item:icontains("'+value+'")').removeClass('dtx-anySearch__item--hiddenBySearch');
		}
	});
	
	// Затенение выходного дня при загрузке страницы (можно переписать на css)
	$('.dtx-branch__day').each(function(){
		if($(this).find('.dtx-object__input').prop('checked') === false){
			$(this).addClass('dtx-branch__day--dayoff');
		}else{
			$(this).removeClass('dtx-branch__day--dayoff');
		}
	});
	
	// Затенение выходного дня при переключениях (можно переписать на css)
	$(document).on('change', '.dtx-object__input', function(){
		if($(this).prop('checked') === false){
			$(this).closest('.dtx-branch__day').addClass('dtx-branch__day--dayoff');
		}else{
			$(this).closest('.dtx-branch__day').removeClass('dtx-branch__day--dayoff');
		}
	});
	
	// Раскрыть админское меню в отзыве
	$(document).on('click', '[name="edit-comment"]', function(){
		var widget = $(this).closest('.dtx-comment');
		widget.find('.dtx-comment__editWrapper').css('display', 'flex');
		$(this).hide();
		$(this).siblings('[name="edit-comment-back"]').show();
	});
	
	// Закрыть админское меню в отзыве
	$(document).on('click', '[name="edit-comment-back"]', function(){
		var widget = $(this).closest('.dtx-comment');
		widget.find('.dtx-comment__editWrapper').css('display', 'none');
		$(this).hide();
		$(this).siblings('[name="edit-comment"]').show();
	});
	
	// Раскрыть/сверуть редактирование комментария для мобильной версии
	$(document).on('click', '.dtx-comment__editToggler', function(){
		var widget = $(this).closest('.dtx-comment');
		if($(this).hasClass('dtx-comment__editToggler--toggled')){
			widget.find('[name="edit-comment-back"]').click();
			$(this).removeClass('dtx-comment__editToggler--toggled');
		}else{
			widget.find('[name="edit-comment"]').click();
			$(this).addClass('dtx-comment__editToggler--toggled');
		}
	});
	
	// Изменение таба комментариев десктоп
	$(document).on('change', '[name="comments-tab"]', function(){
		var widget = $(this).closest('.dtx-teacherCard__tabsWrapper');
		var tab_name = $(this).val();
		widget.find('[name="comments-selection"]').val(tab_name).change();
	});
	
	// Изменение таба комментариев мобильный
	$(document).on('change', '[name="comments-selection"]', function(){
		var widget = $(this).closest('.dtx-teacherCard__tabsWrapper');
		var tab_name = $(this).val();
		widget.find('[name="comments-tab"][value="'+tab_name+'"]').prop('checked', true);
		
		
		widget.closest('.dtx-container').find('.swiper-slide').hide();
		widget.closest('.dtx-container').find('.swiper-slide[data-tab~="'+tab_name+'"]').show();
	});
	
	// Выбор компании в курсах преподавателя(Возможно, нужно переписать)
	$(document).on('change', '[name="courses-selection"]', function(){
		var widget = $(this).closest('.dtx-container');
		var company_id = $(this).val();
		var company_name = $(this).find('option:selected').text();
		if(company_id === ''){
			company_name = 'УЦ Дельфа';
		}
		

		// Пустое значение - дельфа
		if(company_id === '' || company_id === 'delfa'){
			widget.find('.swiper-slide').hide();
			widget.find('.swiper-slide[data-company="delfa"]').show();
			widget.find('.dtx-teacherCard__company').text(company_name);
		}else{
			widget.find('.swiper-slide').hide();
			widget.find('.swiper-slide[data-company="'+company_id+'"]').show();
			widget.find('.dtx-teacherCard__company').text(company_name);
		}
		
		swiperCourses.update();
	});
	
	// Включить групповое редактирование преподавателей
	$(document).on('click', '[data-name="teachers-toggle-edit"]', function(){
		var widget = $(this).closest('.dtx-teachersEdit');
		
		widget.addClass('dtx-teachersEdit--activated');
		
	});
	
	// Отключить групповое редактирование преподавателей
	$(document).on('click', '[data-name="teachers-toggle-edit-cancel"]', function(){
		var widget = $(this).closest('.dtx-teachersEdit');
		
		widget.removeClass('dtx-teachersEdit--activated');
		
	});
	
	// Подсчитать и вывести число выбранных преподавателей
	$(document).on('change', '.dtx-teacherItem [type="checkbox"]', function(){
		var widget = $(this).closest('.dtx-teachers');
		var count = 0;
		$('.dtx-teacherItem [type="checkbox"]').each(function(){
			if($(this).prop('checked') === true){
				count++;
			}
		});
		widget.find('.dtx-teachers__selectedCount').text(count);
	});
	
	// Сбросить выбор преподавателей
	$(document).on('click', '.dtx-teachers__reset', function(){
		var widget = $(this).closest('.dtx-teachers');
		widget.find('.dtx-teacherItem [type="checkbox"]').prop('checked', false).change();
	});
	
	// Переключение между табами в списке преподавателей
	$(document).on('change', '[name="teachers-tab"]', function(){
		var tab_name = $(this).val();
		var widget = $(this).closest('.dtx-teachersEdit');
		
		widget.find('.dtx-teacherItem').removeClass('dtx-teacherItem--tabEnabled');
		widget.find('.dtx-teacherItem[data-tab="'+tab_name+'"]').addClass('dtx-teacherItem--tabEnabled');
	});
	
	// Выбрано скрыть преподавателя (модальное окно)
	$(document).on('click', '.dtx-teacherItem__visibility', function(){
		var widget = $(this).closest('.dtx-teacherItem');
		var wrapper = $(this).closest('.dtx-teachersEdit');
		var teacher_id = widget.attr('data-id');
		var teacher_status = widget.attr('data-tab');
		var teacher_name = widget.find('.dtx-teacherItem__name').text();
		var modal = wrapper.find('[data-modal-name="visibility-teacher"]').clone();
		modal.find('.dtx-modalTeacher__name').text(teacher_name);
		
		$.dimodal({
			content: modal,
			destroyOnHide: true,
			displayCloseButton: false,
			autoOpen: true,
			contentAligment: 'mixed',
			contentOpenAnimationName: 'mixed',
			contentCloseAnimationName: 'mixed',
			onBeforeOpen: function(){
				var modal_this = this;
				this.$element.find('.dtx-modalHead__close').on('click', function(){
					modal_this.hide();
				});
				this.$element.find('.dtx-modalTeacher__no').on('click', function(){
					modal_this.hide();
				});
				this.$element.find('.dtx-modalTeacher__yes').on('click', function(){
					
					//your stuff here
					
					modal_this.hide();
				});
			}
		});
	});
	
	// Выбрано удалить преподавателя (модальное окно)
	$(document).on('click', '.dtx-teacherItem__delete', function(){
		var widget = $(this).closest('.dtx-teacherItem');
		var wrapper = $(this).closest('.dtx-teachersEdit');
		var teacher_id = widget.attr('data-id');
		var teacher_name = widget.find('.dtx-teacherItem__name').text();
		var modal = wrapper.find('[data-modal-name="delete-teacher"]').clone();
		modal.find('.dtx-modalTeacher__name').text(teacher_name);
		
		$.dimodal({
			content: modal,
			destroyOnHide: true,
			displayHideButton: false,
			autoOpen: true,
			contentAligment: 'mixed',
			contentShowAnimationName: 'mixed',
			contentHideAnimationName: 'mixed',
			onBeforeShow: function(){
				var modal_this = this;
				this.$element.find('.dtx-modalHead__close').on('click', function(){
					modal_this.hide();
				});
				this.$element.find('.dtx-modalTeacher__no').on('click', function(){
					modal_this.hide();
				});
				this.$element.find('.dtx-modalTeacher__yes').on('click', function(){
					
					//your stuff here
					
					modal_this.hide();
				});
			}
		});
	});
	
	// Множественно удалить преподавателей (модальное окно)
	$(document).on('click', '.dtx-teachers__deleteAll', function(){
		var wrapper = $(this).closest('.dtx-teachersEdit');
		var widget = $(this).closest('.dtx-teacherItem');
		
		if(wrapper.find('.atm-checkbox__checkbox:checked').length){
			var modal = wrapper.find('[data-modal-name="delete-teachers"]').clone();
			wrapper.find('.atm-checkbox__checkbox:checked').each(function(){
				var teacher_name = $(this).closest('.dtx-teacherItem').find('.dtx-teacherItem__name').text();
				modal.find('.dtx-modalTeacher__names').append('<li><b>'+teacher_name+'</b></li>');
			});
			$.dimodal({
				content: modal,
				destroyOnHide: true,
				displayHideButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentShowAnimationName: 'mixed',
				contentHideAnimationName: 'mixed',
				onBeforeShow: function(){
					var modal_this = this;
					this.$element.find('.dtx-modalHead__close').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__no').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__yes').on('click', function(){

						//your stuff here

						modal_this.hide();
					});
				}
			});	
		}else{
			var modal = wrapper.find('[data-modal-name="operation-teachers-empty"]').clone();
			$.dimodal({
				content: modal,
				destroyOnHide: true,
				displayHideButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentShowAnimationName: 'mixed',
				contentHideAnimationName: 'mixed',
				onBeforeShow: function(){
					var modal_this = this;
					this.$element.find('.dtx-modalHead__close').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__ok').on('click', function(){
						modal_this.hide();
					});
				}
			});	
		}
	});
	
	// Множественно скрыть преподавателей (модальное окно)
	$(document).on('click', '.dtx-teachers__visibilityAll', function(){
		var wrapper = $(this).closest('.dtx-teachersEdit');
		var widget = $(this).closest('.dtx-teacherItem');
		
		if(wrapper.find('.atm-checkbox__checkbox:checked').length){
			var modal = wrapper.find('[data-modal-name="visibility-teachers"]').clone();
			wrapper.find('.atm-checkbox__checkbox:checked').each(function(){
				var teacher_name = $(this).closest('.dtx-teacherItem').find('.dtx-teacherItem__name').text();
				modal.find('.dtx-modalTeacher__names').append('<li><b>'+teacher_name+'</b></li>');
			});
			$.dimodal({
				content: modal,
				destroyOnHide: true,
				displayHideButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentShowAnimationName: 'mixed',
				contentHideAnimationName: 'mixed',
				onBeforeShow: function(){
					var modal_this = this;
					this.$element.find('.dtx-modalHead__close').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__cancel').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__hide').on('click', function(){
						
						//your stuff here

						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__show').on('click', function(){

						//your stuff here

						modal_this.hide();
					});
				}
			});
		}else{
			var modal = wrapper.find('[data-modal-name="operation-teachers-empty"]').clone();
			$.dimodal({
				content: modal,
				destroyOnHide: true,
				displayHideButton: false,
				autoOpen: true,
				contentAligment: 'mixed',
				contentShowAnimationName: 'mixed',
				contentHideAnimationName: 'mixed',
				onBeforeShow: function(){
					var modal_this = this;
					this.$element.find('.dtx-modalHead__close').on('click', function(){
						modal_this.hide();
					});
					this.$element.find('.dtx-modalTeacher__ok').on('click', function(){
						modal_this.hide();
					});
				}
			});	
		}
	});
	
	// Верхнее меню, предотвращение закрывания
	$(document).on('click', '.nft-mobileMenu', function(e){
		e.stopPropagation();
	});
	
	// Удалить компанию в верхнем меню (модальное окно)
	$(document).on('click', '.nft-mobileMenuCompany__delete', function(){
		var widget = $(this).closest('.nft-mobileMenuCompany');
		var wrapper = $(this).closest('.nft-group');
		var company_id = widget.attr('data-id');
		var company_name = widget.find('.nft-mobileMenuCompany__text').text();
		var modal = wrapper.find('[data-modal-name="delete-company"]').clone();
		modal.find('.nft-somecompany__name').text(company_name);
		
		$.dimodal({
			content: modal,
			destroyOnClose: true,
			displayCloseButton: false,
			autoOpen: true,
			stopPropagation: true,
			customCloseButton: '.dtx-modalHead__close',
			contentAligment: 'mixed',
			contentOpenAnimationName: 'mixed',
			contentCloseAnimationName: 'mixed',
			onBeforeOpen: function(){
				var modal_this = this;

				this.$element.find('.nft-modalCompany__no').on('click', function(){
					modal_this.close();
				});
				this.$element.find('.nft-modalCompany__yes').on('click', function(){
					
					//your stuff here
					
					modal_this.close();
				});
			}
		});
	});
	
	// Переключение контента по основному меню, потом можно убрать
	$(document).on('change', '.dtx-menuItem__radio', function(){
		var value = $(this).val();
		$('[data-mainmenu]').hide();
		$('[data-mainmenu="'+value+'"]').show();
		$('[name="mobile-menu-radio"][value="'+value+'"]').prop('checked', true);
		window.scrollTo(0, 0);
	});
	
	// Переход в настройки по клину на редактирование профиля
	$(document).on('click', '[name="profile-edit"]', function(){
		$('.dtx-menuItem__radio[value="settings"]').click();
	});
	
	// Переключение компании в главном меню
	$(document).on('click', '.dtx-menu__radio', function(){
		var widget = $(this).closest('.dtx-menu__header');
		var radio = $(this);

		// if this was previously checked
		if(radio.data('waschecked') === true){
			radio.prop('checked', false);
			radio.data('waschecked', false);
		}else{
			radio.data('waschecked', true);
		}
		
		// remove was checked from other radios
		widget.find('.dtx-menu__radio').not(radio).data('waschecked', false);
	});
	
	// Одновременное пререключение компании, если где-либо было сделано переключение
	$(document).on('click', '.dtx-menu__radio, .dtx-profileItem__radio, .nft-mobileMenuCompany__radio', function(){
		var value = $(this).val();
		var this_radio = $(this);
		$('.dtx-menu__radio[value="'+value+'"], .dtx-profileItem__radio[value="'+value+'"], .nft-mobileMenuCompany__radio[value="'+value+'"]').not(this_radio).prop('checked', true).trigger('change');
	});
	
	// Поиск по преподавателям в создании
	$(document).on('keyup', '[data-name="search-teachers"]', function(){
		var widget = $(this).closest('.dtx-anySearch');
		var value = $(this).val();
		
		$(this).closest('.atm-search').removeClass('atm-search--choosed');
		$(this).closest('form').find('button').prop('disabled', true);
		$(this).closest('.dtx-container').find('.dtx-teachersCreateNew').show();
		$(this).closest('.dtx-container').find('[name="teacher_id"]').val('');
		
		if(value === ''){
			widget.find('.dtx-teachersSearch').hide();
		}else{
			widget.find('.dtx-teachersSearch').show();
		}
	});
	
	// Выбор преподавателя в результатах поиска
	$(document).on('click', '.dtx-teacherSearchItem', function(){
		var widget = $(this).closest('.dtx-anySearch');
		var teacher_name = $(this).find('.dtx-teacherSearchItem__name').text();
		var teacher_id = $(this).attr('data-id');
		
		// Скрыть список преподавателей
		$(this).closest('.dtx-teachersSearch').hide();
		// Утановить в поисковое поле имя выбранного препродавателя. Установить стиль Выбрано.
		widget.find('.atm-search__search').val(teacher_name).closest('.atm-search').addClass('atm-search--choosed');
		
		var wrapper = $(this).closest('.dtx-container');
		wrapper.find('.dtx-teachersCreateNew').hide();
		wrapper.find('[name="teacher_id"]').val(teacher_id);
		$(this).closest('form').find('button').prop('disabled', false);
		
		
		
		// Взять айдишник с выбранного пользователя, заполнить им какое-нибудь скрытое поле, активировать кнопку.
		// Скрыть форму создания нового преподавателя.
		// Сделать обратные действия при изменении поискового поля.
	});
	
	// Иметь возможность кликнуть на ссылку в карточке преподавателя в поиске
	$(document).on('click', '.dtx-teacherSearchItem__name', function(e){
		e.stopPropagation();
	});
	
	// Скрыть поиск по преподавателям, если начали заполняыть нового
	$(document).on('keyup', '.dtx-teachersCreateNew [type="text"]', function(){
		var some_input_filled = false;
		var all_inputs_filled = true;
		$(this).closest('.dtx-teachersCreateNew').find('[type="text"]').each(function(){
			if($(this).val() !== ''){
				some_input_filled = true;
			}
			if($(this).val() === ''){
				all_inputs_filled = false;
			}
		});
		
		if(some_input_filled === true){
			$('.dtx-teachersFindExisting').hide();
		}else{
			$('.dtx-teachersFindExisting').show();
		}
		if(all_inputs_filled){
			$(this).closest('form').find('button').prop('disabled', false);
		}else{
			$(this).closest('form').find('button').prop('disabled', true);
		}
	});

	$(document).on('click', '.dtx-datarows__add', function(){
		var widget = $(this).closest('.dtx-datarows');
		var row = widget.find('.dtx-datarows__template').html();
		widget.find('.dtx-datarows__content').append(row);
	});
	
	$(document).on('change', '.dtx-mobileMenuItem__radio', function(){
		var value = $(this).val();
		$('[name="mainmenu"][value="'+value+'"]').prop('checked', true).change();
	});

	// Свайперы
	if(true){
		var swiperCourses = new Swiper('.swiper[data-name="courses"]', {
			slidesPerView: 1.2,
			spaceBetween: 12,
			speed: 500,
			//loop: true,
			//slideToClickedSlide: true
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				dynamicBullets: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2
				},
				768: {
					slidesPerView: 2.5
				},
				1280: {
					slidesPerView: 3.1
				},
				1600: {
					slidesPerView: 3.2
				}
			}
		});

		new Swiper('.swiper[data-name="comments"]', {
			slidesPerView: 1.5,
			spaceBetween: 12,
			speed: 500,
			loop: true,
			//slideToClickedSlide: true
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				dynamicBullets: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					slidesPerView: 1.2
				},
				768: {
					//slidesPerView: 1.5
				},
				1280: {
					//slidesPerView: 2.2
				},
				1600: {
					//slidesPerView: 3.2
				}
			}
		});		
	}

});