class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users
  validates :name, presence: true, uniqueness: true

  def self.search(name, id)
    return nil if name == ""
    User.where('name LIKE(?)', "%#{name}%").where.not(id: id).limit(10)
  end
end
