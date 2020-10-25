class Submission < ApplicationRecord
  has_many :ratings
  accepts_nested_attributes_for :ratings

  validates :url, uniqueness: true

  def iframe_url
    matches = url.match(/\/\/repl.it\/@(?<username>[^\/]+)\/(?<name>[^\/?&#]+)/)

    username = matches[:username].downcase
    name = matches[:name].downcase
    "https://#{name}.#{username}.repl.run/"
  end
end
