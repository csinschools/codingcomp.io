class AddUploadField < ActiveRecord::Migration[7.0]
  def change
    add_column :submissions, :upload, :text
  end
end
