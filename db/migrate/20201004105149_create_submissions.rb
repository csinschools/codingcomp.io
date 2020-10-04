class CreateSubmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :submissions do |t|
      t.text :name
      t.text :url
      t.text :author
      t.text :school
      t.boolean :public
      t.text :submitter_email

      t.timestamps
    end
  end
end
