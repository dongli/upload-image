module Croppable
  extend ActiveSupport::Concern

  included do
    attr_accessor :crop_x, :crop_y, :crop_w, :crop_h

    if self.name.include? 'Controller'
      before_action :set_crop_params, only: [:update]
      after_action :set_crop_params, only: [:create]

      def set_crop_params
        record = nil
        self.instance_variables.each do |name|
          record = self.instance_variable_get name
          next unless record.is_a? ActiveRecord::Base
          break
        end
        raise StandardError.new("Cannot find ActiveRecord object! #{self.instance_variables}") unless record
        model_name = record.class.name.singularize.underscore
        if params[model_name][:crop_x].present?
          record.crop_x = params[model_name][:crop_x]
          record.crop_y = params[model_name][:crop_y]
          record.crop_w = params[model_name][:crop_w]
          record.crop_h = params[model_name][:crop_h]
          if action_name == 'create'
            uploaded_file = params[model_name].select { |k,v| v.class == ActionDispatch::Http::UploadedFile }.keys.first
            record.send(uploaded_file).crop
            record.save
          end
        end
      end
    elsif self.name.include? 'Uploader'
      include CarrierWave::MiniMagick
      process :crop

      def crop
        if model.respond_to?(:crop_x) and model.crop_x.present?
          manipulate! do |img|
            x = model.crop_x
            y = model.crop_y
            w = model.crop_w
            h = model.crop_h
            img.crop("#{w}x#{h}+#{x}+#{y}")
            img
          end
        end
      end
    end
  end
end
