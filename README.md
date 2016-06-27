# Li Dong's Rails Gears
This Rails plugin contains some handy view components, such as `upload_image`:

```ruby
<%= upload_image form: f, image_name: :avatar, max_width: 150, max_height: 150 %>
```

![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-1.png)
![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-2.png)
![](http://7xvqi7.com1.z0.glb.clouddn.com/upload_image_snapshot-3.png)

## Usage
This plugin is in early development stage, so it is very immature, use it at your risk.

## Installation
Add this line to your application's Gemfile:

```ruby
gem 'dongli-rails-gears', github: 'dongli/dongli-rails-gears'
```

And then execute:
```bash
$ bundle
```

## Contributing
Feel free to contribute.

## License
The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
