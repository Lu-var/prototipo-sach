/*
PROMPT ORIGINAL DE GENERACION
---------------------------------------
Necesito crear un prototipo web de resolución media para una plataforma llamada “On Tour - Gestión de Giras de Estudio”.

Contexto:
La agencia de viajes On Tour vende paquetes turísticos para giras de estudio. Actualmente los apoderados no tienen información clara sobre contratos, pagos, saldos, seguros ni documentos. La agencia necesita una plataforma que permita transparentar el proceso, mostrar avances de pago, administrar contratos, subir documentos, registrar depósitos y generar reportes.

Actores:
- Apoderado
- Representante del curso
- Ejecutivo de ventas
- Dueño de la agencia
- Administrador

Diseña un prototipo web con navegación incluida y estilo limpio, institucional y fácil de usar.

Pantallas necesarias:
1. Login
2. Dashboard Apoderado
3. Estado de cuenta del alumno
4. Contrato y servicios contratados
5. Seguros y descarga de póliza
6. Dashboard Ejecutivo
7. Registrar contrato
8. Registrar depósito
9. Subir documentos
10. Gestionar seguros
11. Dashboard Dueño con reporte de avance por colegio
12. Panel de administración

Requisitos visuales:
- Barra lateral de navegación
- Tarjetas de resumen
- Tablas simples
- Barra de progreso de meta
- Botones claros: Ver detalle, Descargar PDF, Registrar depósito, Subir documento, Notificar
- Diseño de media resolución, no demasiado básico ni completamente final
- Usar colores relacionados con turismo, confianza y profesionalismo: azul, blanco y verde suave

Flujo de navegación:
Login → Dashboard según rol.
Apoderado → Estado de cuenta / Contrato / Seguros.
Ejecutivo → Registrar contrato / Registrar depósito / Subir documentos / Gestionar seguros.
Dueño → Reportes de avance.
Administrador → Mantención de usuarios, clientes, destinos, actividades y aseguradoras.

Genera el prototipo con componentes reutilizables y navegación entre pantallas.
*/

import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  UploadCloud, 
  Users, 
  Settings, 
  LogOut, 
  Map, 
  Briefcase,
  AlertCircle,
  CheckCircle,
  Download,
  PlusCircle,
  TrendingUp,
  FileSearch,
  UserCheck
} from 'lucide-react';

const mockData = {
  apoderado: {
    nombre: "Carlos Andrade",
    alumno: "Tomás Andrade",
    curso: "4° Medio A - Colegio San Agustín",
    meta: { total: 1200000, pagado: 800000 },
    metaGrupal: { total: 38400000, actual: 28800000 },
    movimientos: [
      { id: 1, fecha: "10/05/2026", desc: "Cuota 3 / 6", monto: 200000, estado: "Aprobado" },
      { id: 2, fecha: "12/04/2026", desc: "Cuota 2 / 6", monto: 200000, estado: "Aprobado" },
      { id: 3, fecha: "05/06/2026", desc: "Depósito Extra", monto: 100000, estado: "Pendiente" },
    ]
  },
  ejecutivo: {
    nombre: "Martín Silva",
    alertas: [
      { id: 1, tipo: "pago", texto: "3 Depósitos pendientes por validar - Colegio San Agustín" },
      { id: 2, tipo: "doc", texto: "12 Fichas médicas faltantes - Orchard College" }
    ],
    alumnosSeguros: [
      { id: 1, alumno: "Tomás Andrade", rut: "21.345.xxx-x", pago: "Al día", seguro: "Assist Card", estado: "Asignado" },
      { id: 2, alumno: "Sofía Acuña", rut: "21.567.xxx-x", pago: "Al día", seguro: "Assist Card", estado: "Asignado" },
      { id: 3, alumno: "Diego Castro", rut: "21.890.xxx-x", pago: "Moroso", seguro: "Sin Asignar", estado: "Bloqueado" },
    ]
  },
  dueno: {
    nombre: "Roberto Montes",
    kpis: { recaudado: 45200000, contratos: 14, metaCumplida: 68 },
    colegios: [
      { id: 1, nombre: "San Agustín 4°A", ejecutivo: "Martín Silva", alumnos: 32, meta: 38400000, avance: 75, estado: "En proceso" },
      { id: 2, nombre: "Orchard College 4°B", ejecutivo: "Martín Silva", alumnos: 25, meta: 30000000, avance: 100, estado: "Completado" },
      { id: 3, nombre: "Inst. Nacional 4°C", ejecutivo: "Elena Gómez", alumnos: 40, meta: 48000000, avance: 15, estado: "En Alerta" },
    ]
  },
  destinos: [
    { id: 1, nombre: "Bariloche", pais: "Argentina", temporada: "Inv/Pri", estado: "Activo" },
    { id: 2, nombre: "Camboriú", pais: "Brasil", temporada: "Verano", estado: "Activo" },
    { id: 3, nombre: "Pucón", pais: "Chile", temporada: "Primavera", estado: "Inactivo" },
  ]
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-5 ${className}`}>
    {children}
  </div>
);

const ProgressBar = ({ current, total, colorClass = "bg-emerald-500" }) => {
  const percent = Math.min(Math.round((current / total) * 100), 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1 text-slate-600 font-medium">
        <span>Avance: {percent}%</span>
        <span>${current.toLocaleString()} / ${total.toLocaleString()}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div className={`${colorClass} h-2.5 rounded-full`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

const Button = ({ children, onClick, variant = 'primary', className = "", icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-800",
    secondary: "bg-white text-blue-800 border border-blue-800 hover:bg-blue-50 focus:ring-blue-800",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-600",
    outline: "bg-transparent text-slate-600 border border-slate-300 hover:bg-slate-50 focus:ring-slate-500"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-800 text-white mb-4">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">On Tour</h1>
          <p className="text-slate-500 mt-2">Gestión de Giras de Estudio</p>
        </div>

        <Card className="shadow-lg">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">Selecciona un rol de prueba</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline" onClick={() => onLogin('apoderado')} icon={Users}>
              Entrar como Apoderado
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => onLogin('ejecutivo')} icon={Briefcase}>
              Entrar como Ejecutivo de Ventas
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => onLogin('dueno')} icon={TrendingUp}>
              Entrar como Dueño (Gerencia)
            </Button>
            <Button className="w-full justify-start" variant="outline" onClick={() => onLogin('admin')} icon={Settings}>
              Entrar como Administrador
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ApoderadoDashboard = ({ navigate }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Bienvenido, {mockData.apoderado.nombre}</h2>
      <p className="text-slate-500">Apoderado de {mockData.apoderado.alumno} • {mockData.apoderado.curso}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-l-4 border-l-blue-800">
        <p className="text-sm text-slate-500 font-medium">Monto Total Gira</p>
        <p className="text-2xl font-bold text-slate-800">${mockData.apoderado.meta.total.toLocaleString()}</p>
      </Card>
      <Card className="border-l-4 border-l-emerald-500">
        <p className="text-sm text-slate-500 font-medium">Total Pagado</p>
        <p className="text-2xl font-bold text-slate-800">${mockData.apoderado.meta.pagado.toLocaleString()}</p>
      </Card>
      <Card className="border-l-4 border-l-amber-500">
        <p className="text-sm text-slate-500 font-medium">Saldo Pendiente</p>
        <p className="text-2xl font-bold text-slate-800">${(mockData.apoderado.meta.total - mockData.apoderado.meta.pagado).toLocaleString()}</p>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Progreso del Alumno</h3>
      <ProgressBar current={mockData.apoderado.meta.pagado} total={mockData.apoderado.meta.total} />
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Meta del Curso (Gira a Bariloche)</h3>
        <ProgressBar current={mockData.apoderado.metaGrupal.actual} total={mockData.apoderado.metaGrupal.total} colorClass="bg-blue-600" />
      </div>
    </Card>
  </div>
);

const EstadoCuenta = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Estado de Cuenta</h2>
      <Button variant="success" icon={DollarSign}>Registrar Depósito / Pago</Button>
    </div>

    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Monto</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {mockData.apoderado.movimientos.map((mov) => (
              <tr key={mov.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4">{mov.fecha}</td>
                <td className="px-6 py-4 font-medium text-slate-900">{mov.desc}</td>
                <td className="px-6 py-4">${mov.monto.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    mov.estado === 'Aprobado' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {mov.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    {mov.estado === 'Aprobado' ? 'Descargar PDF' : 'Ver Detalle'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const ContratoServicios = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800">Contrato y Servicios</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <div className="flex items-start space-x-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-800">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">CONTRATO MARCO #GIRA-2026-09</h3>
            <p className="text-sm text-slate-500">Versión Digital Firmada v2.1</p>
          </div>
        </div>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between mb-6">
          <span className="flex items-center text-sm font-medium text-slate-700">
            <FileSearch className="w-4 h-4 mr-2" /> Contrato_SanAgustin.pdf
          </span>
          <span className="text-xs text-slate-500">2.4 MB</span>
        </div>
        <Button variant="primary" icon={Download} className="w-full">Descargar Contrato PDF</Button>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Servicios Incluidos</h3>
        <ul className="space-y-3">
          {['Hotel Bariloche Resort (5 Estrellas)', 'Pensión Completa (Desayuno/Almuerzo/Cena)', 'Seguro de Asistencia Básica', 'Coordinador de Grupo 24/7', 'Excursión Cerro Catedral'].map((servicio, idx) => (
            <li key={idx} className="flex items-center text-slate-700">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
              <span>{servicio}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  </div>
);

const SegurosPoliza = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800">Seguros y Cobertura</h2>
    <Card className="border-t-4 border-t-emerald-500">
      <div className="flex items-center mb-6">
        <ShieldCheck className="w-8 h-8 text-emerald-500 mr-3" />
        <div>
          <h3 className="text-lg font-bold text-slate-800">Aseguradora Activa: Assist Card Grupal</h3>
          <p className="text-sm text-slate-500">Cobertura Internacional Estudiantil</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500 uppercase font-semibold">Nº de Póliza</p>
          <p className="text-lg font-medium text-slate-900">AC-998234-2026</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-xs text-slate-500 uppercase font-semibold">Cobertura Médica</p>
          <p className="text-lg font-medium text-slate-900">Hasta $50.000 USD</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="primary" icon={Download}>Descargar Póliza</Button>
        <Button variant="secondary" icon={UploadCloud}>Subir Ficha Médica</Button>
      </div>
    </Card>
  </div>
);

const EjecutivoDashboard = () => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Panel Ejecutivo: {mockData.ejecutivo.nombre}</h2>
      <p className="text-slate-500">Resumen y alertas de tu cartera de colegios.</p>
    </div>

    <Card className="border-l-4 border-l-amber-500">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
        Alertas de Acción Requerida
      </h3>
      <ul className="space-y-3">
        {mockData.ejecutivo.alertas.map(alerta => (
          <li key={alerta.id} className="flex items-center p-3 bg-amber-50 rounded-lg text-amber-900 text-sm">
             <div className="w-2 h-2 rounded-full bg-amber-500 mr-3"></div>
             {alerta.texto}
          </li>
        ))}
      </ul>
    </Card>

    <h3 className="text-lg font-semibold text-slate-800 mt-6">Accesos Rápidos</h3>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center py-8 text-center group">
        <div className="p-3 bg-blue-50 text-blue-800 rounded-full mb-3 group-hover:bg-blue-100"><PlusCircle className="w-6 h-6" /></div>
        <span className="font-medium text-slate-800">Nuevo Contrato</span>
      </Card>
      <Card className="hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center py-8 text-center group">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full mb-3 group-hover:bg-emerald-100"><DollarSign className="w-6 h-6" /></div>
        <span className="font-medium text-slate-800">Cargar Pago</span>
      </Card>
      <Card className="hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center py-8 text-center group">
        <div className="p-3 bg-purple-50 text-purple-600 rounded-full mb-3 group-hover:bg-purple-100"><UploadCloud className="w-6 h-6" /></div>
        <span className="font-medium text-slate-800">Subir Archivos</span>
      </Card>
      <Card className="hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center py-8 text-center group">
        <div className="p-3 bg-orange-50 text-orange-600 rounded-full mb-3 group-hover:bg-orange-100"><ShieldCheck className="w-6 h-6" /></div>
        <span className="font-medium text-slate-800">Seguros</span>
      </Card>
    </div>
  </div>
);

const FormularioGenerico = ({ titulo, children, textoBoton }) => (
  <div className="max-w-2xl">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">{titulo}</h2>
    <Card>
      <div className="space-y-5">
        {children}
        <div className="pt-4 flex justify-end space-x-3 border-t border-slate-100 mt-6">
          <Button variant="outline">Cancelar</Button>
          <Button variant="success">{textoBoton}</Button>
        </div>
      </div>
    </Card>
  </div>
);

const RegistrarContrato = () => (
  <FormularioGenerico titulo="Registrar Nuevo Contrato" textoBoton="Guardar y Generar PDF">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Colegio</label>
        <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
          <option>Seleccionar Colegio...</option>
          <option>Colegio San Agustín</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Curso</label>
        <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-blue-500 focus:border-blue-500">
          <option>Seleccionar Curso...</option>
          <option>4° Medio A</option>
        </select>
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Representante del Curso (RUT)</label>
      <input type="text" placeholder="Ej: 15.123.456-7" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Destino</label>
        <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm">
          <option>Bariloche</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Valor por Alumno ($)</label>
        <input type="number" defaultValue={1200000} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
      </div>
    </div>
  </FormularioGenerico>
);

const RegistrarDeposito = () => (
  <FormularioGenerico titulo="Registrar Depósito Manual" textoBoton="Aprobar Depósito">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Alumno</label>
      <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm">
        <option>Tomás Andrade - 4°A San Agustín</option>
      </select>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Monto Depositado</label>
        <input type="number" placeholder="$" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Medio de Pago</label>
        <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm">
          <option>Transferencia Bancaria</option>
          <option>Efectivo</option>
        </select>
      </div>
    </div>
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">Comprobante</label>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer">
        <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
        <span className="text-sm">Seleccionar archivo o arrastrar aquí</span>
      </div>
    </div>
  </FormularioGenerico>
);

const GestionarSeguros = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-slate-800">Gestión de Seguros</h2>
      <select className="border border-slate-300 rounded-lg p-2 text-sm">
        <option>Colegio San Agustín - 4° Medio A</option>
      </select>
    </div>

    <Card>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Alumno</th>
              <th className="px-6 py-3">Estado Pago</th>
              <th className="px-6 py-3">Aseguradora</th>
              <th className="px-6 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {mockData.ejecutivo.alumnosSeguros.map((alum) => (
              <tr key={alum.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {alum.alumno} <br/><span className="text-xs text-slate-400 font-normal">{alum.rut}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                    alum.pago === 'Al día' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {alum.pago}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select className="border border-slate-300 rounded p-1 text-sm bg-white" defaultValue={alum.seguro} disabled={alum.estado==='Bloqueado'}>
                    <option>Assist Card</option>
                    <option>Mapfre</option>
                    <option>Sin Asignar</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <Button variant={alum.estado === 'Bloqueado' ? 'outline' : 'primary'} className="text-xs py-1.5 px-3">
                    {alum.estado === 'Bloqueado' ? 'Notificar Deuda' : 'Notificar Asignación'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const DuenoDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800">Reporte Gerencial de Avance</h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <p className="text-sm text-slate-500 font-medium">Recaudación Total</p>
        <p className="text-3xl font-bold text-blue-800">${mockData.dueno.kpis.recaudado.toLocaleString()}</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500 font-medium">Contratos Activos</p>
        <p className="text-3xl font-bold text-slate-800">{mockData.dueno.kpis.contratos}</p>
      </Card>
      <Card>
        <p className="text-sm text-slate-500 font-medium">Metas Globales Cumplidas</p>
        <p className="text-3xl font-bold text-emerald-600">{mockData.dueno.kpis.metaCumplida}%</p>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Avance por Colegio</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3">Colegio y Curso</th>
              <th className="px-4 py-3">Ejecutivo</th>
              <th className="px-4 py-3">Meta Total</th>
              <th className="px-4 py-3 w-1/4">Avance</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockData.dueno.colegios.map((col) => (
              <tr key={col.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-900">{col.nombre}</td>
                <td className="px-4 py-4">{col.ejecutivo}</td>
                <td className="px-4 py-4">${col.meta.toLocaleString()}</td>
                <td className="px-4 py-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${col.avance}%` }}></div>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 inline-block">{col.avance}%</span>
                </td>
                <td className="px-4 py-4">
                   <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    col.estado === 'Completado' ? 'bg-emerald-100 text-emerald-800' : 
                    col.estado === 'En Alerta' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {col.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const AdminPanel = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-slate-800">Panel de Administración Global</h2>
    
    <div className="flex space-x-2 border-b border-slate-200 pb-px">
      {['Usuarios', 'Clientes', 'Destinos', 'Actividades', 'Aseguradoras'].map((tab, idx) => (
        <button key={idx} className={`px-4 py-2 text-sm font-medium border-b-2 ${idx === 2 ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
          {tab}
        </button>
      ))}
    </div>

    <Card>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Mantenedor: Destinos</h3>
        <Button variant="primary" icon={PlusCircle}>Agregar Destino</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">País</th>
              <th className="px-6 py-3">Temporada</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockData.destinos.map((dest) => (
              <tr key={dest.id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{dest.nombre}</td>
                <td className="px-6 py-4">{dest.pais}</td>
                <td className="px-6 py-4">{dest.temporada}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${dest.estado === 'Activo' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                    {dest.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const App = () => {
  const [role, setRole] = useState(null); // 'apoderado', 'ejecutivo', 'dueno', 'admin'
  const [currentRoute, setCurrentRoute] = useState('');

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    // Rutas iniciales por defecto según el rol
    const initialRoutes = {
      apoderado: 'dashboard-apo',
      ejecutivo: 'dashboard-eje',
      dueno: 'dashboard-due',
      admin: 'admin-panel'
    };
    setCurrentRoute(initialRoutes[selectedRole]);
  };

  const logout = () => {
    setRole(null);
    setCurrentRoute('');
  };

  if (!role) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Definición de menú dinámico según rol
  const menus = {
    apoderado: [
      { id: 'dashboard-apo', label: 'Inicio', icon: Home },
      { id: 'estado-cuenta', label: 'Estado Cuenta', icon: DollarSign },
      { id: 'contrato', label: 'Contrato', icon: FileText },
      { id: 'seguros-apo', label: 'Seguros', icon: ShieldCheck },
    ],
    ejecutivo: [
      { id: 'dashboard-eje', label: 'Inicio', icon: Home },
      { id: 'reg-contrato', label: 'Registrar Contrato', icon: FileText },
      { id: 'reg-deposito', label: 'Registrar Depósito', icon: DollarSign },
      { id: 'ges-seguros', label: 'Gestionar Seguros', icon: ShieldCheck },
    ],
    dueno: [
      { id: 'dashboard-due', label: 'Reporte Avance', icon: TrendingUp },
    ],
    admin: [
      { id: 'admin-panel', label: 'Panel Global', icon: Settings },
    ]
  };

  const navItems = menus[role] || [];

  // Renderizado dinámico de la vista central
  const renderView = () => {
    switch (currentRoute) {
      case 'dashboard-apo': return <ApoderadoDashboard />;
      case 'estado-cuenta': return <EstadoCuenta />;
      case 'contrato': return <ContratoServicios />;
      case 'seguros-apo': return <SegurosPoliza />;
      
      case 'dashboard-eje': return <EjecutivoDashboard />;
      case 'reg-contrato': return <RegistrarContrato />;
      case 'reg-deposito': return <RegistrarDeposito />;
      case 'ges-seguros': return <GestionarSeguros />;
      
      case 'dashboard-due': return <DuenoDashboard />;
      
      case 'admin-panel': return <AdminPanel />;
      
      default: return <div>Vista en construcción</div>;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar - Menú de Navegación Lateral */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-xl z-10 flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 border-b border-blue-800">
          <div className="p-2 bg-blue-800 rounded-lg"><Map className="w-6 h-6 text-emerald-400" /></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">On Tour</h1>
            <p className="text-xs text-blue-300 capitalize">{role}</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-800/50 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-400' : 'text-blue-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button onClick={logout} className="w-full flex items-center px-3 py-2 text-sm font-medium text-blue-200 rounded-lg hover:bg-blue-800 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header superior simple */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center flex-shrink-0">
          <div className="flex items-center text-slate-500 text-sm">
            Portal Sistema / <span className="text-slate-800 font-medium ml-1 capitalize">{currentRoute.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
               {role.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        {/* Área de la vista actual con scroll */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto pb-12">
            {renderView()}
          </div>
        </div>
      </main>

    </div>
  );
};

export default App;