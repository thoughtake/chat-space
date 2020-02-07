require 'rails_helper'

describe Message do
  describe "#create" do
    context 'can save' do
      it "is valid when message is written" do
        message = build(:message, image: nil)
        message.valid?
        expect(message).to be_valid
      end
      
      it "is valid when image is written" do
        message = build(:message, content: nil)
        message.valid?
        expect(message).to be_valid
      end

      it "is valid when message & image is written" do
        message = build(:message)
        message.valid?
        expect(message).to be_valid
      end
    end

    context 'can not save' do
      it "is invalid without message & image" do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("を入力してください")
      end

      it "is invalid without group_id" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end

      it "is invalid without user_id" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end