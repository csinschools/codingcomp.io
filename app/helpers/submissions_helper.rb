module SubmissionsHelper
  def public_entry_path(submission)
    "/entries/#{submission.id}"
  end

  def submission_round_class(submission)
    case submission.round
    when Submission::EXAMPLES
      "badge-info"
    when Submission::LATEST
      "badge-primary"
    else
      "badge-danger"
    end
  end
end
