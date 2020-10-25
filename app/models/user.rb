class User < ApplicationRecord
  has_many :ratings
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :registerable, :recoverable,
  devise :database_authenticatable, :rememberable, :validatable

  validates :email, uniqueness: true
end
