import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Clock,
  X,
  Shield,
  Calendar,
  MapPin,
  Home,
  Activity,
  Building2,
  Info,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Status = 'COMPLETADO' | 'EN RANGO - PENDIENTE' | 'VENCIDO - PENDIENTE' | 'PRÓXIMAMENTE';

interface FSAHistory {
  fecha: string;
  observacion: string;
}

interface ChildRecord {
  id: string;
  nombre: string;
  servicio: 'SAF' | 'SCD';
  localizacion: string;
  usuario: string; // DNI
  estado: Status;
  edad: string;
  fechaIngreso: string;
  utOct: string;
  ciai: string;
  seguroSalud: string;
  establecimiento: string;
  historial: {
    [key: string]: FSAHistory;
  };
}

// --- Mock Data ---

const MONTHS = [2, 4, 6, 9, 12, 18, 24, 36];

const MOCK_DATA: ChildRecord[] = [
  {
    id: '1',
    nombre: 'BRAYAN ALEXIS ARENAS ANTICONA',
    servicio: 'SAF',
    localizacion: 'SANAGORAN',
    usuario: '94069838',
    estado: 'EN RANGO - PENDIENTE',
    edad: '16 Meses',
    fechaIngreso: '03/03/2025',
    utOct: 'LA LIBERTAD',
    ciai: '-',
    seguroSalud: 'SUBSIDIADO (SIS GRATUITO)',
    establecimiento: 'SANAGORAN',
    historial: {
      '2': { fecha: '15/11/2023', observacion: 'Ok' },
      '4': { fecha: '06/02/2024', observacion: 'Ok' },
      '6': { fecha: '10/04/2024', observacion: 'Ok' },
      '9': { fecha: '10/07/2024', observacion: 'Ok' },
      '12': { fecha: '12/09/2024', observacion: 'Ok' },
      '18': { fecha: '', observacion: 'Pendiente' },
      '24': { fecha: '', observacion: 'Próximamente' },
      '36': { fecha: '', observacion: 'Próximamente' },
    }
  },
  {
    id: '2',
    nombre: 'MARIA FERNANDA LOPEZ RUIZ',
    servicio: 'SCD',
    localizacion: 'TAMBO',
    usuario: '94084613',
    estado: 'VENCIDO - PENDIENTE',
    edad: '12 Meses',
    fechaIngreso: '15/01/2025',
    utOct: 'PUNO',
    ciai: 'CIAI TAMBO',
    seguroSalud: 'ESSALUD',
    establecimiento: 'TAMBO I-1',
    historial: {
      '2': { fecha: '15/03/2024', observacion: 'Sin Aplicacion' },
      '4': { fecha: '06/05/2024', observacion: 'Ok' },
      '6': { fecha: '10/07/2024', observacion: 'Ok' },
      '9': { fecha: '12/10/2024', observacion: 'Aplicado fuera de plazo' },
      '12': { fecha: '', observacion: 'Vencido' },
      '18': { fecha: '', observacion: '' },
      '24': { fecha: '', observacion: '' },
      '36': { fecha: '', observacion: '' },
    }
  },
  {
    id: '3',
    nombre: 'JUAN PABLO CASTILLO DIAZ',
    servicio: 'SAF',
    localizacion: 'HUANOQUITE',
    usuario: '94298646',
    estado: 'PRÓXIMAMENTE',
    edad: '24 Meses',
    fechaIngreso: '10/05/2024',
    utOct: 'CUSCO',
    ciai: '-',
    seguroSalud: 'SUBSIDIADO (SIS GRATUITO)',
    establecimiento: 'HUANOQUITE',
    historial: {
      '2': { fecha: '15/11/2023', observacion: 'Ok' },
      '4': { fecha: '11/01/2024', observacion: 'Ok' },
      '6': { fecha: '12/03/2024', observacion: 'Ok' },
      '9': { fecha: '15/06/2024', observacion: 'Ok' },
      '12': { fecha: '15/09/2024', observacion: 'Sin Aplicacion' },
      '18': { fecha: '15/03/2025', observacion: 'Sin Aplicacion' },
      '24': { fecha: '18/08/2025', observacion: 'Ok' },
      '36': { fecha: '', observacion: 'Próximamente' },
    }
  },
  {
    id: '4',
    nombre: 'ANA SOFIA MENDOZA TORRES',
    servicio: 'SCD',
    localizacion: 'PUQUIO',
    usuario: '93886477',
    estado: 'COMPLETADO',
    edad: '36 Meses',
    fechaIngreso: '01/01/2023',
    utOct: 'AYACUCHO',
    ciai: 'CIAI PUQUIO',
    seguroSalud: 'SIS',
    establecimiento: 'PUQUIO',
    historial: {
      '2': { fecha: '01/03/2023', observacion: 'Ok' },
      '4': { fecha: '01/05/2023', observacion: 'Ok' },
      '6': { fecha: '01/07/2023', observacion: 'Ok' },
      '9': { fecha: '01/10/2023', observacion: 'Ok' },
      '12': { fecha: '01/01/2024', observacion: 'Ok' },
      '18': { fecha: '01/07/2024', observacion: 'Ok' },
      '24': { fecha: '01/01/2025', observacion: 'Ok' },
      '36': { fecha: '01/01/2026', observacion: 'Ok' },
    }
  },
  {
    id: '5',
    nombre: 'CARLOS ANDRES RIVAS LUNA',
    servicio: 'SAF',
    localizacion: 'SINGA',
    usuario: '94286104',
    estado: 'EN RANGO - PENDIENTE',
    edad: '8 Meses',
    fechaIngreso: '10/08/2025',
    utOct: 'HUANUCO',
    ciai: '-',
    seguroSalud: 'SIS',
    establecimiento: 'SINGA',
    historial: {
      '2': { fecha: '10/10/2025', observacion: 'Ok' },
      '4': { fecha: '10/12/2025', observacion: 'Ok' },
      '6': { fecha: '10/02/2026', observacion: 'Ok' },
      '9': { fecha: '', observacion: 'Pendiente' },
      '12': { fecha: '', observacion: '' },
      '18': { fecha: '', observacion: '' },
      '24': { fecha: '', observacion: '' },
      '36': { fecha: '', observacion: '' },
    }
  },
  {
    id: '6',
    nombre: 'VALENTINA PAZ SOSA MORALES',
    servicio: 'SCD',
    localizacion: 'CHALLHUAHUACHO',
    usuario: '94112233',
    estado: 'COMPLETADO',
    edad: '36 Meses',
    fechaIngreso: '12/02/2023',
    utOct: 'APURIMAC',
    ciai: 'CIAI CHALLHUA',
    seguroSalud: 'SIS',
    establecimiento: 'CHALLHUAHUACHO',
    historial: {
      '2': { fecha: '12/04/2023', observacion: 'Ok' },
      '4': { fecha: '12/06/2023', observacion: 'Ok' },
      '6': { fecha: '12/08/2023', observacion: 'Ok' },
      '9': { fecha: '12/11/2023', observacion: 'Ok' },
      '12': { fecha: '12/02/2024', observacion: 'Ok' },
      '18': { fecha: '12/08/2024', observacion: 'Ok' },
      '24': { fecha: '12/02/2025', observacion: 'Ok' },
      '36': { fecha: '12/02/2026', observacion: 'Ok' },
    }
  },
  {
    id: '7',
    nombre: 'MATEO SEBASTIAN ORTIZ VELA',
    servicio: 'SAF',
    localizacion: 'NAUTA',
    usuario: '94334455',
    estado: 'VENCIDO - PENDIENTE',
    edad: '18 Meses',
    fechaIngreso: '20/06/2024',
    utOct: 'LORETO',
    ciai: '-',
    seguroSalud: 'SIS',
    establecimiento: 'NAUTA',
    historial: {
      '2': { fecha: '20/08/2024', observacion: 'Ok' },
      '4': { fecha: '20/10/2024', observacion: 'Ok' },
      '6': { fecha: '20/12/2024', observacion: 'Ok' },
      '9': { fecha: '20/03/2025', observacion: 'Ok' },
      '12': { fecha: '20/06/2025', observacion: 'Ok' },
      '18': { fecha: '', observacion: 'Vencido' },
      '24': { fecha: '', observacion: '' },
      '36': { fecha: '', observacion: '' },
    }
  },
  {
    id: '8',
    nombre: 'LUCIA BELEN FLORES RAMOS',
    servicio: 'SCD',
    localizacion: 'JULIACA',
    usuario: '94556677',
    estado: 'EN RANGO - PENDIENTE',
    edad: '4 Meses',
    fechaIngreso: '05/11/2025',
    utOct: 'PUNO',
    ciai: 'CIAI JULIACA',
    seguroSalud: 'ESSALUD',
    establecimiento: 'JULIACA',
    historial: {
      '2': { fecha: '05/01/2026', observacion: 'Ok' },
      '4': { fecha: '', observacion: 'Pendiente' },
      '6': { fecha: '', observacion: '' },
      '9': { fecha: '', observacion: '' },
      '12': { fecha: '', observacion: '' },
      '18': { fecha: '', observacion: '' },
      '24': { fecha: '', observacion: '' },
      '36': { fecha: '', observacion: '' },
    }
  },
];

// --- Components ---

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    'COMPLETADO': 'bg-white text-[#28a745] border-[#28a745]',
    'EN RANGO - PENDIENTE': 'bg-white text-[#fd7e14] border-[#fd7e14]',
    'VENCIDO - PENDIENTE': 'bg-white text-[#dc3545] border-[#dc3545]',
    'PRÓXIMAMENTE': 'bg-white text-[#007bff] border-[#007bff]',
  };

  const icons = {
    'COMPLETADO': <CheckCircle2 size={12} />,
    'EN RANGO - PENDIENTE': <AlertTriangle size={12} />,
    'VENCIDO - PENDIENTE': <XCircle size={12} />,
    'PRÓXIMAMENTE': <Clock size={12} />,
  };

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold border shadow-sm ${styles[status]}`}>
      <span>{icons[status]}</span>
      <span className="uppercase whitespace-nowrap">{status}</span>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <Icon size={14} className={color} />
      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
    <span className="text-[13px] font-bold text-gray-700">{value}</span>
  </div>
);

interface MilestoneNodeProps {
  key?: React.Key;
  month: number;
  data?: FSAHistory;
  isLast: boolean;
}

const MilestoneNode = ({ month, data, isLast }: MilestoneNodeProps) => {
  const safeData = data || { fecha: '', observacion: '' };
  const isCompleted = safeData.observacion === 'Ok' || safeData.observacion === 'Aplicado fuera de plazo';
  const isPending = safeData.observacion === 'Pendiente' || safeData.observacion === 'Vencido';
  const isSkipped = safeData.observacion === 'Sin Aplicacion';

  const getColors = () => {
    if (isCompleted) return { bg: 'bg-green-500', text: 'text-green-700', icon: <CheckCircle2 size={16} className="text-white" /> };
    if (isPending) return { bg: 'bg-orange-500', text: 'text-orange-700', icon: <AlertTriangle size={16} className="text-white" /> };
    if (isSkipped) return { bg: 'bg-gray-400', text: 'text-gray-500', icon: <X size={16} className="text-white" /> };
    return { bg: 'bg-blue-400', text: 'text-blue-600', icon: <Clock size={16} className="text-white" /> };
  };

  const colors = getColors();

  return (
    <div className="relative flex flex-col items-center group px-4">
      {!isLast && (
        <div className="absolute left-1/2 top-5 w-full h-0.5 bg-gray-100 -z-0" />
      )}
      
      <div className={`z-10 w-10 h-10 flex items-center justify-center ${colors.bg} shrink-0 cursor-help transition-all hover:scale-110 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]`}>
        {colors.icon}
        
        {/* Tooltip */}
        <div className="absolute bottom-full mb-3 hidden group-hover:block z-50 animate-in fade-in zoom-in duration-200">
          <div className="bg-gray-900 text-white p-3 rounded-xl shadow-xl min-w-[150px] border border-white/10">
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">FSA {month} Meses</div>
            {safeData.fecha && (
              <div className="flex items-center gap-1.5 text-[10px] font-bold mb-1">
                <Calendar size={10} className="text-blue-400" />
                {safeData.fecha}
              </div>
            )}
            <div className={`text-[10px] font-black uppercase ${colors.text.replace('text-', 'text-opacity-90 text-')}`}>
              {safeData.observacion || 'No programado'}
            </div>
          </div>
          <div className="w-2.5 h-2.5 bg-gray-900 rotate-45 mx-auto -mt-1.5 border-r border-b border-white/10" />
        </div>
      </div>

      <span className="mt-1.5 text-[9px] font-black text-gray-400 uppercase tracking-tighter">{month}m</span>
    </div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChild, setSelectedChild] = useState<ChildRecord | null>(null);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof ChildRecord | null, direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof ChildRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...MOCK_DATA].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  }).filter(item => 
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.usuario.includes(searchTerm)
  );

  const clearFilters = () => {
    setSearchTerm('');
    setSortConfig({ key: null, direction: 'asc' });
  };

  const renderFSACell = (hist: FSAHistory | undefined) => {
    if (!hist || (!hist.fecha && !hist.observacion)) return <span className="text-gray-300">-</span>;

    const obs = hist.observacion;
    if (obs === 'Ok' || obs === 'Aplicado fuera de plazo') {
      return (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <div className={`flex items-center gap-1 text-[10px] font-bold ${obs === 'Ok' ? 'text-green-600' : 'text-orange-500'}`}>
            <CheckCircle2 size={12} />
            {obs === 'Ok' ? 'Aplicado' : 'Fuera plazo'}
          </div>
          <span className="text-[10px] text-gray-500 font-medium">{hist.fecha}</span>
        </div>
      );
    }
    if (obs === 'Pendiente' || obs === 'Vencido') {
      return (
        <div className={`flex items-center justify-center gap-1 text-[10px] font-bold ${obs === 'Vencido' ? 'text-red-500' : 'text-orange-500'}`}>
          {obs === 'Vencido' ? <XCircle size={12} /> : <AlertTriangle size={12} />}
          {obs}
        </div>
      );
    }
    if (obs === 'Sin Aplicacion') {
       return (
        <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-gray-400">
          <X size={12} />
          Sin Aplicar
        </div>
      );
    }
    if (obs === 'Próximamente') {
       return (
        <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-blue-400">
          <Clock size={12} />
          Próximo
        </div>
      );
    }
    return <span className="text-[10px] text-gray-500">{obs}</span>;
  };

  const renderRoadmapGroup = (title: string, months: number[], child: ChildRecord) => (
    <div className="flex flex-col items-center">
      <div className="mb-6 px-4 py-1 bg-gray-50 rounded-full border border-gray-100">
        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{title}</span>
      </div>
      <div className="flex items-center">
        {months.map((m) => (
          <MilestoneNode 
            key={m}
            month={m}
            data={child.historial[m]}
            isLast={m === 36}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-[#0095FF] h-14 flex items-center justify-between px-6 text-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="text-xl font-black tracking-tighter">Cuidador360</div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span>Bienvenido, Usuario</span>
            <div className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center font-bold border-2 border-white/30">
              U
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 max-w-[1600px] mx-auto space-y-4">
        {/* Main Module Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Title & Download */}
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold flex items-center gap-2">
                <span className="text-[#0095FF]">Modulo:</span>
                <span className="text-yellow-500">FSA - Ficha de Señales de Alerta</span>
              </h1>
              <button className="bg-[#A3C644] hover:bg-[#92b33d] text-white px-4 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold transition-colors shadow-sm">
                <Download size={16} />
                Descargar
              </button>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { label: 'SERVICIO', value: 'Todos' },
                { label: 'DEPARTAMENTO', value: 'Seleccione Departame' },
                { label: 'UT/OCT', value: 'Seleccione UT' },
                { label: 'PROVINCIA', value: 'Seleccione Provincia' },
                { label: 'DISTRITO', value: 'Seleccione Distrito' },
                { label: 'C DE GESTIÓN', value: 'Seleccione Comité' },
                { label: 'C DE POBLADO', value: 'Seleccione Centro' },
                { label: 'CIAI', value: 'Seleccione CIAI' },
              ].map((filter, i) => (
                <div key={i} className="space-y-1">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{filter.label}</label>
                  <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-2 py-1.5 text-[11px] text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all cursor-pointer pr-6">
                      <option>{filter.value}</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Search & Advanced Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button className="bg-[#0095FF] hover:bg-[#0084e6] text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm">
                Filtros avanzados
              </button>

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Buscar DNI..." 
                    className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="bg-[#0095FF] hover:bg-[#0084e6] text-white px-5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                  <Search size={16} />
                  Buscar
                </button>
                <button 
                  className="text-gray-500 hover:text-gray-700 px-3 py-1.5 text-xs font-bold transition-all"
                  onClick={clearFilters}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-600">
                <div className="w-3.5 h-3.5 rounded bg-[#28a745]" /> Completados (02)
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-600">
                <div className="w-3.5 h-3.5 rounded bg-gray-200" /> Pendientes (06)
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-600">
                <div className="w-3.5 h-3.5 rounded bg-[#dc3545]" /> Vencidos (02)
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className={`w-full border-collapse table-fixed ${isHistoryExpanded ? 'min-w-[1600px]' : 'min-w-[1000px]'}`}>
              <thead>
                <tr className="bg-[#0095FF] text-white text-[11px] font-bold uppercase tracking-wider">
                  <th 
                    rowSpan={isHistoryExpanded ? 2 : 1} 
                    className="px-4 py-3 text-left border-r border-white/20 w-[80px] cursor-pointer hover:bg-[#0084e6] transition-colors"
                    onClick={() => handleSort('servicio')}
                  >
                    <div className="flex items-center gap-1">
                      Servicio {sortConfig.key === 'servicio' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </div>
                  </th>
                  <th 
                    rowSpan={isHistoryExpanded ? 2 : 1} 
                    className="px-4 py-3 text-left border-r border-white/20 w-[220px] cursor-pointer hover:bg-[#0084e6] transition-colors"
                    onClick={() => handleSort('localizacion')}
                  >
                    <div className="flex items-center justify-between">
                      Localización {sortConfig.key === 'localizacion' && (sortConfig.direction === 'asc' ? '↑' : '↓')} <ChevronRight size={12} className="text-white/70" />
                    </div>
                  </th>
                  <th 
                    rowSpan={isHistoryExpanded ? 2 : 1} 
                    className="px-4 py-3 text-left border-r border-white/20 w-[140px] cursor-pointer hover:bg-[#0084e6] transition-colors"
                    onClick={() => handleSort('usuario')}
                  >
                    <div className="flex items-center justify-between">
                      Usuario {sortConfig.key === 'usuario' && (sortConfig.direction === 'asc' ? '↑' : '↓')} <ChevronRight size={12} className="text-white/70" />
                    </div>
                  </th>
                  <th 
                    rowSpan={isHistoryExpanded ? 2 : 1} 
                    className="px-4 py-3 text-left border-r border-white/20 w-[200px] cursor-pointer hover:bg-[#0084e6] transition-colors"
                    onClick={() => handleSort('estado')}
                  >
                    <div className="flex items-center gap-1">
                      Estado FSA {sortConfig.key === 'estado' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                    </div>
                  </th>
                  <th 
                    colSpan={isHistoryExpanded ? 8 : 1} 
                    className="px-4 py-2 text-center bg-[#802080] border-b border-white/20 cursor-pointer transition-colors hover:bg-[#903090]"
                    onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Activity size={14} />
                      HISTORIAL FSA
                      {isHistoryExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </div>
                  </th>
                </tr>
                {isHistoryExpanded && (
                  <tr className="bg-[#E6B8E6] text-[#802080] text-[9px] font-bold uppercase tracking-wider">
                    {MONTHS.map(m => (
                      <th key={m} className="px-2 py-2.5 border-r border-white/40 w-[130px] text-center">
                        FSA {m} Meses
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {sortedData.length > 0 ? (
                  sortedData.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-b border-gray-200 transition-colors hover:brightness-95 cursor-pointer
                        ${row.estado === 'VENCIDO - PENDIENTE' ? 'bg-[#FFEEEE]' : 
                          row.estado === 'EN RANGO - PENDIENTE' ? 'bg-[#FFF4E5]' : 
                          row.estado === 'COMPLETADO' ? 'bg-[#E6FFEA]' : 'bg-[#EBF5FF]'}`}
                    >
                      <td className="px-4 py-3 text-[13px] font-medium border-r border-gray-100">{row.servicio}</td>
                      <td className="px-4 py-3 text-[13px] font-medium border-r border-gray-100 truncate">{row.localizacion}</td>
                      <td 
                        className="px-4 py-3 text-[13px] font-bold text-blue-600 underline border-r border-gray-100 cursor-pointer"
                        onClick={() => setSelectedChild(row)}
                      >
                        {row.usuario}
                      </td>
                      <td className="px-4 py-3 border-r border-gray-100">
                        <div className="flex justify-center">
                          <StatusBadge status={row.estado} />
                        </div>
                      </td>
                      {isHistoryExpanded ? (
                        MONTHS.map(m => (
                          <td key={m} className="px-2 py-2 border-r border-gray-100 align-middle h-full">
                            {renderFSACell(row.historial[m])}
                          </td>
                        ))
                      ) : (
                        <td 
                          className="px-4 py-3 text-center border-r border-gray-100"
                          onClick={() => setIsHistoryExpanded(true)}
                        >
                          <button className="text-[10px] font-black text-[#802080] uppercase bg-[#E6B8E6]/30 px-3 py-1 rounded-full hover:bg-[#E6B8E6]/50 transition-colors flex items-center gap-1 mx-auto">
                            <Activity size={10} />
                            Ver {MONTHS.length} hitos
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isHistoryExpanded ? 20 : 5} className="px-4 py-10 text-center text-gray-400 italic">
                      No se encontraron resultados para "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>


      {/* Modal */}
      <AnimatePresence>
        {selectedChild && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChild(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#F8FAFC] w-full lg:max-w-6xl h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex"
            >
              {/* Left Sidebar Panel */}
              <div className="w-[300px] bg-[#F8FAFC] border-r border-gray-200 p-5 overflow-y-auto space-y-4">
                {/* User Header Card */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-blue-50 rounded-bl-full -mr-3 -mt-3" />
                  <div className="space-y-3 relative z-10">
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Usuario Seleccionado</div>
                    <h2 className="text-lg font-black text-gray-800 leading-tight uppercase">
                      {selectedChild.nombre}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-[#0095FF] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">{selectedChild.servicio}</span>
                      <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase">{selectedChild.localizacion}</span>
                    </div>
                  </div>
                </div>

                {/* General Info Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Info size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Información General</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <InfoCard icon={Shield} label="DNI" value={selectedChild.usuario} color="text-blue-400" />
                    <InfoCard icon={Clock} label="Edad" value={selectedChild.edad} color="text-green-400" />
                    <InfoCard icon={Calendar} label="Fecha Ingreso" value={selectedChild.fechaIngreso} color="text-purple-400" />
                    <InfoCard icon={MapPin} label="UT / OCT" value={selectedChild.utOct} color="text-red-400" />
                    <InfoCard icon={Home} label="CIAI" value={selectedChild.ciai} color="text-blue-500" />
                    <InfoCard icon={Activity} label="Seguro Salud" value={selectedChild.seguroSalud} color="text-green-500" />
                    <InfoCard icon={Building2} label="Establecimiento" value={selectedChild.establecimiento} color="text-pink-400" />
                  </div>
                </div>
              </div>

              {/* Right Content Area - FSA Roadmap */}
              <div className="flex-1 bg-white p-6 relative flex flex-col overflow-hidden">
                <button 
                  onClick={() => setSelectedChild(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 z-20"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                    <div>
                      <h3 className="text-base font-black text-gray-800 uppercase tracking-tight">Historial de Aplicación FSA</h3>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Hitos de desarrollo infantil</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-green-500" /> Aplicado
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-orange-500" /> Pendiente
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-blue-400" /> Próximo
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center overflow-hidden">
                    <div className="space-y-4 max-w-4xl mx-auto w-full">
                      {/* Level 1: Ingreso */}
                      <div className="flex flex-col items-center">
                        <div className="z-10 w-10 h-10 flex items-center justify-center bg-[#0095FF] mb-1 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                          <Home size={18} className="text-white" />
                        </div>
                        <h4 className="text-[10px] font-black text-[#0095FF] uppercase tracking-tight">ESDI Ingreso</h4>
                        <div className="w-0.5 h-4 bg-gray-100 mt-1" />
                      </div>

                      {/* Level 2: 1 - 11 meses */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <div className="bg-gray-50 px-4 py-1 rounded-full border border-gray-100">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">1 - 11 meses</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2">
                          {[2, 4, 6, 9].map((m) => (
                            <MilestoneNode 
                              key={m}
                              month={m}
                              data={selectedChild.historial[m]}
                              isLast={true} 
                            />
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-gray-100" />
                        </div>
                      </div>

                      {/* Level 3: Un año */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <div className="bg-gray-50 px-4 py-1 rounded-full border border-gray-100">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Un año</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2">
                          {[12, 18].map((m) => (
                            <MilestoneNode 
                              key={m}
                              month={m}
                              data={selectedChild.historial[m]}
                              isLast={true}
                            />
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-gray-100" />
                        </div>
                      </div>

                      {/* Level 4: Dos y tres años */}
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <div className="bg-gray-50 px-4 py-1 rounded-full border border-gray-100">
                            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Dos y tres años</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-2">
                          {[24, 36].map((m) => (
                            <MilestoneNode 
                              key={m}
                              month={m}
                              data={selectedChild.historial[m]}
                              isLast={true}
                            />
                          ))}
                        </div>
                        <div className="flex justify-center">
                          <div className="w-0.5 h-4 bg-gray-100" />
                        </div>
                      </div>

                      {/* Level 5: Salida */}
                      <div className="flex flex-col items-center">
                        <div className="z-10 w-10 h-10 flex items-center justify-center bg-purple-600 mb-1 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]">
                          <LogOut size={18} className="text-white" />
                        </div>
                        <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-tight">ESDI Salida</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Footer / Copyright */}
      <footer className="p-6 text-center text-gray-400 text-[10px]">
        © 2026 Programa Nacional Cuna Más - Cuidador 360
      </footer>
    </div>
  );
}
