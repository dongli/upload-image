root = Gem.loaded_specs['upload-image'].full_gem_path
require "#{root}/app/concerns/croppable"
require "#{root}/app/helpers/upload_image_helper"
