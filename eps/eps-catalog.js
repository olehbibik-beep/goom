// Original GooM EPS schematic symbols; no automatic fire coverage assumptions.
const EPS_CATALOG=[
  {
    "type": "panel",
    "code": "EPS",
    "kind": "control",
    "labels": [
      "Ústředna EPS",
      "Fire alarm control panel",
      "Brandmelderzentrale",
      "Пожарная централь"
    ],
    "color": "#dc2626"
  },
  {
    "type": "eps_smoke",
    "code": "S",
    "kind": "detector",
    "labels": [
      "Optický kouřový hlásič",
      "Optical smoke detector",
      "Optischer Rauchmelder",
      "Оптический дымовой извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_heat",
    "code": "T",
    "kind": "detector",
    "labels": [
      "Teplotní hlásič",
      "Fixed-temperature heat detector",
      "Wärmemelder",
      "Тепловой максимальный извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_heat_rise",
    "code": "ΔT",
    "kind": "detector",
    "labels": [
      "Diferenciální teplotní hlásič",
      "Rate-of-rise heat detector",
      "Differential-Wärmemelder",
      "Тепловой дифференциальный извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_multi",
    "code": "ST",
    "kind": "detector",
    "labels": [
      "Multisenzorový hlásič kouř / teplo",
      "Smoke / heat multisensor detector",
      "Rauch-/Wärme-Mehrfachsensor",
      "Комбинированный дымовой / тепловой"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_co",
    "code": "CO",
    "kind": "detector",
    "labels": [
      "Multisenzorový hlásič s CO",
      "CO multisensor fire detector",
      "CO-Mehrfachsensormelder",
      "Мультисенсорный пожарный с CO"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_flame_ir",
    "code": "IR",
    "kind": "flame",
    "labels": [
      "Infračervený hlásič plamene",
      "Infrared flame detector",
      "Infrarot-Flammenmelder",
      "Инфракрасный извещатель пламени"
    ],
    "color": "#ea580c"
  },
  {
    "type": "eps_flame_uv",
    "code": "UV",
    "kind": "flame",
    "labels": [
      "Ultrafialový hlásič plamene",
      "Ultraviolet flame detector",
      "UV-Flammenmelder",
      "Ультрафиолетовый извещатель пламени"
    ],
    "color": "#ea580c"
  },
  {
    "type": "eps_flame_dual",
    "code": "IU",
    "kind": "flame",
    "labels": [
      "Kombinovaný hlásič plamene IR / UV",
      "IR / UV flame detector",
      "IR-/UV-Flammenmelder",
      "Комбинированный извещатель пламени IR / UV"
    ],
    "color": "#ea580c"
  },
  {
    "type": "eps_beam_tx",
    "code": "TX",
    "kind": "beam",
    "labels": [
      "Lineární kouřový hlásič — vysílač",
      "Beam smoke detector — transmitter",
      "Linearer Rauchmelder — Sender",
      "Линейный дымовой — передатчик"
    ],
    "color": "#e11d48"
  },
  {
    "type": "eps_beam_rx",
    "code": "RX",
    "kind": "beam",
    "labels": [
      "Lineární kouřový hlásič — přijímač",
      "Beam smoke detector — receiver",
      "Linearer Rauchmelder — Empfänger",
      "Линейный дымовой — приёмник"
    ],
    "color": "#e11d48"
  },
  {
    "type": "eps_beam_reflector",
    "code": "R",
    "kind": "beam",
    "labels": [
      "Odrazka lineárního hlásiče",
      "Beam detector reflector",
      "Reflektor für linearen Rauchmelder",
      "Отражатель линейного извещателя"
    ],
    "color": "#e11d48"
  },
  {
    "type": "eps_aspirating",
    "code": "ASD",
    "kind": "detector",
    "labels": [
      "Nasávací kouřový hlásič",
      "Aspirating smoke detector",
      "Ansaugrauchmelder",
      "Аспирационный дымовой извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_duct",
    "code": "DUCT",
    "kind": "detector",
    "labels": [
      "Potrubní kouřový hlásič",
      "Duct smoke detector",
      "Lüftungskanal-Rauchmelder",
      "Канальный дымовой извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_linear_heat",
    "code": "LHD",
    "kind": "detector",
    "labels": [
      "Lineární teplotní hlásič",
      "Linear heat detector",
      "Linearer Wärmemelder",
      "Линейный тепловой извещатель"
    ],
    "color": "#ef4444"
  },
  {
    "type": "eps_manual",
    "code": "M",
    "kind": "manual",
    "labels": [
      "Tlačítkový požární hlásič",
      "Manual call point",
      "Handfeuermelder",
      "Ручной пожарный извещатель"
    ],
    "color": "#dc2626"
  },
  {
    "type": "eps_sounder",
    "code": "SIR",
    "kind": "signal",
    "labels": [
      "Akustický požární signalizátor",
      "Fire alarm sounder",
      "Akustischer Signalgeber",
      "Пожарный звуковой оповещатель"
    ],
    "color": "#d97706"
  },
  {
    "type": "eps_beacon",
    "code": "VAD",
    "kind": "signal",
    "labels": [
      "Optický požární signalizátor",
      "Visual alarm device",
      "Optischer Signalgeber",
      "Световой пожарный оповещатель"
    ],
    "color": "#d97706"
  },
  {
    "type": "eps_sounder_beacon",
    "code": "AV",
    "kind": "signal",
    "labels": [
      "Akusticko-optický signalizátor",
      "Sounder / beacon",
      "Akustisch-optischer Signalgeber",
      "Светозвуковой оповещатель"
    ],
    "color": "#d97706"
  },
  {
    "type": "eps_voice",
    "code": "VA",
    "kind": "signal",
    "labels": [
      "Reproduktor hlasového poplachu",
      "Voice alarm loudspeaker",
      "Sprachalarm-Lautsprecher",
      "Речевой пожарный оповещатель"
    ],
    "color": "#d97706"
  },
  {
    "type": "eps_remote_indicator",
    "code": "LED",
    "kind": "signal",
    "labels": [
      "Paralelní indikátor hlásiče",
      "Remote alarm indicator",
      "Parallelanzeige",
      "Выносной индикатор"
    ],
    "color": "#d97706"
  },
  {
    "type": "eps_input",
    "code": "IN",
    "kind": "module",
    "labels": [
      "Vstupní monitorovací modul",
      "Input monitoring module",
      "Eingangsmodul",
      "Модуль контроля входов"
    ],
    "color": "#0284c7"
  },
  {
    "type": "eps_output",
    "code": "OUT",
    "kind": "module",
    "labels": [
      "Výstupní řídicí modul",
      "Output control module",
      "Ausgangsmodul",
      "Модуль управления выходами"
    ],
    "color": "#0284c7"
  },
  {
    "type": "eps_io",
    "code": "I/O",
    "kind": "module",
    "labels": [
      "Vstupně-výstupní modul",
      "Input / output module",
      "Ein-/Ausgangsmodul",
      "Входной / выходной модуль"
    ],
    "color": "#0284c7"
  },
  {
    "type": "eps_relay",
    "code": "REL",
    "kind": "module",
    "labels": [
      "Reléový modul",
      "Relay module",
      "Relaismodul",
      "Релейный модуль"
    ],
    "color": "#0284c7"
  },
  {
    "type": "eps_isolator",
    "code": "ISO",
    "kind": "module",
    "labels": [
      "Izolátor zkratu smyčky",
      "Loop short-circuit isolator",
      "Kurzschlussisolator",
      "Изолятор короткого замыкания"
    ],
    "color": "#0284c7"
  },
  {
    "type": "eps_psu",
    "code": "PSU",
    "kind": "control",
    "labels": [
      "Napájecí zdroj se zálohou",
      "Standby power supply",
      "Netzteil mit Notstromversorgung",
      "Источник резервированного питания"
    ],
    "color": "#dc2626"
  },
  {
    "type": "eps_repeater",
    "code": "REP",
    "kind": "control",
    "labels": [
      "Opakovací panel EPS",
      "Fire alarm repeater panel",
      "Brandmelde-Bedienfeld",
      "Выносная панель пожарной сигнализации"
    ],
    "color": "#dc2626"
  },
  {
    "type": "eps_door_holder",
    "code": "DH",
    "kind": "actuator",
    "labels": [
      "Přídržný magnet požárních dveří",
      "Fire door holder",
      "Feststellmagnet",
      "Удерживающий магнит пожарной двери"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "eps_damper",
    "code": "FD",
    "kind": "actuator",
    "labels": [
      "Ovládání požární / kouřové klapky",
      "Fire / smoke damper control",
      "Brand-/Rauchschutzklappen-Steuerung",
      "Управление противопожарным клапаном"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "eps_extinguishing",
    "code": "EXT",
    "kind": "actuator",
    "labels": [
      "Řídicí zařízení hašení",
      "Extinguishing control unit",
      "Löschsteuerzentrale",
      "Прибор управления пожаротушением"
    ],
    "color": "#7c3aed"
  }
];
const EPS_DEVICE_LABELS=Object.fromEntries(EPS_CATALOG.map(d=>[d.type,d.labels[0]]));
const EPS_DETECTOR_TYPES=new Set(EPS_CATALOG.filter(d=>['detector','flame','beam','manual'].includes(d.kind)).map(d=>d.type));
const EPS_SYMBOL_PARTS={"panel":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["rect",{"x":10,"y":11,"width":28,"height":6,"rx":0,"fill":"white"}],["circle",{"cx":12,"cy":35,"r":1.5,"fill":"#dc2626"}],["circle",{"cx":18,"cy":35,"r":1.5,"fill":"#dc2626"}],["text",{"x":24,"y":26,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#dc2626","stroke":"none"},"EPS"]],"eps_smoke":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"S"]],"eps_heat":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"T"]],"eps_heat_rise":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"ΔT"]],"eps_multi":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"ST"]],"eps_co":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"CO"]],"eps_flame_ir":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["polyline",{"points":"10,29 13,20 16,26 19,16","fill":"none"}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ea580c","stroke":"none"},"IR"]],"eps_flame_uv":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["polyline",{"points":"10,29 13,20 16,26 19,16","fill":"none"}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ea580c","stroke":"none"},"UV"]],"eps_flame_dual":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["polyline",{"points":"10,29 13,20 16,26 19,16","fill":"none"}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ea580c","stroke":"none"},"IU"]],"eps_beam_tx":[["rect",{"x":5,"y":9,"width":38,"height":30,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":5,"y2":24}],["line",{"x1":43,"y1":24,"x2":48,"y2":24}],["line",{"x1":8,"y1":5,"x2":40,"y2":5}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#e11d48","stroke":"none"},"TX"]],"eps_beam_rx":[["rect",{"x":5,"y":9,"width":38,"height":30,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":5,"y2":24}],["line",{"x1":43,"y1":24,"x2":48,"y2":24}],["line",{"x1":8,"y1":5,"x2":40,"y2":5}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#e11d48","stroke":"none"},"RX"]],"eps_beam_reflector":[["rect",{"x":5,"y":9,"width":38,"height":30,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":5,"y2":24}],["line",{"x1":43,"y1":24,"x2":48,"y2":24}],["line",{"x1":8,"y1":5,"x2":40,"y2":5}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#e11d48","stroke":"none"},"R"]],"eps_aspirating":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"ASD"]],"eps_duct":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":9,"y1":10,"x2":13,"y2":14}],["line",{"x1":35,"y1":34,"x2":39,"y2":38}],["text",{"x":24,"y":25,"font-size":9,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"DUCT"]],"eps_linear_heat":[["circle",{"cx":24,"cy":24,"r":19,"fill":"white"}],["line",{"x1":7,"y1":24,"x2":41,"y2":24}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#ef4444","stroke":"none"},"LHD"]],"eps_manual":[["rect",{"x":5,"y":5,"width":38,"height":38,"rx":2,"fill":"white"}],["rect",{"x":12,"y":13,"width":24,"height":22,"rx":0,"fill":"white"}],["line",{"x1":11,"y1":35,"x2":20,"y2":26}],["line",{"x1":28,"y1":26,"x2":37,"y2":35}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#dc2626","stroke":"none"},"M"]],"eps_sounder":[["polygon",{"points":"5,13 18,13 31,5 31,43 18,35 5,35","fill":"white"}],["line",{"x1":36,"y1":14,"x2":42,"y2":10}],["line",{"x1":36,"y1":24,"x2":45,"y2":24}],["line",{"x1":36,"y1":34,"x2":42,"y2":38}],["text",{"x":18,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#d97706","stroke":"none"},"SIR"]],"eps_beacon":[["polygon",{"points":"5,13 18,13 31,5 31,43 18,35 5,35","fill":"white"}],["line",{"x1":36,"y1":14,"x2":42,"y2":10}],["line",{"x1":36,"y1":24,"x2":45,"y2":24}],["line",{"x1":36,"y1":34,"x2":42,"y2":38}],["text",{"x":18,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#d97706","stroke":"none"},"VAD"]],"eps_sounder_beacon":[["polygon",{"points":"5,13 18,13 31,5 31,43 18,35 5,35","fill":"white"}],["line",{"x1":36,"y1":14,"x2":42,"y2":10}],["line",{"x1":36,"y1":24,"x2":45,"y2":24}],["line",{"x1":36,"y1":34,"x2":42,"y2":38}],["text",{"x":18,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#d97706","stroke":"none"},"AV"]],"eps_voice":[["polygon",{"points":"5,13 18,13 31,5 31,43 18,35 5,35","fill":"white"}],["line",{"x1":36,"y1":14,"x2":42,"y2":10}],["line",{"x1":36,"y1":24,"x2":45,"y2":24}],["line",{"x1":36,"y1":34,"x2":42,"y2":38}],["text",{"x":18,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#d97706","stroke":"none"},"VA"]],"eps_remote_indicator":[["polygon",{"points":"5,13 18,13 31,5 31,43 18,35 5,35","fill":"white"}],["line",{"x1":36,"y1":14,"x2":42,"y2":10}],["line",{"x1":36,"y1":24,"x2":45,"y2":24}],["line",{"x1":36,"y1":34,"x2":42,"y2":38}],["text",{"x":18,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#d97706","stroke":"none"},"LED"]],"eps_input":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#0284c7","stroke":"none"},"IN"]],"eps_output":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#0284c7","stroke":"none"},"OUT"]],"eps_io":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#0284c7","stroke":"none"},"I/O"]],"eps_relay":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#0284c7","stroke":"none"},"REL"]],"eps_isolator":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#0284c7","stroke":"none"},"ISO"]],"eps_psu":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["rect",{"x":10,"y":11,"width":28,"height":6,"rx":0,"fill":"white"}],["circle",{"cx":12,"cy":35,"r":1.5,"fill":"#dc2626"}],["circle",{"cx":18,"cy":35,"r":1.5,"fill":"#dc2626"}],["text",{"x":24,"y":26,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#dc2626","stroke":"none"},"PSU"]],"eps_repeater":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["rect",{"x":10,"y":11,"width":28,"height":6,"rx":0,"fill":"white"}],["circle",{"cx":12,"cy":35,"r":1.5,"fill":"#dc2626"}],["circle",{"cx":18,"cy":35,"r":1.5,"fill":"#dc2626"}],["text",{"x":24,"y":26,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#dc2626","stroke":"none"},"REP"]],"eps_door_holder":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#7c3aed","stroke":"none"},"DH"]],"eps_damper":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":14,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#7c3aed","stroke":"none"},"FD"]],"eps_extinguishing":[["rect",{"x":4,"y":7,"width":40,"height":34,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":17,"x2":4,"y2":17}],["line",{"x1":0,"y1":31,"x2":4,"y2":31}],["line",{"x1":44,"y1":17,"x2":48,"y2":17}],["line",{"x1":44,"y1":31,"x2":48,"y2":31}],["text",{"x":24,"y":25,"font-size":11,"font-family":"sans-serif","font-weight":700,"text-anchor":"middle","dominant-baseline":"middle","fill":"#7c3aed","stroke":"none"},"EXT"]]};
