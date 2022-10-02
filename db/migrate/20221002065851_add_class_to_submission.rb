class AddClassToSubmission < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :classroom, :text
  end
end
