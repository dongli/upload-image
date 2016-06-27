module DongliRailsGears
  class Railtie < Rails::Railtie
    initializer 'dongli-rails-gears.partials' do
      ActiveSupport.on_load :action_controller do
        append_view_path "#{Gem.loaded_specs['dongli-rails-gears'].full_gem_path}/app/views"
      end
    end

    initializer 'dongli-rails-gears.helpers' do
      ActiveSupport.on_load :action_controller do
        helper UploadImageHelper
      end
    end

    initializer 'dongli-rails-gears.assets' do |app|
      app.config.assets.paths << "#{Gem.loaded_specs['dongli-rails-gears'].full_gem_path}/app/assets"
    end

    initializer 'dongli-rails-gears.locales' do |app|
      app.config.i18n.load_path += Dir["#{Gem.loaded_specs['dongli-rails-gears'].full_gem_path}/config/locales/*.{yml}"]
    end
  end
end
