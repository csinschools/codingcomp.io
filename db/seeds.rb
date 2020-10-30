# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

(1..3).each do |i|
  email = "test#{i}@example.com"
  password = "password"
  User.create(email: email, password: password, password_confirmation: password)
end

[
  {
    "name" => "Adventure game!",
    "url" => "https://repl.it/@theponny/CSinSchools-Simple-Adventure-Game-Template-8",
    "author" => "Some Student",
    "school" => "TKIS",
    "public" => true,
    "submitter_email" => "teacher@example.com"
  },
  {
    "name" => "Kitten Quest!",
    "url" => "https://repl.it/@theponny/CSinSchools-Simple-Adventure-Game-Template-5#main.py",
    "author" => "Some Volunteer",
    "school" => "TKIS",
    "public" => true,
    "submitter_email" => "john.sherwood.was.taken@gmail.com"
  },
  {
    "name" => "A real whiz-bang example!",
    "url" => "https://repl.it/@theponny/0403-My-Amazing-Story-John#main.py",
    "author" => "Some Volunteer",
    "school" => "TKIS",
    "public" => true,
    "submitter_email" => "john.sherwood.was.taken@gmail.com",
    "round" => Submission::EXAMPLES
  }
].each do |submission_data|
  Submission.create(submission_data)
end

user1 = User.find_by(email: "test1@example.com")
user2 = User.find_by(email: "test2@example.com")
submission1 = Submission.find_by(url: "https://repl.it/@theponny/CSinSchools-Simple-Adventure-Game-Template-8")
submission2 = Submission.find_by(url: "https://repl.it/@theponny/CSinSchools-Simple-Adventure-Game-Template-5#main.py")

Rating.create(user: user1, submission: submission1, score: 9, note: "Smashing stuff!  Wowsers it's good!")
Rating.create(user: user2, submission: submission1, score: 4, note: "Used tabs, not spaces :-\\")

Rating.create(user: user2, submission: submission2, score: 1, note: "Meh... I don't like cats!")
