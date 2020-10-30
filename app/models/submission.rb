class Submission < ApplicationRecord
  has_many :ratings, dependent: :destroy
  accepts_nested_attributes_for :ratings

  validates :name, presence: true
  validates :url, uniqueness: true, presence: true
  validates :author, presence: true
  validates :school, presence: true
  validates :submitter_email, presence: true
  validates :no_pii, acceptance: { message: "must be checked" }

  def iframe_url
    matches = url.match(/\/\/repl.it\/@(?<username>[^\/]+)\/(?<name>[^\/?&#]+)/)

    username = matches[:username].downcase
    name = matches[:name].downcase
    "https://#{name}.#{username}.repl.run/"
  end
end
