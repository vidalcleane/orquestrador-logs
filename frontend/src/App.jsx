import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xlwsnybmsckrdxgyiyko.supabase.co",
  "sb_publishable_H5Mq3d6Yx8VuEiK3Jc45ng_Q9iNS9ve"
);

const API_URL = "https://wonderful-charisma-production-57e5.up.railway.app";

export default function App() {
  const [precos, setPrecos] = useState([]);
  const [status, setStatus] = useState(null);

  const buscarPrecos = async () => {
    const { data } = await supabase
      .from("precos")
      .select("*")
      .order("criado_em", { ascending: false });
    setPrecos(data || []);
  };

  const zerarCache = async () => {
    try {
      setStatus("carregando");
      const res = await fetch(`${API_URL}/webhook/zerar`, { method: "POST" });
      if (res.ok) {
        setStatus("sucesso");
        await buscarPrecos();
      } else {
        setStatus("erro");
      }
    } catch (err) {
      console.error("Erro ao zerar cache:", err);
      setStatus("erro");
    } finally {
      setTimeout(() => setStatus(null), 3000);
    }
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
        disabled={status === "carregando"}
        className="mb-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded font-semibold"
      >
        {status === "carregando" ? "⏳ Zerando..." : "🗑️ Zerar Cache"}
      </button>

      {status === "sucesso" && (
        <span className="ml-4 text-green-400 font-semibold">✅ Cache zerado com sucesso!</span>
      )}
      {status === "erro" && (
        <span className="ml-4 text-red-400 font-semibold">❌ Erro ao zerar cache. Verifique o console.</span>
      )}

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