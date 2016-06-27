//= require ./cropper.min

$(document).ready(function() {
  $('.upload-image').each(function() {
    var upload_elem = $(this)
    var tag = upload_elem.attr('id').replace('upload-image-', '')
    var object_name = tag.split('_')[0]
    var width = upload_elem.width()
    var height = upload_elem.height()
    $('#change-shade-'+tag).css('width', width).css('height', height)
    upload_elem.children('#preview-'+tag).css('width', width).css('height', height)
    upload_elem.children('.blank-image').css('width', width).css('height', height)
    upload_elem.hover(function() {
      if (!upload_elem.data('disable-hover')) $('#change-shade-'+tag).show()
    }, function() {
      if (!upload_elem.data('disable-hover')) $('#change-shade-'+tag).hide()
    })
    upload_elem.click(function() {
      // User want to change image.
      if (!upload_elem.data('disable-trigger')) $('#'+tag).trigger('click')
    })
    $('#'+tag).change(function() {
      // Preview selected image.
      if ($('.blank-image').length > 0) $('.blank-image').css('opacity', '1')
      var img = new Image
      img.src = URL.createObjectURL($(this)[0].files[0])
      $('#preview-'+tag).attr('src', img.src)
      $('#preview-'+tag).cropper({
        aspectRatio: 1,
        minContainerWidth: width,
        minContainerHeight: height
      })
      upload_elem.data('disable-trigger', 'true')
      upload_elem.data('disable-hover', 'true')
      $('#change-shade-'+tag).hide()
      $(document).mouseup(function(e) {
        if (!upload_elem.is(e.target) && upload_elem.has(e.target).length === 0) {
          var data = $('#preview-'+tag).cropper('getCropBoxData')
          var crop_x = data['left']
          var crop_y = data['top']
          var crop_w = data['width']
          var crop_h = data['height']
          // Scale crop parameters according to the real image size.
          crop_x *= img.width / width
          crop_y *= img.height / height
          crop_w *= img.width / width
          crop_h *= img.height / height
          // Create fake input elements to send back crop parameters.
          if ($('input[name^="' + object_name + '[crop"]').length > 0) {
            $('input[name="' + object_name + '[crop_x]"]').attr('value', Math.floor(crop_x))
            $('input[name="' + object_name + '[crop_y]"]').attr('value', Math.floor(crop_y))
            $('input[name="' + object_name + '[crop_w]"]').attr('value', Math.floor(crop_w))
            $('input[name="' + object_name + '[crop_h]"]').attr('value', Math.floor(crop_h))
          } else {
            upload_elem.append("<input style='display: none;' name='" + object_name + "[crop_x]' value='" + Math.floor(crop_x) + "'>")
            upload_elem.append("<input style='display: none;' name='" + object_name + "[crop_y]' value='" + Math.floor(crop_y) + "'>")
            upload_elem.append("<input style='display: none;' name='" + object_name + "[crop_w]' value='" + Math.floor(crop_w) + "'>")
            upload_elem.append("<input style='display: none;' name='" + object_name + "[crop_h]' value='" + Math.floor(crop_h) + "'>")
          }
        }
      })
    })
  })
})
