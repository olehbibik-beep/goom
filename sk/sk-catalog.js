// GooM original network symbols. Link lines document the plan, not live network state.
const SK_CATALOG=[
  {
    "type": "panel",
    "code": "RACK",
    "kind": "rack",
    "labels": [
      "Datový rozvaděč",
      "Network cabinet",
      "Netzwerkschrank",
      "Сетевой шкаф"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_router",
    "code": "RTR",
    "kind": "active",
    "labels": [
      "Směrovač",
      "Router",
      "Router",
      "Маршрутизатор"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_firewall",
    "code": "FW",
    "kind": "active",
    "labels": [
      "Síťový firewall",
      "Network firewall",
      "Netzwerk-Firewall",
      "Межсетевой экран"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_switch",
    "code": "SW",
    "kind": "active",
    "labels": [
      "Síťový přepínač",
      "Network switch",
      "Netzwerk-Switch",
      "Коммутатор"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_poe_switch",
    "code": "PoE",
    "kind": "active",
    "labels": [
      "PoE přepínač",
      "PoE switch",
      "PoE-Switch",
      "PoE-коммутатор"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_core_switch",
    "code": "CORE",
    "kind": "active",
    "labels": [
      "Páteřní přepínač",
      "Core switch",
      "Core-Switch",
      "Магистральный коммутатор"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_patch_panel",
    "code": "PP",
    "kind": "passive",
    "labels": [
      "Metalický patch panel",
      "Copper patch panel",
      "Kupfer-Patchpanel",
      "Медная патч-панель"
    ],
    "color": "#0d9488"
  },
  {
    "type": "sk_fiber_panel",
    "code": "ODF",
    "kind": "fiber",
    "labels": [
      "Optický rozvaděč / patch panel",
      "Fiber distribution panel",
      "LWL-Verteiler / Patchpanel",
      "Оптический кросс"
    ],
    "color": "#d97706"
  },
  {
    "type": "sk_media_converter",
    "code": "MC",
    "kind": "fiber",
    "labels": [
      "Optický media konvertor",
      "Fiber media converter",
      "LWL-Medienkonverter",
      "Оптический медиаконвертер"
    ],
    "color": "#d97706"
  },
  {
    "type": "sk_ont",
    "code": "ONT",
    "kind": "fiber",
    "labels": [
      "Optický síťový terminál",
      "Optical network terminal",
      "Optisches Netzabschlussgerät",
      "Оптический терминал ONT"
    ],
    "color": "#d97706"
  },
  {
    "type": "sk_modem",
    "code": "MDM",
    "kind": "active",
    "labels": [
      "Internetový modem",
      "Internet modem",
      "Internetmodem",
      "Интернет-модем"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_access_point",
    "code": "AP",
    "kind": "wireless",
    "labels": [
      "Wi-Fi přístupový bod",
      "Wi-Fi access point",
      "WLAN-Access-Point",
      "Точка доступа Wi-Fi"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "sk_mesh",
    "code": "MESH",
    "kind": "wireless",
    "labels": [
      "Mesh Wi-Fi uzel",
      "Mesh Wi-Fi node",
      "WLAN-Mesh-Knoten",
      "Узел Mesh Wi-Fi"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "sk_bridge",
    "code": "PTP",
    "kind": "wireless",
    "labels": [
      "Bezdrátový spoj",
      "Wireless bridge",
      "WLAN-Richtfunkbrücke",
      "Беспроводной мост"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "sk_antenna",
    "code": "ANT",
    "kind": "wireless",
    "labels": [
      "Venkovní síťová anténa",
      "Outdoor network antenna",
      "Außenantenne für Datennetze",
      "Наружная сетевая антенна"
    ],
    "color": "#7c3aed"
  },
  {
    "type": "sk_outlet",
    "code": "RJ45",
    "kind": "endpoint",
    "labels": [
      "Datová zásuvka RJ45",
      "RJ45 data outlet",
      "RJ45-Datendose",
      "Сетевая розетка RJ45"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_outlet_dual",
    "code": "2×RJ",
    "kind": "endpoint",
    "labels": [
      "Dvojitá datová zásuvka",
      "Dual data outlet",
      "Doppelte Datendose",
      "Двойная сетевая розетка"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_fiber_outlet",
    "code": "FO",
    "kind": "fiber",
    "labels": [
      "Optická zásuvka",
      "Fiber outlet",
      "LWL-Anschlussdose",
      "Оптическая розетка"
    ],
    "color": "#d97706"
  },
  {
    "type": "sk_floor_box",
    "code": "FB",
    "kind": "endpoint",
    "labels": [
      "Podlahová datová krabice",
      "Floor data box",
      "Bodendose für Datennetze",
      "Напольный сетевой лючок"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_cp",
    "code": "CP",
    "kind": "passive",
    "labels": [
      "Konsolidační bod",
      "Consolidation point",
      "Konsolidierungspunkt",
      "Консолидационная точка"
    ],
    "color": "#0d9488"
  },
  {
    "type": "sk_server",
    "code": "SRV",
    "kind": "server",
    "labels": [
      "Server",
      "Server",
      "Server",
      "Сервер"
    ],
    "color": "#2563eb"
  },
  {
    "type": "sk_nas",
    "code": "NAS",
    "kind": "server",
    "labels": [
      "Síťové datové úložiště",
      "Network-attached storage",
      "Netzwerkspeicher",
      "Сетевое хранилище NAS"
    ],
    "color": "#2563eb"
  },
  {
    "type": "sk_ups",
    "code": "UPS",
    "kind": "power",
    "labels": [
      "Záložní zdroj UPS",
      "Uninterruptible power supply",
      "Unterbrechungsfreie Stromversorgung",
      "Источник бесперебойного питания"
    ],
    "color": "#64748b"
  },
  {
    "type": "sk_pdu",
    "code": "PDU",
    "kind": "power",
    "labels": [
      "Napájecí panel PDU",
      "Power distribution unit",
      "Stromverteilereinheit",
      "Блок распределения питания"
    ],
    "color": "#64748b"
  },
  {
    "type": "sk_pc",
    "code": "PC",
    "kind": "client",
    "labels": [
      "Pracovní stanice",
      "Workstation",
      "Arbeitsplatzrechner",
      "Рабочая станция"
    ],
    "color": "#0891b2"
  },
  {
    "type": "sk_printer",
    "code": "PRN",
    "kind": "client",
    "labels": [
      "Síťová tiskárna",
      "Network printer",
      "Netzwerkdrucker",
      "Сетевой принтер"
    ],
    "color": "#0891b2"
  },
  {
    "type": "sk_ip_phone",
    "code": "VoIP",
    "kind": "client",
    "labels": [
      "IP telefon",
      "IP telephone",
      "IP-Telefon",
      "IP-телефон"
    ],
    "color": "#0891b2"
  },
  {
    "type": "sk_isp",
    "code": "WAN",
    "kind": "provider",
    "labels": [
      "Přípojka poskytovatele internetu",
      "Internet service provider handoff",
      "Internet-Provider-Übergabepunkt",
      "Ввод интернет-провайдера"
    ],
    "color": "#0369a1"
  },
  {
    "type": "sk_wifi_controller",
    "code": "WLC",
    "kind": "active",
    "labels": [
      "Řadič Wi-Fi",
      "Wireless LAN controller",
      "WLAN-Controller",
      "Контроллер Wi-Fi"
    ],
    "color": "#0284c7"
  },
  {
    "type": "sk_fiber_splitter",
    "code": "SPL",
    "kind": "fiber",
    "labels": [
      "Pasivní optický rozbočovač",
      "Passive optical splitter",
      "Passiver optischer Splitter",
      "Пассивный оптический разветвитель"
    ],
    "color": "#d97706"
  },
  {
    "type": "sk_splice_box",
    "code": "SPLICE",
    "kind": "fiber",
    "labels": [
      "Optická spojovací krabice",
      "Fiber splice enclosure",
      "LWL-Spleißbox",
      "Оптическая соединительная муфта"
    ],
    "color": "#d97706"
  }
];
const SK_DEVICE_LABELS=Object.fromEntries(SK_CATALOG.map(d=>[d.type,d.labels[0]]));
const SK_DETECTOR_TYPES=new Set(SK_CATALOG.filter(d=>!['rack','power','passive'].includes(d.kind)).map(d=>d.type));
const SK_SYMBOL_PARTS={"panel":[["rect",{"x":9,"y":2,"width":30,"height":44,"rx":2,"fill":"white"}],["rect",{"x":13,"y":7,"width":22,"height":9,"rx":2,"fill":"white"}],["rect",{"x":13,"y":20,"width":22,"height":9,"rx":2,"fill":"white"}],["line",{"x1":14,"y1":38,"x2":34,"y2":38}],["circle",{"cx":15,"cy":11,"r":1,"fill":"#0284c7"}],["text",{"x":24,"y":33,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"RACK"]],"sk_router":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"RTR"]],"sk_firewall":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"FW"]],"sk_switch":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"SW"]],"sk_poe_switch":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"PoE"]],"sk_core_switch":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"CORE"]],"sk_patch_panel":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0d9488","stroke":"none"},"PP"]],"sk_fiber_panel":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"ODF"]],"sk_media_converter":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"MC"]],"sk_ont":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"ONT"]],"sk_modem":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"MDM"]],"sk_access_point":[["circle",{"cx":24,"cy":24,"r":17,"fill":"white"}],["circle",{"cx":24,"cy":24,"r":22,"fill":"none"}],["line",{"x1":21,"y1":1,"x2":27,"y2":1}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#7c3aed","stroke":"none"},"AP"]],"sk_mesh":[["circle",{"cx":24,"cy":24,"r":17,"fill":"white"}],["circle",{"cx":24,"cy":24,"r":22,"fill":"none"}],["line",{"x1":21,"y1":1,"x2":27,"y2":1}],["text",{"x":24,"y":22,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#7c3aed","stroke":"none"},"MESH"]],"sk_bridge":[["circle",{"cx":24,"cy":24,"r":17,"fill":"white"}],["circle",{"cx":24,"cy":24,"r":22,"fill":"none"}],["line",{"x1":21,"y1":1,"x2":27,"y2":1}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#7c3aed","stroke":"none"},"PTP"]],"sk_antenna":[["circle",{"cx":24,"cy":24,"r":17,"fill":"white"}],["circle",{"cx":24,"cy":24,"r":22,"fill":"none"}],["line",{"x1":21,"y1":1,"x2":27,"y2":1}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#7c3aed","stroke":"none"},"ANT"]],"sk_outlet":[["rect",{"x":5,"y":5,"width":38,"height":38,"rx":2,"fill":"white"}],["rect",{"x":12,"y":27,"width":24,"height":10,"rx":0,"fill":"white"}],["line",{"x1":16,"y1":28,"x2":16,"y2":33}],["line",{"x1":21,"y1":28,"x2":21,"y2":33}],["line",{"x1":26,"y1":28,"x2":26,"y2":33}],["line",{"x1":31,"y1":28,"x2":31,"y2":33}],["text",{"x":24,"y":17,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"RJ45"]],"sk_outlet_dual":[["rect",{"x":5,"y":5,"width":38,"height":38,"rx":2,"fill":"white"}],["rect",{"x":12,"y":27,"width":24,"height":10,"rx":0,"fill":"white"}],["line",{"x1":16,"y1":28,"x2":16,"y2":33}],["line",{"x1":21,"y1":28,"x2":21,"y2":33}],["line",{"x1":26,"y1":28,"x2":26,"y2":33}],["line",{"x1":31,"y1":28,"x2":31,"y2":33}],["text",{"x":24,"y":17,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"2×RJ"]],"sk_fiber_outlet":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"FO"]],"sk_floor_box":[["rect",{"x":5,"y":5,"width":38,"height":38,"rx":2,"fill":"white"}],["rect",{"x":12,"y":27,"width":24,"height":10,"rx":0,"fill":"white"}],["line",{"x1":16,"y1":28,"x2":16,"y2":33}],["line",{"x1":21,"y1":28,"x2":21,"y2":33}],["line",{"x1":26,"y1":28,"x2":26,"y2":33}],["line",{"x1":31,"y1":28,"x2":31,"y2":33}],["text",{"x":24,"y":17,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"FB"]],"sk_cp":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0d9488","stroke":"none"},"CP"]],"sk_server":[["rect",{"x":9,"y":2,"width":30,"height":44,"rx":2,"fill":"white"}],["line",{"x1":14,"y1":10,"x2":34,"y2":10}],["circle",{"cx":15,"cy":7,"r":1,"fill":"#2563eb"}],["line",{"x1":14,"y1":24,"x2":34,"y2":24}],["circle",{"cx":15,"cy":21,"r":1,"fill":"#2563eb"}],["line",{"x1":14,"y1":38,"x2":34,"y2":38}],["circle",{"cx":15,"cy":35,"r":1,"fill":"#2563eb"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#2563eb","stroke":"none"},"SRV"]],"sk_nas":[["rect",{"x":9,"y":2,"width":30,"height":44,"rx":2,"fill":"white"}],["line",{"x1":14,"y1":10,"x2":34,"y2":10}],["circle",{"cx":15,"cy":7,"r":1,"fill":"#2563eb"}],["line",{"x1":14,"y1":24,"x2":34,"y2":24}],["circle",{"cx":15,"cy":21,"r":1,"fill":"#2563eb"}],["line",{"x1":14,"y1":38,"x2":34,"y2":38}],["circle",{"cx":15,"cy":35,"r":1,"fill":"#2563eb"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#2563eb","stroke":"none"},"NAS"]],"sk_ups":[["rect",{"x":6,"y":5,"width":36,"height":38,"rx":2,"fill":"white"}],["polyline",{"points":"27,9 18,23 27,23 20,38","fill":"none"}],["text",{"x":24,"y":24,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#64748b","stroke":"none"},"UPS"]],"sk_pdu":[["rect",{"x":6,"y":5,"width":36,"height":38,"rx":2,"fill":"white"}],["polyline",{"points":"27,9 18,23 27,23 20,38","fill":"none"}],["text",{"x":24,"y":24,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#64748b","stroke":"none"},"PDU"]],"sk_pc":[["rect",{"x":4,"y":5,"width":40,"height":29,"rx":2,"fill":"white"}],["line",{"x1":24,"y1":34,"x2":24,"y2":42}],["line",{"x1":14,"y1":43,"x2":34,"y2":43}],["text",{"x":24,"y":22,"font-size":14,"font-weight":700,"text-anchor":"middle","fill":"#0891b2","stroke":"none"},"PC"]],"sk_printer":[["rect",{"x":4,"y":5,"width":40,"height":29,"rx":2,"fill":"white"}],["line",{"x1":24,"y1":34,"x2":24,"y2":42}],["line",{"x1":14,"y1":43,"x2":34,"y2":43}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0891b2","stroke":"none"},"PRN"]],"sk_ip_phone":[["rect",{"x":4,"y":5,"width":40,"height":29,"rx":2,"fill":"white"}],["line",{"x1":24,"y1":34,"x2":24,"y2":42}],["line",{"x1":14,"y1":43,"x2":34,"y2":43}],["text",{"x":24,"y":22,"font-size":9,"font-weight":700,"text-anchor":"middle","fill":"#0891b2","stroke":"none"},"VoIP"]],"sk_isp":[["circle",{"cx":14,"cy":24,"r":10,"fill":"white"}],["circle",{"cx":25,"cy":19,"r":13,"fill":"white"}],["circle",{"cx":36,"cy":25,"r":10,"fill":"white"}],["line",{"x1":7,"y1":36,"x2":41,"y2":36}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0369a1","stroke":"none"},"WAN"]],"sk_wifi_controller":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["rect",{"x":7,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":16,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":25,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["rect",{"x":34,"y":31,"width":6,"height":5,"rx":0,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#0284c7","stroke":"none"},"WLC"]],"sk_fiber_splitter":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":11,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"SPL"]],"sk_splice_box":[["rect",{"x":2,"y":9,"width":44,"height":31,"rx":2,"fill":"white"}],["line",{"x1":0,"y1":24,"x2":7,"y2":24}],["line",{"x1":41,"y1":24,"x2":48,"y2":24}],["circle",{"cx":8,"cy":24,"r":2,"fill":"white"}],["circle",{"cx":40,"cy":24,"r":2,"fill":"white"}],["text",{"x":24,"y":22,"font-size":7,"font-weight":700,"text-anchor":"middle","fill":"#d97706","stroke":"none"},"SPLICE"]]};
