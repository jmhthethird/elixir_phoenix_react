defmodule HelloWeb.CounterChannel do
  use HelloWeb, :channel

  @impl true
  def join("counter", _payload, socket) do
    dbg()
    {:ok, socket}
  end

  @impl true
  def handle_in("count", "current", socket) do
    dbg()

    count =
      :ets.lookup(:counter, "count")
      |> List.first()
      |> Tuple.to_list()
      |> Enum.at(1)

    {:reply, {:ok, %{count: count}}, socket}
  end

  @impl true
  def handle_in("count", payload, socket) when is_integer(payload) do
    :ets.delete(:counter, "count")
    :ets.insert_new(:counter, {"count", payload})
    :ets.lookup(:counter, "count")

    Phoenix.Channel.broadcast!(socket, "count", %{count: payload})
    {:noreply, assign(socket, :count, payload)}
  end

  @impl true
  def handle_in(_event, _payload, socket) do
    {:noreply, socket}
  end
end
