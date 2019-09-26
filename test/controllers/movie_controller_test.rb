require 'test_helper'

class MovieControllerTest < ActionController::TestCase
  test "should get display_page" do
    get :display_page
    assert_response :success
  end

end
