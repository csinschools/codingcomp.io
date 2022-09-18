class RemoveUrl < ActiveRecord::Migration[7.0]
  def change
    remove_column :submissions, :url, :text
  end
end
