class SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:new, :create]

  # GET /submissions
  # GET /submissions.json
  def index
    @submissions = Submission.order("round desc, public, id desc").preload(:ratings, :users)
  end

  # GET /submissions/new
  def new
    @submission = Submission.new
  end

  # GET /submissions/1/edit
  def edit
    if @submission.ratings.where(user: current_user).none?
      @submission.ratings.new(user: current_user)
    end
  end

  # POST /submissions
  # POST /submissions.json
  def create
    @submission = Submission.new(submission_params)

    respond_to do |format|
      if @submission.save
        @submission.email_judges!(except: current_user)

        format.html do
          render :success, notice: "Submission was successfully created."
        end
        format.json { render :show, status: :created, location: @submission }
      else
        format.html { render :new }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /submissions/1
  # PATCH/PUT /submissions/1.json
  def update
    respond_to do |format|
      if @submission.update(submission_params)
        format.html { redirect_to submissions_path, notice: 'Submission was successfully updated.' }
        format.json { render :show, status: :ok, location: @submission }
      else
        format.html { render :edit }
        format.json { render json: @submission.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /submissions/1
  # DELETE /submissions/1.json
  def destroy
    @submission.destroy
    respond_to do |format|
      format.html { redirect_to submissions_url, notice: 'Submission was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_submission
      @submission = Submission.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def submission_params
      allowed_params = [:name, :upload_file, :author, :school, :public, :submitter_email, :submitter_name, :course, :no_pii]
      if user_signed_in?
        allowed_params += [
          :public,
          :round,
          :upload,
          ratings_attributes: [
            :id,
            :user_id,
            :submission_id,
            :score,
            :note
          ]
        ]
      end
      params.require(:submission).permit(allowed_params)
    end
end
