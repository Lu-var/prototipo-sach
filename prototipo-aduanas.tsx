import { useState } from 'react';

type EstadoTramite = "pendiente" | "en_revision" | "aprobado" | "rechazado";
type EstadoControl = "pendiente" | "aprobado" | "rechazado";

interface Documento {
  tipo: string;
  numero: string;
  vigente: boolean;
}

interface Menor {
  esMenor: boolean;
  autorizacion: string;
  tutorRut: string;
}

interface DeclaracionSag {
  prodAnimal: boolean;
  prodVegetal: boolean;
  descripcion: string;
}

interface Vehiculo {
  patente: string;
  tipo: string;
  pais: string;
}

interface HistorialEntry {
  fecha: string;
  accion: string;
  usuario: string;
}

interface Controles {
  sag: EstadoControl;
  pdi: EstadoControl;
}

interface Tramite {
  id: string;
  estado: EstadoTramite;
  viajero: { nombre: string; rut: string; pasaporte: string };
  documentos: Documento[];
  menor: Menor | null;
  declaracionSag: DeclaracionSag;
  vehiculo: Vehiculo | null;
  qrCode: string;
  controles: Controles;
  historial: HistorialEntry[];
}

const MOCK_FUNCIONARIO = { nombre: "Carlos Muñoz", rol: "Funcionario SNA" };

const MOCK_TRAMITES: Tramite[] = [
  {
    id: "TR-001", estado: "pendiente",
    viajero: { nombre: "Juan Pérez", rut: "12.345.678-9", pasaporte: "P123456" },
    documentos: [{ tipo: "Cédula de Identidad", numero: "12.345.678-9", vigente: true }],
    menor: null,
    declaracionSag: { prodAnimal: false, prodVegetal: false, descripcion: "" },
    vehiculo: { patente: "ABC-123", tipo: "Automóvil", pais: "Chile" },
    qrCode: "TR-001-2026",
    controles: { sag: "pendiente", pdi: "pendiente" },
    historial: [{ fecha: "2026-06-23 10:30", accion: "Trámite creado por viajero", usuario: "Sistema" }]
  },
  {
    id: "TR-002", estado: "pendiente",
    viajero: { nombre: "María González", rut: "15.678.901-2", pasaporte: "" },
    documentos: [
      { tipo: "Cédula de Identidad", numero: "15.678.901-2", vigente: true },
      { tipo: "Pasaporte", numero: "P789012", vigente: true }
    ],
    menor: { esMenor: true, autorizacion: "AUT-2026-045", tutorRut: "8.765.432-1" },
    declaracionSag: { prodAnimal: true, prodVegetal: false, descripcion: "Queso artesanal 2kg" },
    vehiculo: null, qrCode: "TR-002-2026",
    controles: { sag: "pendiente", pdi: "pendiente" },
    historial: [{ fecha: "2026-06-23 11:15", accion: "Trámite creado por viajero", usuario: "Sistema" }]
  },
  {
    id: "TR-003", estado: "en_revision",
    viajero: { nombre: "Pedro Soto", rut: "20.123.456-7", pasaporte: "" },
    documentos: [{ tipo: "Cédula de Identidad", numero: "20.123.456-7", vigente: true }],
    menor: null,
    declaracionSag: { prodAnimal: false, prodVegetal: true, descripcion: "Manzanas 5kg" },
    vehiculo: { patente: "XYZ-789", tipo: "Camioneta", pais: "Argentina" },
    qrCode: "TR-003-2026",
    controles: { sag: "aprobado", pdi: "pendiente" },
    historial: [
      { fecha: "2026-06-23 09:00", accion: "Trámite creado por viajero", usuario: "Sistema" },
      { fecha: "2026-06-23 09:45", accion: "Control SAG aprobado", usuario: "Carlos Muñoz" }
    ]
  },
  {
    id: "TR-004", estado: "aprobado",
    viajero: { nombre: "Ana Vega", rut: "18.987.654-3", pasaporte: "P345678" },
    documentos: [
      { tipo: "Cédula de Identidad", numero: "18.987.654-3", vigente: true },
      { tipo: "Pasaporte", numero: "P345678", vigente: true }
    ],
    menor: null,
    declaracionSag: { prodAnimal: false, prodVegetal: false, descripcion: "" },
    vehiculo: { patente: "DEF-456", tipo: "Automóvil", pais: "Chile" },
    qrCode: "TR-004-2026",
    controles: { sag: "aprobado", pdi: "aprobado" },
    historial: [
      { fecha: "2026-06-22 14:00", accion: "Trámite creado por viajero", usuario: "Sistema" },
      { fecha: "2026-06-22 14:30", accion: "Control SAG aprobado", usuario: "Carlos Muñoz" },
      { fecha: "2026-06-22 14:35", accion: "Control PDI aprobado", usuario: "Carlos Muñoz" },
      { fecha: "2026-06-22 14:40", accion: "Trámite aprobado", usuario: "Carlos Muñoz" }
    ]
  },
  {
    id: "TR-005", estado: "rechazado",
    viajero: { nombre: "Luis Torres", rut: "10.111.222-3", pasaporte: "" },
    documentos: [{ tipo: "Cédula de Identidad", numero: "10.111.222-3", vigente: false }],
    menor: null,
    declaracionSag: { prodAnimal: true, prodVegetal: true, descripcion: "Carnes y verduras sin declarar" },
    vehiculo: { patente: "GHI-789", tipo: "Bus", pais: "Perú" },
    qrCode: "TR-005-2026",
    controles: { sag: "rechazado", pdi: "rechazado" },
    historial: [
      { fecha: "2026-06-22 16:00", accion: "Trámite creado por viajero", usuario: "Sistema" },
      { fecha: "2026-06-22 16:20", accion: "Control SAG rechazado", usuario: "Carlos Muñoz" },
      { fecha: "2026-06-22 16:25", accion: "Control PDI rechazado", usuario: "Carlos Muñoz" },
      { fecha: "2026-06-22 16:30", accion: "Trámite rechazado", usuario: "Carlos Muñoz" }
    ]
  }
];

const ESTADOS: string[] = ["todos", "pendiente", "en_revision", "aprobado", "rechazado"];

const LABEL_ESTADO: Record<string, { label: string; bg: string; text: string }> = {
  pendiente: { label: "Pendiente", bg: "bg-amber-100", text: "text-amber-800" },
  en_revision: { label: "En Revisión", bg: "bg-blue-100", text: "text-blue-800" },
  aprobado: { label: "Aprobado", bg: "bg-emerald-100", text: "text-emerald-800" },
  rechazado: { label: "Rechazado", bg: "bg-red-100", text: "text-red-800" }
};

const LABEL_CONTROL: Record<string, { label: string; bg: string; text: string }> = {
  pendiente: { label: "Pendiente", bg: "bg-amber-100", text: "text-amber-700" },
  aprobado: { label: "Aprobado", bg: "bg-emerald-100", text: "text-emerald-700" },
  rechazado: { label: "Rechazado", bg: "bg-red-100", text: "text-red-700" }
};

// --- Components ---

function EntryScreen({ onIngresar }: { onIngresar: () => void }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">A</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-1">Sistema Aduanero</h1>
        <p className="text-sm text-slate-500 mb-6">Control Fronterizo Digital</p>
        <button
          onClick={onIngresar}
          className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-950 transition-colors"
        >
          Ingresar como Funcionario
        </button>
      </div>
    </div>
  );
}

function BadgeEstado({ estado }: { estado: EstadoTramite }) {
  const s = LABEL_ESTADO[estado] || LABEL_ESTADO.pendiente;
  return <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${s.bg} ${s.text}`}>{s.label}</span>;
}

function BadgeControl({ estado }: { estado: EstadoControl }) {
  const s = LABEL_CONTROL[estado] || LABEL_CONTROL.pendiente;
  return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.bg} ${s.text}`}>{s.label}</span>;
}

function DashboardView({
  tramites, filtroEstado, setFiltroEstado, filtroBusqueda, setFiltroBusqueda, onVerDetalle
}: {
  tramites: Tramite[];
  filtroEstado: string;
  setFiltroEstado: (v: string) => void;
  filtroBusqueda: string;
  setFiltroBusqueda: (v: string) => void;
  onVerDetalle: (id: string) => void;
}) {
  const filtrados = tramites.filter(t => {
    if (filtroEstado !== "todos" && t.estado !== filtroEstado) return false;
    if (filtroBusqueda) {
      const q = filtroBusqueda.toLowerCase();
      return t.viajero.nombre.toLowerCase().includes(q) || t.viajero.rut.includes(q) || t.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Panel de Control</h2>
        <p className="text-sm text-slate-500">{tramites.length} trámites registrados</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre, RUT o ID..."
          value={filtroBusqueda}
          onChange={e => setFiltroBusqueda(e.target.value)}
          className="flex-1 min-w-[200px] border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filtroEstado}
          onChange={e => setFiltroEstado(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {ESTADOS.map(e => (
            <option key={e} value={e}>{e === "todos" ? "Todos los estados" : LABEL_ESTADO[e]?.label || e}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs border-b">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Viajero</th>
                <th className="px-4 py-3 font-semibold">RUT</th>
                <th className="px-4 py-3 font-semibold">Vehículo</th>
                <th className="px-4 py-3 font-semibold">SAG</th>
                <th className="px-4 py-3 font-semibold">PDI</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
                <th className="px-4 py-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">No se encontraron trámites</td></tr>
              ) : filtrados.map(t => (
                <tr key={t.id} className="border-b hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-slate-900">{t.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{t.viajero.nombre}</td>
                  <td className="px-4 py-3 text-slate-600">{t.viajero.rut}</td>
                  <td className="px-4 py-3 text-slate-600">{t.vehiculo ? t.vehiculo.patente : "—"}</td>
                  <td className="px-4 py-3"><BadgeControl estado={t.controles.sag} /></td>
                  <td className="px-4 py-3"><BadgeControl estado={t.controles.pdi} /></td>
                  <td className="px-4 py-3"><BadgeEstado estado={t.estado} /></td>
                  <td className="px-4 py-3">
                    <button onClick={() => onVerDetalle(t.id)}
                      className="text-blue-700 hover:text-blue-900 font-medium text-xs">Ver detalle</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EscanearQRView({ onResultado }: { onResultado: (qr: string, setError: (msg: string) => void) => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleBuscar = () => {
    const val = input.trim();
    if (!val) { setError("Ingrese un código QR válido"); return; }
    onResultado(val, setError);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Escanear Código QR</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center space-y-4">
        <div className="w-32 h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center mx-auto bg-slate-50">
          <span className="text-slate-400 text-xs">[QR]</span>
        </div>
        <p className="text-sm text-slate-500">Ingrese el código QR del trámite o escanee con la cámara</p>
        <input
          type="text"
          placeholder="Ej: TR-001-2026"
          value={input}
          onChange={e => { setInput(e.target.value); setError(""); }}
          className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button onClick={handleBuscar}
          className="w-full bg-blue-900 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-950 transition-colors">
          Buscar Trámite
        </button>
      </div>
    </div>
  );
}

function TramiteDetailView({
  tramite, onActualizar, onVolver
}: {
  tramite: Tramite;
  onActualizar: (id: string, campo: string, valor: string | null) => void;
  onVolver: () => void;
}) {
  const handleActualizar = (campo: string, valor: string | null) => {
    onActualizar(tramite.id, campo, valor);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onVolver}
          className="text-blue-700 hover:text-blue-900 font-medium text-sm flex items-center gap-1">
          <span>&larr;</span> Volver al panel
        </button>
        <BadgeEstado estado={tramite.estado} />
      </div>

      <h2 className="text-xl font-bold text-slate-800">Trámite {tramite.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
          <h3 className="font-semibold text-slate-800 border-b pb-2">Datos del Viajero</h3>
          <div className="space-y-1.5 text-sm">
            <p><span className="text-slate-500">Nombre:</span> <span className="font-medium">{tramite.viajero.nombre}</span></p>
            <p><span className="text-slate-500">RUT:</span> <span className="font-medium">{tramite.viajero.rut}</span></p>
            {tramite.viajero.pasaporte && <p><span className="text-slate-500">Pasaporte:</span> <span className="font-medium">{tramite.viajero.pasaporte}</span></p>}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
          <h3 className="font-semibold text-slate-800 border-b pb-2">Documentos</h3>
          {tramite.documentos.map((d, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{d.tipo}: <span className="font-medium">{d.numero}</span></span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d.vigente ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {d.vigente ? "Vigente" : "Vencido"}
              </span>
            </div>
          ))}
        </div>

        {tramite.menor && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Menor de Edad</h3>
            <div className="space-y-1.5 text-sm">
              <p>Requiere autorización: <span className="font-medium">{tramite.menor.autorizacion}</span></p>
              <p><span className="text-slate-500">Tutor RUT:</span> <span className="font-medium">{tramite.menor.tutorRut}</span></p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
          <h3 className="font-semibold text-slate-800 border-b pb-2">Declaración SAG</h3>
          <div className="space-y-1.5 text-sm">
            <p>Prod. animal: <span className="font-medium">{tramite.declaracionSag.prodAnimal ? "Sí" : "No"}</span></p>
            <p>Prod. vegetal: <span className="font-medium">{tramite.declaracionSag.prodVegetal ? "Sí" : "No"}</span></p>
            {tramite.declaracionSag.descripcion && <p><span className="text-slate-500">Detalle:</span> <span className="font-medium">{tramite.declaracionSag.descripcion}</span></p>}
          </div>
        </div>

        {tramite.vehiculo && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
            <h3 className="font-semibold text-slate-800 border-b pb-2">Vehículo</h3>
            <div className="space-y-1.5 text-sm">
              <p>Patente: <span className="font-medium">{tramite.vehiculo.patente}</span></p>
              <p>Tipo: <span className="font-medium">{tramite.vehiculo.tipo}</span></p>
              <p>País origen: <span className="font-medium">{tramite.vehiculo.pais}</span></p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
          <h3 className="font-semibold text-slate-800 border-b pb-2">Código QR</h3>
          <div className="flex flex-col items-center gap-2 py-2">
            <div className="w-28 h-28 bg-blue-950 rounded-xl flex items-center justify-center">
              <div className="grid grid-cols-5 gap-0.5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`w-3.5 h-3.5 ${Math.random() > 0.5 ? "bg-white" : "bg-transparent"}`} />
                ))}
              </div>
            </div>
            <span className="text-xs font-mono text-slate-500">{tramite.qrCode}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <h3 className="font-semibold text-slate-800 border-b pb-2">Acciones de Validación</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleActualizar("aprobar", null)}
            disabled={tramite.estado === "aprobado" || tramite.estado === "rechazado"}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Aprobar Trámite
          </button>
          <button
            onClick={() => handleActualizar("rechazar", null)}
            disabled={tramite.estado === "aprobado" || tramite.estado === "rechazado"}
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Rechazar Trámite
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Control SAG</label>
            <select
              value={tramite.controles.sag}
              onChange={e => handleActualizar("controlSag", e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Control PDI</label>
            <select
              value={tramite.controles.pdi}
              onChange={e => handleActualizar("controlPdi", e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="pendiente">Pendiente</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-3">
        <h3 className="font-semibold text-slate-800 border-b pb-2">Historial del Trámite</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[...tramite.historial].reverse().map((h, i) => (
            <div key={i} className="flex items-start gap-3 text-sm py-1.5 border-b border-slate-50 last:border-0">
              <span className="text-slate-400 font-mono text-xs whitespace-nowrap mt-0.5">{h.fecha}</span>
              <span className="text-slate-700">{h.accion}</span>
              <span className="text-slate-400 text-xs ml-auto whitespace-nowrap">{h.usuario}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- App ---

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tramites, setTramites] = useState<Tramite[]>(MOCK_TRAMITES);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  const now = () => new Date().toLocaleString("es-CL");

  const handleActualizarTramite = (id: string, campo: string, valor: string | null) => {
    setTramites(prev => prev.map(t => {
      if (t.id !== id) return t;
      const nuevo: Tramite = { ...t, historial: [...t.historial] };

      if (campo === "controlSag") {
        nuevo.controles = { ...nuevo.controles, sag: valor as EstadoControl };
        nuevo.historial.push({
          fecha: now(),
          accion: `Control SAG ${valor === "aprobado" ? "aprobado" : valor === "rechazado" ? "rechazado" : "marcado como pendiente"}`,
          usuario: MOCK_FUNCIONARIO.nombre
        });
      } else if (campo === "controlPdi") {
        nuevo.controles = { ...nuevo.controles, pdi: valor as EstadoControl };
        nuevo.historial.push({
          fecha: now(),
          accion: `Control PDI ${valor === "aprobado" ? "aprobado" : valor === "rechazado" ? "rechazado" : "marcado como pendiente"}`,
          usuario: MOCK_FUNCIONARIO.nombre
        });
      } else if (campo === "aprobar") {
        nuevo.estado = "aprobado";
        nuevo.historial.push({ fecha: now(), accion: "Trámite aprobado", usuario: MOCK_FUNCIONARIO.nombre });
      } else if (campo === "rechazar") {
        nuevo.estado = "rechazado";
        nuevo.historial.push({ fecha: now(), accion: "Trámite rechazado", usuario: MOCK_FUNCIONARIO.nombre });
      }

      if (campo === "controlSag" || campo === "controlPdi") {
        if (nuevo.controles.sag === "rechazado" || nuevo.controles.pdi === "rechazado") {
          nuevo.estado = "rechazado";
        } else if (nuevo.controles.sag === "aprobado" && nuevo.controles.pdi === "aprobado") {
          nuevo.estado = "aprobado";
        } else if (nuevo.controles.sag !== "pendiente" || nuevo.controles.pdi !== "pendiente") {
          if (nuevo.estado === "pendiente") nuevo.estado = "en_revision";
        }
      }

      return nuevo;
    }));
  };

  const handleVerDetalle = (id: string) => {
    setSelectedId(id);
    setCurrentRoute("tramite");
  };

  const handleResultadoQR = (qrInput: string, setError: (msg: string) => void) => {
    const match = tramites.find(t => t.qrCode === qrInput || t.id === qrInput);
    if (match) {
      setSelectedId(match.id);
      setCurrentRoute("tramite");
    } else {
      setError("No se encontró un trámite con ese código QR");
    }
  };

  const handleVolver = () => {
    setSelectedId(null);
    setCurrentRoute("dashboard");
  };

  if (!loggedIn) return <EntryScreen onIngresar={() => setLoggedIn(true)} />;

  const tramiteActual = selectedId ? tramites.find(t => t.id === selectedId) : null;

  const navItems = [
    { id: "dashboard", label: "Panel de Control" },
    { id: "escanear", label: "Escanear QR" }
  ];

  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden">
      <aside className="w-56 bg-blue-900 text-white flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-blue-800">
          <h1 className="text-lg font-bold">Sistema Aduanero</h1>
          <p className="text-xs text-blue-300 mt-0.5">Control Fronterizo</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentRoute(item.id); if (item.id !== "tramite") setSelectedId(null); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentRoute === item.id ? "bg-blue-800 text-white" : "text-blue-200 hover:bg-blue-800/50 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-blue-800 text-blue-300 text-xs space-y-1">
          <p className="font-medium text-blue-200">{MOCK_FUNCIONARIO.nombre}</p>
          <p>{MOCK_FUNCIONARIO.rol}</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-slate-500">
            {currentRoute === "dashboard" && "Panel de Control"}
            {currentRoute === "escanear" && "Escanear QR"}
            {currentRoute === "tramite" && `Trámite ${selectedId}`}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
              {MOCK_FUNCIONARIO.nombre.charAt(0)}
            </div>
            {MOCK_FUNCIONARIO.nombre}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto pb-8">
            {currentRoute === "dashboard" && (
              <DashboardView
                tramites={tramites}
                filtroEstado={filtroEstado}
                setFiltroEstado={setFiltroEstado}
                filtroBusqueda={filtroBusqueda}
                setFiltroBusqueda={setFiltroBusqueda}
                onVerDetalle={handleVerDetalle}
              />
            )}
            {currentRoute === "escanear" && (
              <EscanearQRView onResultado={handleResultadoQR} />
            )}
            {currentRoute === "tramite" && tramiteActual && (
              <TramiteDetailView
                tramite={tramiteActual}
                onActualizar={handleActualizarTramite}
                onVolver={handleVolver}
              />
            )}
            {currentRoute === "tramite" && !tramiteActual && (
              <p className="text-slate-500 text-center py-8">Trámite no encontrado</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
