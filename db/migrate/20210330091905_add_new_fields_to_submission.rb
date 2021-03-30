class AddNewFieldsToSubmission < ActiveRecord::Migration[6.0]
  def change
    add_column :submissions, :submitter_name, :text
    add_column :submissions, :course, :text
  end
end
