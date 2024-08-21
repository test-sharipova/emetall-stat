//select 
function newSelect() {
    $('.select_main').each(function() {
      const _this = $(this),
          selectOption = _this.find('option'),
          selectOptionLength = selectOption.length,
          selectedOption = selectOption.filter(':selected'),
          duration = 350; // длительность анимации 
    
      _this.hide();
      _this.wrap('<div class="select"></div>');
      $('<div>', {
          class: 'new-select',
          text: _this.children('option:selected').text()
      }).insertAfter(_this);
    
      const selectHead = _this.next('.new-select');
      $('<div>', {
          class: 'new-select__list'
      }).insertAfter(selectHead);
    
      const selectList = selectHead.next('.new-select__list');
      for (let i = 1; i < selectOptionLength; i++) {
          $('<div>', {
              class: 'new-select__item',
              html: $('<span>', {
                  text: selectOption.eq(i).text()
              })
          })
          .attr('data-value', selectOption.eq(i).val())
          .appendTo(selectList);
      }
    
      const selectItem = selectList.find('.new-select__item');
      selectList.slideUp(0);
      selectHead.on('click', function() {
          if ( !$(this).hasClass('on') ) {
              $(this).addClass('on');
              selectList.slideDown(duration);
    
              selectItem.on('click', function() {
                  let chooseItem = $(this).data('value');
    
                  _this.val(chooseItem).attr('selected', 'selected');
                  selectHead.text( $(this).find('span').text() );
    
                  selectList.slideUp(duration);
                  selectHead.removeClass('on');
                  let select = $('select');
                  _this.trigger('change');
              });
    
          } else {
              $(this).removeClass('on');
              selectList.slideUp(duration);
          }
      });
    });
    $(document).mouseup( function(e){ // событие клика по веб-документу
      var div = $( "new-select" ); // тут указываем ID элемента
      if ( !div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
          $('.new-select__list').hide(); // скрываем его
      }
     });
    }
    newSelect();

//map
ymaps.ready(function () {
    var myMap = new ymaps.Map('stat-map', {
            center: [55.050514, 82.968489],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        }),
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="font-family:inherit;font-weight: 400;font-size: 14px;color: #fff;text-align:center;display:flex;justify-content:center">$[properties.iconContent]</div>'
        ),
        customBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          '<div class="providerscard__map__adress">' +
              '<h3 class="fs_13 fw_600 mb_8">{{properties.hintContent}}</h3>' +
              '<div class="fs_13 gray mb_12">Ежедневно с 09:00 до 18:00</div>' +
              '<a href="#" class="btn_lightblue">' +
              '<svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
              '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.11141 1.21443C4.26227 0.423352 5.61531 0.000750288 6.99961 0C8.38445 0.000593173 9.73803 0.423367 10.8893 1.21488C12.0405 2.00639 12.9377 3.13111 13.4674 4.44686C13.9971 5.7626 14.1356 7.21031 13.8653 8.60699C13.5951 10.0037 12.9282 11.2866 11.9491 12.2936C11.6185 12.6335 11.1713 13.0129 10.6876 13.4232C9.31697 14.5859 7.65372 15.9969 7.52319 17.4616C7.49752 17.7576 7.28746 18 6.99961 18C6.71176 18 6.50249 17.7576 6.47604 17.4616C6.34549 15.9967 4.68055 14.5838 3.30886 13.4198C2.82504 13.0092 2.3777 12.6296 2.04705 12.2896C1.06902 11.2822 0.40327 9.99931 0.133886 8.60302C-0.135498 7.20673 0.00356929 5.75967 0.533522 4.44461C1.06348 3.12955 1.96054 2.0055 3.11141 1.21443ZM6.08272 9.47562C6.37334 9.59941 6.68482 9.66312 6.99939 9.66312C7.63468 9.66312 8.24395 9.4036 8.69317 8.94166C9.14239 8.47972 9.39476 7.8532 9.39476 7.19992C9.39476 6.54664 9.14239 5.92011 8.69317 5.45817C8.24395 4.99623 7.63468 4.73672 6.99939 4.73672C6.68482 4.73672 6.37334 4.80043 6.08272 4.92422C5.7921 5.04801 5.52803 5.22944 5.3056 5.45817C5.08317 5.6869 4.90673 5.95844 4.78635 6.25729C4.66597 6.55614 4.60401 6.87645 4.60401 7.19992C4.60401 7.52339 4.66597 7.8437 4.78635 8.14254C4.90673 8.44139 5.08317 8.71294 5.3056 8.94166C5.52803 9.17039 5.7921 9.35183 6.08272 9.47562Z" fill="#2764E0"/>' +
              '</svg>' +
              'Построить маршрут</a>' +
          '</div>'
      );
      
       myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: '25 000 тонн.',
            balloonContent: '25 000 тонн.',
            iconContent: '5'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'img/marker.png',
            // Размеры метки.
            iconImageSize: [40, 40],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [0, 0],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [14, 11],
            balloonContentLayout: customBalloonContentLayout,
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
  
        myPlacemark2 = new ymaps.Placemark([55.039791, 82.802157], {
            hintContent: '10 000 тонн.',
            balloonContent: '10 000 тонн.',
            iconContent: '2'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'img/marker.png',
            // Размеры метки.
            iconImageSize: [40, 40],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [0, 0],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [14, 11],
            balloonContentLayout: customBalloonContentLayout,
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
  
    myMap.geoObjects
        .add(myPlacemark)
        .add(myPlacemark2);
  });


  //chart график 1
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'],
      datasets: [{
        label: '',
        data: [17000, 15500, 16200, 17100, 18500, 17600],
        borderWidth: 2,
        tension: 0.5,
        borderColor: '#2764e0',
        pointRadius: 4,
        pointBorderWidth: 6,
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
        
      scales: {
        y: {
        //   beginAtZero: false,
          ticks: {
            stepSize: 500,
            // min: 15000,
            // max: 19000
            
          }
        }
      }
    }
  });
    