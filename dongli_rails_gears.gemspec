$:.push File.expand_path('../lib', __FILE__)

require 'dongli_rails_gears/version'

Gem::Specification.new do |s|
  s.name        = 'dongli-rails-gears'
  s.version     = DongliRailsGears::VERSION
  s.authors     = ['Li Dong']
  s.email       = ['dongli@lasg.iap.ac.cn']
  s.homepage    = 'https://github.com/dongli/dongli-rails-gears'
  s.summary     = 'This will provide some handy view components.'
  s.description = 'This is a collection of view components for Rails.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 4.2.5', '< 5.1'
  s.add_dependency 'jquery-rails'
  s.add_dependency 'sass-rails'

  # Dependencies of upload-image component
  s.add_dependency 'carrierwave'
  s.add_dependency 'mini_magick'

  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'byebug'
end
