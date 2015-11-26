ActiveRecord::Migration.maintain_test_schema! to the top of the test_helper.rb file.
rake test:prepare
rake db:migrate
rake db:migrate RAILS_ENV=test