module SubmissionsHelper
  def public_entry_path(submission)
    "/entries/#{submission.id}"
  end
end
