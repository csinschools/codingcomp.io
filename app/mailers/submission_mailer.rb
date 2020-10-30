class SubmissionMailer < ApplicationMailer
  def accepted(submission)
    # TODO
  end

  def rejection(submission, notes)
    # TODO
  end

  def new_submission
    @user = params[:user]
    @submission = params[:submission]

    mail(
      to: @user.email,
      subject: "New submission: #{@submission.name} by #{@submission.author} from #{@submission.school}"
    )
  end
end