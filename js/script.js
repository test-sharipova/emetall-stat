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

//modal
$('.stat-list .avial').on('click', function(){
    $('.stat-modal').fadeIn();
    $('.overlay').fadeIn();
});
$('.modal__close').on('click', function(){
    $('.stat-modal').fadeOut();
    $('.overlay').fadeOut();
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
        plugins: {
            legend: {
                display: false // Убираем легенду
            }
        },
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

  //chart график 2
  const ctx2 = document.getElementById('myChart2').getContext('2d');

  new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'], // Месяцы
        datasets: [
            {
                label: 'Запросы в неделю',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#2764e0',
                // borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barPercentage: 0.4, // Уменьшаем ширину столбиков
                categoryPercentage: 0.5 // Уменьшаем петли между группами столбиков
            },
            {
                label: 'Переходы в неделю',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#7aa6ff',
                // borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barPercentage: 0.4, 
                categoryPercentage: 0.5 
            },
            
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Убираем легенду
            }
        },
        scales: {
            y: {
                stacked: true, // Накладываем по оси Y
                beginAtZero: true
            },
            x: {
                stacked: true // Накладываем по оси X
            }
        }
    }
  });

  //chart график 3
  const ctx3 = document.getElementById('myChart3').getContext('2d');

  new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'], // Месяцы
        datasets: [
            {
                label: 'Запросы в неделю',
                data: [17000, 15500, 16200, 17100, 18500, 17600],
                // backgroundColor: '#2764e0',
                borderColor: '#c90000',
                borderWidth: 2,
                barPercentage: 0.4, // Уменьшаем ширину столбиков
                tension: 0.5,
                categoryPercentage: 0.5 // Уменьшаем петли между группами столбиков
            },
            {
                label: 'Переходы в неделю',
                data: [17500, 16000, 16700, 18100, 19500, 18600],
                // backgroundColor: '#7aa6ff',
                borderColor: '#b9c900',
                borderWidth: 2,
                barPercentage: 0.4, 
                tension: 0.5,
                categoryPercentage: 0.5 
            },
            
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Убираем легенду
            }
        },
        scales: {
            y: {
                
                
                ticks: {
                    stepSize: 500,
                    
                    
                  }
            },
            
        }
    }
  });

  //chart график 4
  const ctx5 = document.getElementById('myChart5').getContext('2d');
  const myDoughnutChart = new Chart(ctx5, {
      type: 'doughnut',
      data: {
          labels: ['20', '09Г2С', '30ХГСА', '12Х1МФ', '40Х', '20', '09Г2С', '30ХГСА', '12Х1МФ', '40Х'],
          datasets: [{
              label: 'Мои данные',
              data: [16, 17, 14, 13, 9, 8, 8, 7, 5, 2],
              borderRadius: 10,
              backgroundColor: [
                  '#297ee4',
                  '#fa6b6b',
                  '#fa993f',
                  '#fcdd3b',
                  '#717de8',
                  '#7ee4bf',
                  '#e386e5',
                  '#913ffa',
                  '#a5d837',
                  '#f46d6d'
              ],
              
              
          }]
      },
      options: {
          responsive: true,
          cutout: 155,
          maintainAspectRatio: false, // Позволяет задать размеры, указанные в атрибутах width и height
          
          plugins: {
            legend: {
                position: 'right', // Размещаем легенду справа
                display: false,
                labels: {
                    pointStyle: 'circle', // Стиль маркера в легенде
                    usePointStyle: true // Используем стиль маркера для точек
                }
            },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return `${tooltipItem.label}: ${tooltipItem.parsed}`;
                      }
                  }
              }
          }
      }
  });

  //chart график в модалке
  const ctx6 = document.getElementById('myChart6').getContext('2d');

  new Chart(ctx6, {
    type: 'bar',
    data: {
        labels: ['Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь', 'Январь'], // Месяцы
        datasets: [
            {
                label: '1 неделя',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: '#1a913c',
                // borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barPercentage: 0.9, // Уменьшаем ширину столбиков
                categoryPercentage: 0.5 // Уменьшаем петли между группами столбиков
            },
            {
                label: '2 неделя',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#1a913c',
                // borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barPercentage: 0.9, 
                categoryPercentage: 0.5 
            },
            {
                label: '3 неделя',
                data: [2, 3, 20, 5, 1, 4],
                backgroundColor: '#1a913c',
                // borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barPercentage: 0.9, 
                categoryPercentage: 0.5 
            },
            {
                label: '4 неделя',
                data: [5, 7, 28, 8, 5, 4],
                backgroundColor: '#1a913c',
                // borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                barPercentage: 0.9, 
                categoryPercentage: 0.5 
            },
            
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false // Убираем легенду
            }
        },
        scales: {
            y: {
                stacked: false, // Накладываем по оси Y
                beginAtZero: true
            },
            x: {
                stacked: false // Накладываем по оси X
            }
        }
    }
  });

  //показать календарь

$('.show-calend').each(function() {
    new AirDatepicker(this, {
        isMobile: true,
        autoClose: true,
        range: true,
        multipleDatesSeparator: ' - ',
        showOtherMonths: true,
        dateFormat: 'dd MMM yy',
        selectOtherMonths: true,
        moveToOtherMonthsOnSelect: true,
        numberOfMonths: 3
    });
});