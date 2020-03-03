## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|name|text|null: false, foreign_key: true|
|email|text|null: false, foreign_key: true|
|password|text|null: false, foreign_key: true|
### Association
- has_many :comments
- has_many :groups
- has_many :chats

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|
|text|text|null: false, foreign_key: true|
### Association
- has_many :users
- has_many :comments

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|text|null: false|
|text|text||
### Association
belongs_to :user
belongs_to :chat
