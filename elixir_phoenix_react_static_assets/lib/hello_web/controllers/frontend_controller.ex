defmodule HelloWeb.FrontendController do
  use HelloWeb, :controller

  def index(conn, _params) do
    conn
    |> send_resp(200, render_react_app())
  end

  defp render_react_app() do
    Application.app_dir(:hello, "priv/static/frontend/index.html")
    |> File.read!()
  end
end
