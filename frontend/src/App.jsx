import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xlwsnybmsckrdxgyiyko.supabase.co",
  "sb_publishable_H5Mq3d6Yx8VuEiK3Jc45ng_Q9iNS9ve"
);

const API_URL = "https://orquestrador-logs-production.up.railway.app/webhook";

export default function App() {
  const [precos, setPrecos] = useState([]);

  const buscarPrecos = async () => {
    const { data } = await supabase
      .from("precos")
      .select("*")
      .order("criado_em", { ascending: false });
    setPrecos(data || []);
  };

  const zerarCache = async () => {
    await fetch(`${API_URL}/zerar`, { method: "DELETE" });
    await buscarPrecos();
  };

  useEffect(() => {
    buscarPrecos();
    const interval = setInterval(buscarPrecos, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">📈 Monitor de Preços</h1>

      <button
        onClick={zerarCache}
        className="mb-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
      >
        🗑️ Zerar Cache
      </button>

      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-3 text-left">Valor</th>
            <th className="p-3 text-left">Data/Hora</th>
          </tr>
        </thead>
        <tbody>
          {precos.map((p) => (
            <tr key={p.id} className="border-t border-gray-700">
              <td className="p-3">R$ {p.valor}</td>
              <td className="p-3">{new Date(p.criado_em).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
