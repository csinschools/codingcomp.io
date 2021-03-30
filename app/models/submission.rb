class Submission < ApplicationRecord
  has_many :ratings, dependent: :destroy
  has_many :users, through: :ratings
  accepts_nested_attributes_for :ratings

  validates :name, presence: true
  validates :url, uniqueness: { message: "This url has already beeen submitted" }, presence: true
  validates :author, presence: true
  validates :school, presence: true
  validates :submitter_email, presence: true
  validates :round, presence: true
  validates :no_pii, acceptance: { message: "must be checked" }

  ROUNDS = {
    EXAMPLES = "example" => "Examples",
    LATEST = "latest" => "Latest"
  }.freeze

  COURSES = {
    "intro" => "Introduction to Coding",
    "inter" => "Intermediate Coding",
    "proj1" => "Industry Project I"
  }.freeze

  def iframe_url
    matches = url.match(/\/\/repl.it\/@(?<username>[^\/]+)\/(?<name>[^\/?&#]+)/)

    username = matches[:username].downcase
    name = matches[:name].downcase
    "https://#{name}.#{username}.repl.run/"
  rescue StandardError => e
    "/repl-url-error?url=#{CGI.escape(url)}"
  end

  def email_judges!(except: nil)
    User.all.each do |user|
      next if except == user

      SubmissionMailer.with(user: user, submission: self).new_submission.deliver_later
    end
  end
end
