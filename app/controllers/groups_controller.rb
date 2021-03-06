class GroupsController < ApplicationController

  def index
    # @group = Group.find(current_user.id)
    # ↑メンターさんに見つけて貰ったずっと解決しなかったエラー404の原因記述。
    # Groupsテーブルからなぜか(current_)userのidを探そうとして、@groupに代入しようとしていることが原因。
    # まだどのテーブルもまっさらな状態で新規ユーザーを登録してルートのgroups#indexに跳び、上記記述を呼び出した場合、
    # テーブルにはUsersテーブルのユーザーidだけ存在し、しかもサインイン後ログイン状態なので、この作成したcurrent_user.idで
    # 何もないgroupsテーブル内のレコードを、ユーザーidで探そうとしていた。今後注意。
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

end
