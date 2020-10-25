class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.integer :score
      t.text :note
      t.bigint :user_id
      t.bigint :submission_id
    end
    add_foreign_key :ratings, :users
    add_foreign_key :ratings, :submissions
  end
end
