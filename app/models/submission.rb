class Submission < ApplicationRecord

  def iframe_url
    matches = url.match(/\/\/repl.it\/@(?<username>[^\/]+)\/(?<name>[^\/?&#]+)/)

    username = matches[:username].downcase
    name = matches[:name].downcase
    "https://#{name}.#{username}.repl.run/"
  end
end
