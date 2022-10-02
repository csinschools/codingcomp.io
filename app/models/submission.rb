class Submission < ApplicationRecord
  has_many :ratings, dependent: :destroy
  has_many :users, through: :ratings
  accepts_nested_attributes_for :ratings

  validates :name, presence: true
  validates :upload, uniqueness: { message: "A file exactly like this one has already been submitted" }, presence: true
  validates :author, presence: true
  validates :school, presence: true
  validates :submitter_email, presence: true
  validates :round, presence: true
  validates :classroom, presence: true
  validates :course, presence: true
  validates :no_pii, acceptance: { message: "must be checked" }

  before_validation :set_uploaded_file_data

  attr_accessor :upload_file

  ROUNDS = {
    EXAMPLES = "example" => "Examples",
    LATEST = "latest" => "Latest"
  }.freeze

  COURSES = {
    "intro" => "Introduction to Coding",
    "inter" => "Intermediate Coding",
  }.freeze

  def email_judges!(except:   nil)
    User.all.each do |user|
      next if except == user

      SubmissionMailer.with(user: user, submission: self).new_submission.deliver_later
    end
  end

  private
    def set_uploaded_file_data
      if upload_file.present?
        self.upload = upload_file.read
      end
    end
end
