//= require ./cropper.min

$(document).ready(function() {
  $('.b9bf30-upload-image').each(function() {
    // 'upload_elem' is the outer container.
    var upload_elem = $(this)
    // 'tag' includes <object_name>__<attribute_name>.
    var tag = upload_elem.attr('id').replace('b9bf30-upload-image-', '')
    var object_name = tag.split('__')[0]
    var width = upload_elem.width()
    var height = upload_elem.height()
    // 'cropper_elem' is the image that will be cropped.
    // Cropper will create extra elements below 'cropper_elem' (e.g. cropper-container cropper-bg).
    var cropper_elem = $('#b9bf30-preview-'+tag)
    // 'change_shade_elem' is the mask cover when user move mouse onto 'upload_elem'.
    var change_shade_elem = $('#b9bf30-change-shade-'+tag)
    // 'blank_image_elem' is the default image when there is no image uploaded yet.
    var blank_image_elem = $('.b9bf30-blank-image')
    // Set the width and height of elements.
    change_shade_elem.css('width', width).css('height', height)
    cropper_elem.css('width', width).css('height', height)
    blank_image_elem.css('width', width).css('height', height)
    // Handle the event when user move mouse onto 'upload_elem'.
    upload_elem.hover(function() {
      if (!upload_elem.data('disable-hover')) change_shade_elem.show()
    }, function() {
      if (!upload_elem.data('disable-hover')) change_shade_elem.hide()
    })
    // Handle the event when user click 'upload_elem' (User wants to upload an image).
    upload_elem.click(function() {
      // User want to change image.
      if (!upload_elem.data('disable-trigger')) $('#'+tag.replace('__', '_')).trigger('click')
    })
    // Handle the event when user has uploaded an image.
    $('#'+tag.replace('__', '_')).change(function() {
      // Preview selected image.
      if (blank_image_elem.length > 0) blank_image_elem.css('opacity', '1')
      $('#b9bf30-preview-'+tag).attr('src', URL.createObjectURL($(this)[0].files[0]))
      $('#b9bf30-preview-'+tag).cropper({
        aspectRatio: width / height,
        minContainerWidth: width,
        minContainerHeight: height,
        movable: false,
        scalable: false,
        zoomable: false
      })
      // User is not allowed to change the uploaded image, unless he/she refreshes the page.
      upload_elem.data('disable-trigger', 'true')
      upload_elem.data('disable-hover', 'true')
      change_shade_elem.hide()
      // When user submit form, set the correct crop parameters.
      $(document).mouseup(function(e) {
        if (!upload_elem.is(e.target) && upload_elem.has(e.target).length === 0) {
          var crop_box = $('#b9bf30-preview-'+tag).cropper('getCropBoxData')
          var canvas = $('#b9bf30-preview-'+tag).cropper('getCanvasData')
          var image = $('#b9bf30-preview-'+tag).cropper('getImageData')
          var crop_x = crop_box.left - canvas.left
          var crop_y = crop_box.top - canvas.top
          var crop_w = crop_box.width
          var crop_h = crop_box.height
          // Scale crop parameters according to the real image size.
          // 'scale' should be equal to image.naturalHeight / image.height.
          var scale = image.naturalWidth / image.width
          crop_x *= scale
          crop_y *= scale
          crop_w *= scale
          crop_h *= scale
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
