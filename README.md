# README

## Getting the app running locally

### Start rails server

TODO: lots of steps, probably.

`bundle exec rails s`

### Seed the database

`bundle exec rake db:seed`

See db/seeds.rb for login details

### Preview the emails
http://localhost:3000/rails/mailers/submission_mailer/new_submission

## Updating the app in Production

1. Install the heroku CLI (https://devcenter.heroku.com/articles/heroku-command-line)
2. Log in to heroku: `heroku login`
3. Add the branch to push to: `heroku git:remote --app  quiet-brook-55830`
4. Push the latest up: `git push heroku main`

## Creating a user

To avoid spam signups and complexity, management is done manually via the Rails console.
To get to the rails console on the Heroku production environment:

`heroku run rails console`

Then run this command to create a user with a random password:

```ruby
password = SecureRandom.alphanumeric
User.create!(name: "Test", email: 'test@example.com', password: password, password_confirmation: password)
```