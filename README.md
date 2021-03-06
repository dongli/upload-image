[![Gem Version](https://badge.fury.io/rb/upload-image.svg)](https://badge.fury.io/rb/upload-image)

# Upload Image
This Rails gem simplifies the implementation of uploading image. With it, you can write the following line in your `*.html.erb` as a view component:

```ruby
<%= upload_image form: f, image_name: :avatar, width: 150, height: 150 %>
```

Then you will get:

![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-1.png)
![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-2.png)
![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-3.png)

It takes advantages of `carrierwave` and `cropper.js`.

## Usage
There are some places you need to modify in your Rails app. For example:

- JavaScript asset file `app/assets/javascripts/application.js`
```js
//= require upload-image
```
- Stylesheet asset file `app/assets/stylesheets/application.scss`

```scss
//= require upload-image
```
- Model file
```ruby
class User < ApplicationRecord
  mount_uploader :avatar, ImageUploader
  include Croppable
end
```
- CarrierWave uploader file
```ruby
class ImageUploader < CarrierWave::Uploader::Base
  include Croppable
  ...
end
```
- Controller file
```ruby
class UsersController < ApplicationController
  include Croppable
  ...
end
```
- View file
```ruby
<%= upload_image form: f, image_name: :avatar, width: 150, height: 150 %>
```

Then you are good to go.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'upload-image', '~> 0.1'
```

And then execute:
```bash
$ bundle
```

Add the require statement in your `config/application.rb`:

```ruby
require 'upload-image'
```

## Contributing
Feel free to contribute.

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
