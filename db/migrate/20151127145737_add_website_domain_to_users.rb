class AddWebsiteDomainToUsers < ActiveRecord::Migration
  def change
    add_column :users, :website_domain, :string
  end
end
