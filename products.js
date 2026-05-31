// Mock Product Database for Computer Shop E-Commerce site

const products = [
  // --- CPUs ---
  {
    id: "cpu-intel-i9",
    name: "Intel Core i9-13900K",
    category: "cpus",
    price: 569.99,
    rating: 4.9,
    reviewsCount: 142,
    image: "images/cpu.png",
    description: "24-core (8 Performance-cores + 16 Efficient-cores) desktop processor. Features thermal velocity boost and PCIe 5.0 support.",
    specs: {
      socket: "LGA1700",
      cores: "24 Cores / 32 Threads",
      baseClock: "3.0 GHz",
      boostClock: "5.8 GHz",
      wattage: 125,
      graphics: "Intel UHD Graphics 770"
    },
    inStock: true,
    featured: true
  },
  {
    id: "cpu-amd-r9",
    name: "AMD Ryzen 9 7900X",
    category: "cpus",
    price: 429.99,
    rating: 4.8,
    reviewsCount: 98,
    image: "images/cpu.png",
    description: "12-core, 24-thread desktop processor built on the Zen 4 architecture. Ultimate gaming and workstation performance.",
    specs: {
      socket: "AM5",
      cores: "12 Cores / 24 Threads",
      baseClock: "4.7 GHz",
      boostClock: "5.6 GHz",
      wattage: 170,
      graphics: "AMD Radeon Graphics"
    },
    inStock: true,
    featured: false
  },
  {
    id: "cpu-intel-i5",
    name: "Intel Core i5-13400",
    category: "cpus",
    price: 199.99,
    rating: 4.6,
    reviewsCount: 64,
    image: "images/cpu.png",
    description: "10-core (6 P-cores + 4 E-cores) desktop processor. Perfect balance of price and gaming performance.",
    specs: {
      socket: "LGA1700",
      cores: "10 Cores / 16 Threads",
      baseClock: "2.5 GHz",
      boostClock: "4.6 GHz",
      wattage: 65,
      graphics: "Intel UHD Graphics 730"
    },
    inStock: true,
    featured: false
  },
  {
    id: "cpu-amd-r5",
    name: "AMD Ryzen 5 7600",
    category: "cpus",
    price: 219.99,
    rating: 4.7,
    reviewsCount: 82,
    image: "images/cpu.png",
    description: "6-core, 12-thread gaming processor. Highly efficient and socket AM5 future-proofed.",
    specs: {
      socket: "AM5",
      cores: "6 Cores / 12 Threads",
      baseClock: "3.8 GHz",
      boostClock: "5.1 GHz",
      wattage: 65,
      graphics: "AMD Radeon Graphics"
    },
    inStock: true,
    featured: false
  },

  // --- GPUs ---
  {
    id: "gpu-rtx-4090",
    name: "NVIDIA GeForce RTX 4090 24GB",
    category: "gpus",
    price: 1599.99,
    rating: 4.9,
    reviewsCount: 215,
    image: "images/gpu.png",
    description: "The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.",
    specs: {
      memory: "24GB GDDR6X",
      interface: "PCIe 4.0 x16",
      ports: "3x DisplayPort 1.4a, 1x HDMI 2.1a",
      wattage: 450,
      length: "336mm"
    },
    inStock: true,
    featured: true
  },
  {
    id: "gpu-rtx-4075",
    name: "NVIDIA GeForce RTX 4070 Ti 12GB",
    category: "gpus",
    price: 799.99,
    rating: 4.7,
    reviewsCount: 119,
    image: "images/gpu.png",
    description: "Incredible 1440p and entry-level 4K gaming card featuring DLSS 3 frame generation.",
    specs: {
      memory: "12GB GDDR6X",
      interface: "PCIe 4.0 x16",
      ports: "3x DisplayPort 1.4a, 1x HDMI 2.1",
      wattage: 285,
      length: "285mm"
    },
    inStock: true,
    featured: false
  },
  {
    id: "gpu-rx-7900xtx",
    name: "AMD Radeon RX 7900 XTX 24GB",
    category: "gpus",
    price: 949.99,
    rating: 4.6,
    reviewsCount: 74,
    image: "images/gpu.png",
    description: "AMD RDNA 3 architecture powerhouse featuring chiplet design and massive 24GB VRAM buffer.",
    specs: {
      memory: "24GB GDDR6",
      interface: "PCIe 4.0 x16",
      ports: "2x DisplayPort 2.1, 1x HDMI 2.1, 1x USB-C",
      wattage: 355,
      length: "287mm"
    },
    inStock: true,
    featured: false
  },
  {
    id: "gpu-rtx-4060",
    name: "NVIDIA GeForce RTX 4060 8GB",
    category: "gpus",
    price: 299.99,
    rating: 4.4,
    reviewsCount: 135,
    image: "images/gpu.png",
    description: "Highly efficient 1080p gaming card with ray tracing, DLSS 3, and low power requirements.",
    specs: {
      memory: "8GB GDDR6",
      interface: "PCIe 4.0 x8",
      ports: "3x DisplayPort 1.4a, 1x HDMI 2.1a",
      wattage: 115,
      length: "240mm"
    },
    inStock: true,
    featured: false
  },

  // --- Motherboards ---
  {
    id: "mobo-intel-z790",
    name: "ASUS ROG Maximus Z790 Hero",
    category: "motherboards",
    price: 629.99,
    rating: 4.8,
    reviewsCount: 42,
    image: "images/gpu.png", // reusing images, styled differently or using default
    description: "Premium Intel Z790 ATX motherboard. Features robust 20+1 power stages, DDR5 support, Wi-Fi 6E, and PCIe 5.0.",
    specs: {
      socket: "LGA1700",
      chipset: "Intel Z790",
      formFactor: "ATX",
      ramType: "DDR5",
      maxRam: "192GB",
      m2Slots: "5x M.2 Slots"
    },
    inStock: true,
    featured: false
  },
  {
    id: "mobo-amd-b650",
    name: "MSI MAG B650 Tomahawk WiFi",
    category: "motherboards",
    price: 219.99,
    rating: 4.6,
    reviewsCount: 88,
    image: "images/gpu.png",
    description: "Popular AMD B650 motherboard offering excellent power delivery, thermal design, and Wi-Fi 6E connectivity.",
    specs: {
      socket: "AM5",
      chipset: "AMD B650",
      formFactor: "ATX",
      ramType: "DDR5",
      maxRam: "128GB",
      m2Slots: "3x M.2 Slots"
    },
    inStock: true,
    featured: false
  },
  {
    id: "mobo-intel-b760",
    name: "ASUS Prime B760-PLUS D4",
    category: "motherboards",
    price: 139.99,
    rating: 4.3,
    reviewsCount: 31,
    image: "images/gpu.png",
    description: "Affordable Intel B760 motherboard with DDR4 memory support, PCIe 5.0 slot, and dual M.2 slot setups.",
    specs: {
      socket: "LGA1700",
      chipset: "Intel B760",
      formFactor: "ATX",
      ramType: "DDR4",
      maxRam: "128GB",
      m2Slots: "3x M.2 Slots"
    },
    inStock: true,
    featured: false
  },

  // --- RAM ---
  {
    id: "ram-corsair-ddr5",
    name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
    category: "ram",
    price: 114.99,
    rating: 4.8,
    reviewsCount: 154,
    image: "images/keyboard.png",
    description: "High-performance DDR5 memory optimized for Intel and AMD motherboards, with customizable dynamic RGB lighting.",
    specs: {
      capacity: "32GB (2 x 16GB)",
      speed: "6000 MHz",
      type: "DDR5",
      casLatency: "CL36",
      rgb: "Yes"
    },
    inStock: true,
    featured: false
  },
  {
    id: "ram-gskill-ddr5",
    name: "G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz",
    category: "ram",
    price: 219.99,
    rating: 4.9,
    reviewsCount: 47,
    image: "images/keyboard.png",
    description: "Extreme performance DDR5 memory designed for enthusiasts and overclockers.",
    specs: {
      capacity: "64GB (2 x 32GB)",
      speed: "6400 MHz",
      type: "DDR5",
      casLatency: "CL32",
      rgb: "Yes"
    },
    inStock: true,
    featured: false
  },
  {
    id: "ram-kingston-ddr4",
    name: "Kingston FURY Beast 16GB (2x8GB) DDR4 3200MHz",
    category: "ram",
    price: 44.99,
    rating: 4.5,
    reviewsCount: 228,
    image: "images/keyboard.png",
    description: "High performance cost-effective DDR4 upgrade for gaming rigs and rendering setups.",
    specs: {
      capacity: "16GB (2 x 8GB)",
      speed: "3200 MHz",
      type: "DDR4",
      casLatency: "CL16",
      rgb: "No"
    },
    inStock: true,
    featured: false
  },

  // --- Storage ---
  {
    id: "storage-samsung-990",
    name: "Samsung 990 Pro 2TB M.2 NVMe SSD",
    category: "storage",
    price: 169.99,
    rating: 4.9,
    reviewsCount: 312,
    image: "images/cpu.png",
    description: "Experience the ultimate SSD speed. Powered by PCIe Gen 4.0, read speeds hit up to 7450 MB/s.",
    specs: {
      capacity: "2TB",
      interface: "PCIe Gen 4.0 x4, NVMe 2.0",
      readSpeed: "Up to 7,450 MB/s",
      writeSpeed: "Up to 6,900 MB/s",
      formFactor: "M.2 2280"
    },
    inStock: true,
    featured: true
  },
  {
    id: "storage-crucial-1tb",
    name: "Crucial P3 Plus 1TB M.2 NVMe SSD",
    category: "storage",
    price: 69.99,
    rating: 4.7,
    reviewsCount: 185,
    image: "images/cpu.png",
    description: "Valuable PCIe 4.0 performance offering sequential speeds up to 5000MB/s at entry-level cost.",
    specs: {
      capacity: "1TB",
      interface: "PCIe Gen 4.0 x4, NVMe 1.4",
      readSpeed: "Up to 5,000 MB/s",
      writeSpeed: "Up to 3,600 MB/s",
      formFactor: "M.2 2280"
    },
    inStock: true,
    featured: false
  },

  // --- Power Supplies ---
  {
    id: "psu-corsair-850",
    name: "Corsair RM850x 850W 80+ Gold Modular",
    category: "psus",
    price: 139.99,
    rating: 4.8,
    reviewsCount: 143,
    image: "images/gpu.png",
    description: "Fully modular power supplies built with the highest quality Japanese capacitors for consistent 80 Plus Gold efficiency.",
    specs: {
      wattage: 850,
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fanSize: "135mm",
      connector: "ATX 12V v2.52"
    },
    inStock: true,
    featured: false
  },
  {
    id: "psu-seasonic-1000",
    name: "Seasonic Focus GX-1000 1000W 80+ Gold",
    category: "psus",
    price: 189.99,
    rating: 4.9,
    reviewsCount: 65,
    image: "images/gpu.png",
    description: "Compact 1000W fully modular power supply unit with active fan control and extreme efficiency standards.",
    specs: {
      wattage: 1000,
      efficiency: "80+ Gold",
      modular: "Fully Modular",
      fanSize: "120mm",
      connector: "ATX 12V / EPS 12V"
    },
    inStock: true,
    featured: false
  },
  {
    id: "psu-evga-600",
    name: "EVGA 600 W1 600W 80+ White",
    category: "psus",
    price: 49.99,
    rating: 4.2,
    reviewsCount: 198,
    image: "images/gpu.png",
    description: "Budget friendly power supply unit, offering 600W continuous power for basic custom setups.",
    specs: {
      wattage: 600,
      efficiency: "80+ White",
      modular: "Non-Modular",
      fanSize: "120mm",
      connector: "ATX 12V"
    },
    inStock: true,
    featured: false
  },

  // --- Cases ---
  {
    id: "case-nzxt-h9",
    name: "NZXT H9 Flow Dual-Chamber ATX Mid-Tower",
    category: "cases",
    price: 159.99,
    rating: 4.9,
    reviewsCount: 88,
    image: "images/hero.png",
    description: "Show off components with a wrap-around tempered glass design. Features dual-chamber layout for thermal optimization.",
    specs: {
      type: "ATX Mid-Tower",
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX"],
      dimensions: "466 x 290 x 495 mm",
      gpuClearance: "435mm",
      includedFans: "4x 120mm F-Series"
    },
    inStock: true,
    featured: true
  },
  {
    id: "case-corsair-4000d",
    name: "Corsair 4000D Airflow Tempered Glass",
    category: "cases",
    price: 104.99,
    rating: 4.7,
    reviewsCount: 310,
    image: "images/hero.png",
    description: "High-airflow optimized steel front panel mid-tower case. Features easy cable management and clean aesthetic.",
    specs: {
      type: "ATX Mid-Tower",
      supportedFormFactors: ["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"],
      dimensions: "453 x 230 x 466 mm",
      gpuClearance: "360mm",
      includedFans: "2x 120mm Fans"
    },
    inStock: true,
    featured: false
  },

  // --- CPU Coolers ---
  {
    id: "cooler-corsair-h150i",
    name: "Corsair iCUE H150i Elite Capellix XT Liquid Cooler",
    category: "coolers",
    price: 219.99,
    rating: 4.8,
    reviewsCount: 73,
    image: "images/cpu.png",
    description: "Premium AIO liquid cooler delivering powerful, low-noise cooling with a 360mm radiator and brilliant RGB lighting.",
    specs: {
      type: "Liquid AIO Cooler",
      radiatorSize: "360mm",
      supportedSockets: ["LGA1700", "LGA1200", "AM5", "AM4"],
      fans: "3x 120mm AF RGB ELITE",
      noiseLevel: "34.1 dBA"
    },
    inStock: true,
    featured: false
  },
  {
    id: "cooler-noctua-d15",
    name: "Noctua NH-D15 Dual-Tower Air Cooler",
    category: "coolers",
    price: 109.99,
    rating: 4.9,
    reviewsCount: 202,
    image: "images/cpu.png",
    description: "The gold standard of premium air cooling. Dual-tower heatsink with two NF-A15 140mm PWM fans.",
    specs: {
      type: "Air Cooler",
      supportedSockets: ["LGA1700", "LGA1200", "AM5", "AM4", "AM3+"],
      fans: "2x 140mm Fans",
      height: "165mm",
      noiseLevel: "24.6 dBA"
    },
    inStock: true,
    featured: false
  },

  // --- Prebuilt PCs ---
  {
    id: "prebuilt-aegis",
    name: "Aegis Horizon Extreme Gaming PC",
    category: "prebuilt",
    price: 2499.99,
    rating: 4.9,
    reviewsCount: 38,
    image: "images/hero.png",
    description: "Unleash extreme power. Ready to play any game in 4K resolution at ultra settings, pre-assembled and tested.",
    specs: {
      cpu: "Intel Core i9-13900K",
      gpu: "NVIDIA RTX 4080 Super 16GB",
      ram: "32GB DDR5 6000MHz",
      storage: "2TB NVMe PCIe 4.0 SSD",
      os: "Windows 11 Home",
      powerSupply: "850W 80+ Gold"
    },
    inStock: true,
    featured: true
  },
  {
    id: "prebuilt-spectre",
    name: "Spectre Pro Creator Workstation",
    category: "prebuilt",
    price: 1899.99,
    rating: 4.8,
    reviewsCount: 19,
    image: "images/hero.png",
    description: "Optimized for professional video editing, 3D rendering, and heavy computational tasks.",
    specs: {
      cpu: "AMD Ryzen 9 7900X",
      gpu: "NVIDIA RTX 4070 Ti 12GB",
      ram: "64GB DDR5 5600MHz",
      storage: "4TB NVMe SSD (2x 2TB)",
      os: "Windows 11 Pro",
      powerSupply: "750W 80+ Gold"
    },
    inStock: true,
    featured: false
  },

  // --- Peripherals & Displays ---
  {
    id: "periph-keyboard-apex",
    name: "SteelSeries Apex Pro Mechanical Keyboard",
    category: "peripherals",
    price: 199.99,
    rating: 4.8,
    reviewsCount: 345,
    image: "images/keyboard.png",
    description: "World's fastest keyboard. OmniPoint 2.0 adjustable mechanical switches, OLED smart display, and aircraft-grade aluminum alloy top plate.",
    specs: {
      switches: "OmniPoint 2.0 Adjustable Magnetic",
      connection: "Wired USB-C passthrough",
      backlight: "Per-Key RGB",
      formFactor: "Full Size"
    },
    inStock: true,
    featured: true
  },
  {
    id: "periph-monitor-rog",
    name: "ASUS ROG Swift PG27AQDM OLED Gaming Monitor",
    category: "peripherals",
    price: 899.99,
    rating: 4.9,
    reviewsCount: 57,
    image: "images/laptop.png",
    description: "27-inch 1440p gaming monitor featuring a stunning OLED panel, 240Hz refresh rate, 0.03 ms response time, and custom heatsink design.",
    specs: {
      size: "27 Inch",
      resolution: "2560 x 1440 (2K QHD)",
      panelType: "OLED",
      refreshRate: "240Hz",
      responseTime: "0.03 ms"
    },
    inStock: true,
    featured: true
  }
];

// Helper functions for PC Builder compatibility check
const checkBuilderCompatibility = (parts) => {
  const warnings = [];
  const errors = [];

  const cpu = parts.cpus;
  const motherboard = parts.motherboards;
  const ram = parts.ram;
  const psu = parts.psus;
  const gpu = parts.gpus;
  const casePart = parts.cases;
  const cooler = parts.coolers;

  // 1. CPU & Motherboard Socket Check
  if (cpu && motherboard) {
    if (cpu.specs.socket !== motherboard.specs.socket) {
      errors.push(`**CPU & Motherboard Incompatibility**: The selected ${cpu.name} uses socket ${cpu.specs.socket}, but the ${motherboard.name} uses socket ${motherboard.specs.socket}. These parts cannot be assembled together.`);
    }
  }

  // 2. Motherboard & RAM Type Check
  if (motherboard && ram) {
    if (motherboard.specs.ramType !== ram.specs.type) {
      errors.push(`**RAM & Motherboard Incompatibility**: The ${motherboard.name} motherboard requires ${motherboard.specs.ramType} memory, but the selected ${ram.name} is ${ram.specs.type}.`);
    }
  }

  // 3. CPU Cooler Socket Check
  if (cpu && cooler) {
    if (!cooler.specs.supportedSockets.includes(cpu.specs.socket)) {
      warnings.push(`**Cooler Socket Compatibility**: Double check if the ${cooler.name} includes mounting brackets for socket ${cpu.specs.socket}. Supported sockets: ${cooler.specs.supportedSockets.join(", ")}.`);
    }
  }

  // 4. Case Form Factor Check
  if (motherboard && casePart) {
    if (!casePart.specs.supportedFormFactors.includes(motherboard.specs.formFactor)) {
      errors.push(`**Motherboard & Case Form Factor**: The ${motherboard.name} is an ${motherboard.specs.formFactor} motherboard, but the ${casePart.name} case supports: ${casePart.specs.supportedFormFactors.join(", ")}.`);
    }
  }

  // 5. PSU Wattage Check
  let estimatedWattage = 50; // base system wattage (motherboard, RAM, fans, SSDs)
  if (cpu) estimatedWattage += cpu.specs.wattage;
  if (gpu) estimatedWattage += gpu.specs.wattage;
  if (cooler && cooler.specs.type === "Liquid AIO Cooler") estimatedWattage += 30;

  if (psu) {
    if (psu.specs.wattage < estimatedWattage + 100) { // Keep a 100W buffer
      errors.push(`**Power Supply Capacity Warning**: The estimated system peak power draw is ${estimatedWattage}W. The selected ${psu.name} is rated for ${psu.specs.wattage}W. We recommend at least a ${estimatedWattage + 100}W power supply to avoid stability issues.`);
    } else if (psu.specs.wattage < estimatedWattage + 200) {
      warnings.push(`**Power Supply Overhead**: System draws ${estimatedWattage}W. The ${psu.specs.wattage}W PSU fits, but having a larger headroom is recommended for future upgrades.`);
    }
  }

  return {
    isCompatible: errors.length === 0,
    errors,
    warnings,
    estimatedWattage
  };
};

// Export to window object for frontend access
if (typeof window !== "undefined") {
  window.products = products;
  window.checkBuilderCompatibility = checkBuilderCompatibility;
}
