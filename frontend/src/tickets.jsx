import { useState } from "react";

export default function Tickets() {
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Problém s loginem", status: "Otevřený" },
    { id: 2, subject: "Chyba fakturace", status: "Vyřešený" },
  ]);
  const [newSubject, setNewSubject] = useState("");

  const addTicket = () => {
    if (!newSubject.trim()) return;
    setTickets([
      ...tickets,
      { id: tickets.length + 1, subject: newSubject, status: "Otevřený" },
    ]);
    setNewSubject("");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">🎫 Seznam ticketů</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Předmět nového ticketu"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={addTicket} className="bg-blue-500 text-white px-4 rounded">
          Přidat
        </button>
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Předmět</th>
            <th className="text-left p-2">Stav</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{ticket.id}</td>
              <td className="p-2">{ticket.subject}</td>
              <td className="p-2">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
