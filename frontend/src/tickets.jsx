import { useState, useEffect } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newHours, setNewHours] = useState("");

  const [editId, setEditId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editHours, setEditHours] = useState("");

  // Načíst ticket z localStorage při startu
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(stored);
  }, []);

  // Uložit při každé změně
  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }, [tickets]);

  const addTicket = () => {
    if (!newSubject.trim() || !newHours.trim()) {
      alert("Vyplň předmět a počet hodin.");
      return;
    }

    const newTicket = {
      id: Date.now(),
      subject: newSubject,
      description: newDescription,
      hours: parseFloat(newHours),
      status: "Otevřený",
    };

    setTickets([...tickets, newTicket]);
    setNewSubject("");
    setNewDescription("");
    setNewHours("");
  };

  const toggleStatus = (id) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status: ticket.status === "Otevřený" ? "Vyřešený" : "Otevřený",
            }
          : ticket
      )
    );
  };

  const deleteTicket = (id) => {
    if (confirm("Opravdu chceš smazat tento ticket?")) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  const startEdit = (ticket) => {
    setEditId(ticket.id);
    setEditSubject(ticket.subject);
    setEditDescription(ticket.description);
    setEditHours(ticket.hours.toString());
  };

  const saveEdit = () => {
    setTickets(
      tickets.map((t) =>
        t.id === editId
          ? {
              ...t,
              subject: editSubject,
              description: editDescription,
              hours: parseFloat(editHours),
            }
          : t
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditSubject("");
    setEditDescription("");
    setEditHours("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🎫 Seznam ticketů</h2>

      <div className="mb-6 space-y-2 bg-white p-4 rounded shadow">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Předmět nového ticketu"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <textarea
          className="border p-2 rounded w-full"
          placeholder="Popis"
          rows={3}
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Odpracované hodiny"
          value={newHours}
          onChange={(e) => setNewHours(e.target.value)}
          min={0}
          step={0.25}
        />
        <button
          onClick={addTicket}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          💾 Přidat ticket
        </button>
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Předmět</th>
            <th className="text-left p-2">Popis</th>
            <th className="text-left p-2">Hodiny</th>
            <th className="text-left p-2">Stav</th>
            <th className="text-left p-2">Akce</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{ticket.id}</td>

              {editId === ticket.id ? (
                <>
                  <td className="p-2">
                    <input
                      className="border p-1 rounded w-full"
                      value={editSubject}
                      onChange={(e) => setEditSubject(e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      className="border p-1 rounded w-full"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      className="border p-1 rounded w-full"
                      value={editHours}
                      onChange={(e) => setEditHours(e.target.value)}
                    />
                  </td>
                  <td className="p-2">{ticket.status}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:underline"
                    >
                      Uložit
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:underline"
                    >
                      Zrušit
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2">{ticket.subject}</td>
                  <td className="p-2">{ticket.description}</td>
                  <td className="p-2">{ticket.hours} h</td>
                  <td className="p-2">{ticket.status}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => toggleStatus(ticket.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Přepnout stav
                    </button>
                    <button
                      onClick={() => startEdit(ticket)}
                      className="text-yellow-600 hover:underline"
                    >
                      Upravit
                    </button>
                    <button
                      onClick={() => deleteTicket(ticket.id)}
                      className="text-red-600 hover:underline"
                    >
                      Smazat
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
