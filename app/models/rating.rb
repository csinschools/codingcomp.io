class Rating < ApplicationRecord
  belongs_to :user
  belongs_to :submission

  validates :user, uniqueness: { scope: :submission }
end
