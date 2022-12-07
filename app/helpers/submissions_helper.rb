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

  def anonymized_name(full_name)
    full_name&.split(" ").first
  end
end
