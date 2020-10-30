class PagesController < ApplicationController
  def main; end
  def rules; end

  def examples
    @entries = Submission.where(public: true, round: Submission::EXAMPLES).order("id desc")
  end

  def entries
    @entries = Submission.where(public: true, round: Submission::LATEST).order("id desc")
  end

  def entry
    @submission = Submission.find(params[:submission_id])

    render layout: "entry"
  end

  def repl_url_error
    @url = params[:url]
    render layout: false
  end
end
