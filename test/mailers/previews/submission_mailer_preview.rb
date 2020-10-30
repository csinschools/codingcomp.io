class SubmissionMailerPreview < ActionMailer::Preview
  def new_submission
    SubmissionMailer.with(user: User.first, submission: Submission.first).new_submission
  end
end