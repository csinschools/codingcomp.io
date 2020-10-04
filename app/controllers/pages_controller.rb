class PagesController < ApplicationController
  def main

  end

  def faq

  end

  def about

  end

  def rules

  end

  def entries
    @entries = Submission.where(public: true)
  end

  def entry
    @entry = Submission.find(params[:submission_id])

    render layout: "entry"
  end
end
