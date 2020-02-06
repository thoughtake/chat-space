class Message < ApplicationRecord
  belongs_to :users
  belongs_to :groups

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
