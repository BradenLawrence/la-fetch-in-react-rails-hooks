class Api::FortunesController < ApiController
  def show
    render json: { fortune: Fortune.all.sample }
  end
end
