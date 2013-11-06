/**
 *
 * Main javascript functions
 * 11/5/13 Mojiferous
 */

var googly_canvas;
var overlay;
var canvas_img;

var can_width = 305;
var can_height = 470;

var img_height;
var img_width;
var adj_width;
var adj_height;
var x_loc;
var y_loc;

(function ($, window, document) {

  $(window).load(function() {
    //get our canvas
    googly_canvas = document.getElementById('googly').getContext('2d');
    //grab our image
    canvas_img = document.getElementById('portrait-image');
    //get the eyeball overlay
    overlay = document.getElementById('portrait-overlay');

    img_height = canvas_img.naturalHeight;
    img_width = canvas_img.naturalWidth;
    adj_width = can_width;
    adj_height = can_height;


    x_loc = 0;
    y_loc = 0;
    var proportion = 1;

    //proportion math based on the assumption that the portrait image is larger than the canvas
    if(img_width > img_height) {
      //the image is wider than it is tall, so we will have to offset the x location

      proportion = img_height/can_height;
      adj_width = img_width/proportion;
      x_loc = Math.ceil((adj_width-305)/2);
    } else {
      //the image is taller than wide, so we offset the y
      proportion = img_width/can_width;
      adj_height = img_height/proportion;
      y_loc = Math.ceil((adj_height-470)/2);
    }

    googly_canvas.drawImage(canvas_img, 0, 0, img_width, img_height, -x_loc, -y_loc, adj_width, adj_height);

    paint_eyes(0, 0);

    $('body').mousemove(function(event) {
      var main_offset = $('#googly').offset();

      paint_eyes(event.pageX-main_offset.left, event.pageY-main_offset.top);
    });

  });



  function paint_eyes(x, y) {
    //make the whites of the eyes
    googly_canvas.fillStyle = "white";

    googly_canvas.beginPath();
    googly_canvas.arc(60, 177, 17, 0, 2*Math.PI);
    googly_canvas.arc(150, 177, 17, 0, 2*Math.PI);
    googly_canvas.fill();

    //and the eyeballs
    googly_canvas.fillStyle = "black";

    var left_x = x-62;
    var left_y = y-177;
    var right_x = x-150;
    var right_y = y-178;

    //set the range for the eyeballs
    left_x = (left_x < -8) ? -8 : (left_x > 8) ? 8 : left_x;
    right_x = (right_x < -8) ? -8 : (right_x > 8) ? 8 : right_x;
    left_y = (left_y < -3) ? -5 : (left_y > 5) ? 5 : left_y;
    right_y = (right_y < -3) ? -5 : (right_y > 5) ? 5 : right_y;

    if(left_x > 0 && right_x < 0) {

    } else {
      if(Math.abs(left_x) < Math.abs(right_x)) {
        right_x = left_x;
      } else {
        left_x = right_x;
      }
    }

    if(Math.abs(left_y) < Math.abs(right_y)) {
      right_y = left_y;
    } else {
      left_y = right_y;
    }

    googly_canvas.beginPath();
    googly_canvas.arc(62+left_x, 177+left_y, 8, 0, 2*Math.PI);
    googly_canvas.arc(150+right_x, 178+right_y, 8, 0, 2*Math.PI);
    googly_canvas.fill();

    googly_canvas.drawImage(overlay, 0, 0, img_width, img_height, -x_loc, -y_loc, adj_width, adj_height);
  }

})(jQuery, this, this.document);