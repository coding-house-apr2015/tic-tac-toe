'use strict';

$(document).ready(init);

function init(){
  $('#reset').click(reset);
  $('#start').click(start);
  $('td').click(selecting);
}

function selecting(){
  var color = $('.active').css('background-color');
  $(this).css('background-color', color);
  if(checkWin(color)){
    alert('Win!');
    reset();
  }else{
    if(isMoveAvailable()){
      $('.player').toggleClass('active');
    }else{
      alert('Tie!');
      reset();
    }
  }
}

function checkWin(color){
  var conditions = [
    [{row:1, col:1}, {row:1, col:2}, {row:1, col:3}],
    [{row:2, col:1}, {row:2, col:2}, {row:2, col:3}],
    [{row:3, col:1}, {row:3, col:2}, {row:3, col:3}],

    [{row:1, col:1}, {row:2, col:1}, {row:3, col:1}],
    [{row:1, col:2}, {row:2, col:2}, {row:3, col:2}],
    [{row:1, col:3}, {row:2, col:3}, {row:3, col:3}],

    [{row:1, col:1}, {row:2, col:2}, {row:3, col:3}],
    [{row:1, col:3}, {row:2, col:2}, {row:3, col:1}]
  ];

  return _.any(conditions, function(condition){
    return _.all(condition, function(position){
      return $('tr:nth-child(' + position.row + ') td:nth-child(' + position.col + ')').css('background-color') === color;
    });
  });
}

function isMoveAvailable(){
  return _.any($('td'), function(td){
    return $(td).css('background-color') === 'rgb(255, 255, 255)';
  });
}

function reset(){
  $('#chooser').show();
  $('#players').hide();
  $('td').css('background-color', 'white');
}

function start(){
  $('#players').show();
  var p1 = $('#p1-choose').val();
  var p2 = $('#p2-choose').val();
  $('#p1').css('background-color', p1);
  $('#p2').css('background-color', p2);
  $('#chooser').hide();

  var rnd = Math.floor(Math.random() * 2) + 1;
  $('.player').removeClass('active');
  $('#p' + rnd).addClass('active');
}
