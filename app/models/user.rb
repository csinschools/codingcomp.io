class User < ApplicationRecord
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable, :registerable, :recoverable,
  devise :database_authenticatable, :rememberable, :validatable
end
