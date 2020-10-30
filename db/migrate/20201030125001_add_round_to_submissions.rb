class AddRoundToSubmissions < ActiveRecord::Migration[6.0]
  def change
    add_column :submissions, :round, :text, default: "latest"
  end
end
