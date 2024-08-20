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
    