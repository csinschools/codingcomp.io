json.extract! submission, :id, :name, :url, :author, :school, :public, :submitter_email, :created_at, :updated_at
json.url submission_url(submission, format: :json)
