$:.push File.expand_path('../lib', __FILE__)

require 'upload-image/version'

Gem::Specification.new do |s|
  s.name        = 'upload-image'
  s.version     = UploadImage::VERSION
  s.authors     = ['Li Dong']
  s.email       = ['dongli.init@gmail.com']
  s.homepage    = 'https://github.com/dongli/upload-image'
  s.summary     = 'This gem helps to simplify the image upload implementation.'
  s.description = 'This gem hides the details for implementing an image upload view component with crop function.'
  s.license     = 'MIT'

  s.files = Dir['{app,config,lib}/**/*', 'MIT-LICENSE', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '>= 4.2.5', '<= 5.1.4'
  s.add_dependency 'jquery-rails', '~> 4.3.1'
  s.add_dependency 'sass-rails', '~> 5.0'

  s.add_dependency 'carrierwave', '~> 1.2.1'
  s.add_dependency 'mini_magick', '~> 4.8'

  s.add_development_dependency 'sqlite3', '~> 1.3'
  s.add_development_dependency 'byebug', '~> 9.0'
end
