# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_02_065851) do
  create_table "ratings", force: :cascade do |t|
    t.integer "score"
    t.text "note"
    t.integer "user_id"
    t.integer "submission_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.text "name"
    t.text "author"
    t.text "school"
    t.boolean "public"
    t.text "submitter_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "round", default: "latest"
    t.text "submitter_name"
    t.text "course"
    t.text "upload"
    t.text "classroom"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at", precision: nil
    t.datetime "remember_created_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "ratings", "submissions"
  add_foreign_key "ratings", "users"
end
