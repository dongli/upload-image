class User < ApplicationRecord
  mount_uploader :avatar, ImageUploader
  include Croppable
end
