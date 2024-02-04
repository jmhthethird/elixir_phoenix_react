defmodule Mix.Tasks.Frontend do
  @moduledoc """
    React FrontEnd Compilation and bundling steps wrapped up in simple Mix Tasks.
  """

  use Mix.Task
  require Logger

  @public_path "./priv/static/frontend"

  def run(_) do
    Logger.info("cd ./frontend && npm install --quiet")
    System.cmd("npm", ["install", "--quiet"], cd: "./frontend")

    Logger.info("cd ./frontend && npm run build")
    System.cmd("npm", ["run", "build"], cd: "./frontend")

    Logger.info("rm -rf #{@public_path} && cp -R ./frontend/dist #{@public_path}")
    System.cmd("rm", ["-rf", @public_path])
    System.cmd("cp", ["-R", "./frontend/dist", @public_path])

    Logger.info("React FrontEnd ready.")
  end
end
