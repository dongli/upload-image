module UploadImage
  class Railtie < Rails::Railtie
    initializer 'upload-image.partials' do
      ActiveSupport.on_load :action_controller do
        append_view_path "#{Gem.loaded_specs['upload-image'].full_gem_path}/app/views"
      end
    end

    initializer 'upload-image.helpers' do
      ActionView::Base.send :include, UploadImage::Helpers
    end

    initializer 'upload-image.assets' do |app|
      app.config.assets.paths << "#{Gem.loaded_specs['upload-image'].full_gem_path}/app/assets"
    end

    initializer 'upload-image.locales' do |app|
      app.config.i18n.load_path += Dir["#{Gem.loaded_specs['upload-image'].full_gem_path}/config/locales/*.{yml}"]
    end
  end
end
