#!/usr/bin/env node
/**
 * Static Site Generator for Abvolt Automation
 * Extracts data from the SPA and produces standalone crawlable HTML files
 * with proper schema markup, FAQ schema, internal linking, and meta tags.
 */

const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────
// DATA (extracted from index.html SPA)
// ─────────────────────────────────────────────
const PH = "(224) 369-8752";
const EM = "info@abvolt.co";
const AD = ["11 N. Skokie Hwy, Suite G19", "Lake Bluff, IL 60044"];
const BASE = "https://abvoltautomation.com";

const SVCS = [
  {id:"smart-home-automation",t:"Smart Home Automation",sh:"Unified control of lighting, climate, security, and entertainment through Control4, Crestron, and Savant — from a single touchscreen or voice command.",kw:"Smart Home Automation Lake Forest IL",
  f:{i:"Transform your North Shore residence into an intelligently connected living environment. Our bespoke smart home automation systems seamlessly integrate every technology in your home into one unified platform, giving you effortless control over lighting, climate, security, entertainment, and more.",
  s:[{h:"Whole-Home Integration",p:"We design comprehensive automation ecosystems using industry-leading platforms including Control4, Crestron, and Savant. Every system in your home communicates through a single, intuitive interface. Adjust any setting from elegant wall-mounted touchscreens, your smartphone, or simple voice commands."},{h:"Scene Management & Scheduling",p:"Create custom scenes that transform your home with a single tap. An 'Entertain' scene might dim the dining lights, start a playlist, and set the thermostat. A 'Goodnight' scene locks all doors, arms security, turns off all lights, and lowers the shades."},{h:"New Construction & Retrofit Solutions",p:"Whether building a new estate or upgrading an existing North Shore home, we engineer systems that integrate flawlessly. For new construction, we work alongside your builder and architect during the design phase. For existing homes, our retrofit expertise adds sophisticated automation with minimal disruption."},{h:"Remote Access & Monitoring",p:"Monitor and control your home from anywhere in the world. Check security cameras, adjust the thermostat, or turn on pathway lights from your phone. Our cloud-connected systems keep you connected 24/7."}],
  b:["Control4","Crestron","Savant","Josh.ai","Apple HomeKit"],
  q:[{q:"What is the best smart home system for a large North Shore estate?",a:"For homes over 5,000 sq ft, we typically recommend Control4 or Crestron for scalability and reliability. We assess your property during our complimentary consultation."},{q:"Can I add smart home automation to my existing Lake Forest home?",a:"Absolutely. We specialize in retrofitting automation into existing North Shore homes with minimal disruption using wireless technologies and strategic wiring."},{q:"How long does a smart home installation take?",a:"A typical whole-home project takes 2-6 weeks depending on scope. Simple systems can be completed in days."}]}},

  {id:"home-security-surveillance",t:"Home Security & Surveillance",sh:"Enterprise-grade IP camera systems, smart alerts, and 24/7 remote monitoring designed for high-value North Shore estates.",kw:"Home Security Installation North Shore IL",
  f:{i:"Protect your family and property with surveillance and security systems engineered for the unique demands of luxury North Shore residences. From expansive lakefront estates to multi-structure properties, our solutions deliver comprehensive protection without compromising aesthetics.",
  s:[{h:"IP Camera Systems & NVR Recording",p:"We install commercial-grade IP cameras with 4K resolution, night vision, wide dynamic range, and intelligent analytics. Network Video Recorders store footage locally with encrypted cloud backup, ensuring you never lose critical evidence."},{h:"Smart Alerts & AI-Powered Detection",p:"Our systems use AI to distinguish between people, vehicles, animals, and environmental movement — dramatically reducing false alerts. Receive instant notifications with snapshot previews when someone approaches your property."},{h:"Perimeter Security & Vacation Home Monitoring",p:"Many North Shore homeowners maintain vacation properties. Our monitoring solutions provide peace of mind with 24/7 surveillance, environmental sensors, and automated alerts. Integrated lighting simulates occupancy to deter intruders."},{h:"Integration with Access Control",p:"Your security integrates with smart locks, video intercoms, automated gates, and your automation platform. Automatically arm the system when the last person leaves. Lock all doors with a single command."}],
  b:["Verkada","Axis","Hanwha","Luma","IC Realtime","Ring"],
  q:[{q:"How many cameras does a typical North Shore home need?",a:"Most estates require 8-16 cameras for comprehensive coverage. We conduct a thorough site assessment to identify optimal placement."},{q:"Can I monitor cameras from my phone?",a:"Yes. All our systems include secure mobile app access for live feeds, recorded footage, and alerts from anywhere."},{q:"Do you offer 24/7 professional monitoring?",a:"We partner with UL-listed monitoring centers for round-the-clock surveillance with emergency dispatch."}]}},

  {id:"lighting-control-systems",t:"Lighting Control Systems",sh:"Lutron and Ketra automated lighting with scene management, motorized shades, and circadian programming.",kw:"Lighting Control Systems Winnetka IL",
  f:{i:"Elevate every room with intelligent lighting that responds to your lifestyle. Our Lutron and Ketra systems create the perfect ambiance for any occasion while reducing energy consumption by up to 20%.",
  s:[{h:"Lutron & Ketra Lighting Design",p:"As certified integrators, we design systems that go far beyond dimming. Tunable white and full-spectrum color systems adjust brightness and temperature throughout the day, supporting your natural circadian rhythm."},{h:"Motorized Shades & Window Treatments",p:"Integrate motorized roller shades, draperies, and exterior screens. Schedule shades to rise with sunrise, lower during peak sun, and close at dusk — all automatically."},{h:"Custom Scene Programming",p:"Scenes tailored to your routine: a 'Morning' scene gradually brightens lights while raising shades. A 'Movie Night' scene dims everything and closes theater shades. Every scene accessible via keypads, app, or voice."},{h:"Landscape & Architectural Lighting",p:"Pathway lighting, garden accents, facade uplighting, and pool area illumination — all automated with astronomical timeclocks that adjust seasonally."}],
  b:["Lutron","Ketra","Colorbeam","Coastal Source","WAC Lighting"],
  q:[{q:"How much can lighting control save on energy?",a:"Lutron systems typically reduce lighting energy by 20-30% through occupancy sensing, daylight harvesting, and scheduled dimming."},{q:"Can you retrofit lighting control into an existing home?",a:"Yes. Lutron RadioRA 3 uses wireless technology that installs into existing switch boxes without new wiring."},{q:"What are circadian rhythm lighting systems?",a:"Lighting that automatically adjusts color temperature throughout the day — cooler in morning, warmer in evening — supporting your sleep-wake cycle."}]}},

  {id:"whole-home-audio",t:"Whole-Home Audio",sh:"Multi-zone distributed audio delivering pristine sound to every room with invisible integration.",kw:"Whole Home Audio Highland Park IL",
  f:{i:"Fill every corner of your estate with rich, immersive sound through speakers that blend invisibly into your home's architecture.",
  s:[{h:"Multi-Zone Audio Architecture",p:"Independent zones for each room. Play jazz in the kitchen while kids listen elsewhere. Group zones for parties or fill the entire house with one soundtrack. Control from wall keypads, phone, or voice."},{h:"Invisible Speaker Solutions",p:"In-wall and in-ceiling speakers from Sonance, Bowers & Wilkins, and KEF deliver exceptional audio while remaining completely hidden. Architectural speakers can be plastered over, becoming literally invisible."},{h:"Outdoor Audio",p:"Weather-resistant landscape speakers blend into landscaping while delivering full-range sound. Subterranean subwoofers provide deep bass without visible equipment."},{h:"High-Resolution Streaming",p:"Support for Tidal, Qobuz, Apple Music, Spotify, and more. Multi-room streaming works seamlessly with your existing vinyl or CD collections."}],
  b:["Sonos","Bowers & Wilkins","Sonance","KEF","Coastal Source"],
  q:[{q:"What's the difference between Sonos and a custom system?",a:"Sonos excels for ease of use. Custom systems deliver superior fidelity with invisible installation. We often combine both — Sonos streaming through premium architectural speakers."},{q:"Can outdoor speakers withstand North Shore winters?",a:"Yes. We install speakers rated from -20°F to 120°F with full UV and moisture resistance."},{q:"How many audio zones does a typical home need?",a:"Most estates benefit from 6-12 zones. We design layouts during consultation based on how you use each space."}]}},

  {id:"home-theater-installation",t:"Home Theater Installation",sh:"Dedicated cinema rooms with Dolby Atmos, 4K projection, acoustic treatment, and theatrical seating.",kw:"Home Theater Installation Lake Forest IL",
  f:{i:"Experience cinema the way it was meant to be — in your own North Shore home. Our installations deliver reference-quality audio and stunning visuals that rival the finest commercial cinemas.",
  s:[{h:"Dolby Atmos & Immersive Audio",p:"Surround sound with overhead height channels creates a dome of sound. Systems range from 7.1.4 to full 9.1.6 reference designs with object-based audio that places sound precisely in three-dimensional space."},{h:"4K & 8K Projection",p:"Ultra-short-throw laser projectors from Sony, JVC, and Epson deliver massive screens with perfect black levels and HDR. Acoustically transparent screens up to 180 inches allow speakers behind the screen."},{h:"Acoustic Design & Treatment",p:"Calibrated absorption, diffusion, and bass management eliminate standing waves and frequency anomalies. Audio sounds exactly as the director intended."},{h:"Comfort & Atmosphere",p:"Theatrical seating with power recline, starlight fiber-optic ceilings, automated aisle lighting, and acoustic panels in premium fabrics."}],
  b:["Sony","JVC","Marantz","Paradigm","Kaleidescape"],
  q:[{q:"What size room do I need?",a:"A dedicated theater ideally starts at 15'x20' for two rows, but we've designed excellent single-row theaters in spaces as small as 12'x15'."},{q:"Media room vs. dedicated theater?",a:"A media room is multipurpose with great AV. A dedicated theater is purpose-built with light control, acoustic treatment, and reference-grade equipment."},{q:"Can I stream content?",a:"Yes. We integrate all streaming services plus media servers like Kaleidescape for stunning 4K HDR with lossless audio."}]}},

  {id:"access-control-systems",t:"Access Control Systems",sh:"Smart locks, video intercoms, biometric entry, and automated gate systems for secure property access.",kw:"Access Control Systems North Shore IL",
  f:{i:"Control who enters your property with sophisticated access control that balances security with convenience — from smart locks and video intercoms to automated gates and biometric entry.",
  s:[{h:"Smart Lock & Keyless Entry",p:"Multiple authentication: PIN codes, fingerprint, smartphone proximity, and key backup. Assign unique codes to family, housekeepers, guests. Every entry is logged automatically."},{h:"Video Intercom Systems",p:"See and speak with visitors from your phone, touchscreen, or any TV. HD cameras with night vision, two-way audio, and full automation integration."},{h:"Gate & Garage Automation",p:"Automated gates with video verification, license plate recognition, and GPS-triggered garage doors. All events logged in your security dashboard."},{h:"Biometric Authentication",p:"Facial recognition and fingerprint readers at key entry points. Multi-factor authentication for sensitive areas like home offices."}],
  b:["DoorBird","2N","Yale","August","Schlage","LiftMaster","ButterflyMX"],
  q:[{q:"Can I give my housekeeper a temporary code?",a:"Yes. Create time-limited codes that work only during scheduled hours. The system logs entry and can disarm specific zones."},{q:"Do smart locks work during power outages?",a:"Battery backup lasts 6-12 months with physical key override always available."},{q:"Does access control integrate with cameras?",a:"When someone uses a code or rings the intercom, nearby cameras automatically record, creating a complete visual log."}]}},

  {id:"structured-cabling-networking",t:"Structured Cabling & Networking",sh:"Future-proof Cat6a and fiber optic infrastructure with enterprise-grade WiFi delivering 10Gbps+ speeds.",kw:"Structured Wiring Lake Forest IL",
  f:{i:"The invisible foundation of every smart home. Our structured cabling ensures your home has bandwidth, reliability, and expandability for today's technology and everything next.",
  s:[{h:"Cat6a & Fiber Optic Cabling",p:"Cat6a rated for 10Gbps to every room, with fiber optic for longer distances. All cables terminate in centralized, organized rack with labeled patch panels meeting TIA/EIA standards."},{h:"Enterprise-Grade WiFi",p:"Ruckus, Ubiquiti, or Araknis access points strategically placed for seamless roaming and consistent coverage — from basement to third floor, garage to pool house."},{h:"Server Room & Equipment Rack",p:"Climate-controlled closets with ventilated racks, UPS backup, surge protection, and organized cable management. Everything labeled and documented."},{h:"Network Security",p:"Enterprise firewall and VLAN segmentation isolate IoT devices, guest network, and personal devices. Remote management for monitoring and updates."}],
  b:["Ubiquiti","Ruckus","Araknis","Luxul","Access Networks","Xfinity"],
  q:[{q:"Why ethernet if I have WiFi?",a:"Ethernet provides faster, more reliable, lower-latency connections. Smart TVs, cameras, and automation controllers perform better wired. It also reduces WiFi congestion."},{q:"What speed should my network support?",a:"We recommend Cat6a (10Gbps) minimum for future-proofing against growing bandwidth demands."},{q:"Can you organize my existing messy closet?",a:"Yes. We frequently upgrade and reorganize existing installations with enterprise solutions and proper rack infrastructure."}]}},

  {id:"ev-charger-installation",t:"EV Charger Installation",sh:"ICC-certified Level 2 charger installation with up to $2,500 in ComEd rebates. Tesla Wall Connector, ChargePoint, and load management solutions for North Shore homes.",kw:"EV Charger Installation North Shore IL",
  f:{i:"Power your EV from home with a professionally installed Level 2 charging station. As an ICC-certified contractor, Abvolt handles everything from panel assessment to final installation — and we help you claim up to $2,500 in ComEd rebates to offset the cost of equipment and installation.",
  s:[{h:"Level 2 Charger Installation",p:"240V circuits delivering 7-19kW — fully charging most EVs overnight. We install Tesla Wall Connectors, ChargePoint Home Flex, and other leading chargers with thorough panel assessment."},{h:"ComEd EV Rebate Program — Up to $2,500",p:"ComEd residential customers who install a Level 2 EV charger on or after January 1, 2026 can claim up to $2,500 to cover the cost of equipment and installation. As an ICC-certified installer, Abvolt ensures your installation meets all program requirements so you can maximize your rebate. We handle the paperwork and guide you through the entire rebate process — making it as simple as possible to save on your charger investment."},{h:"Electrical Panel Assessment & Permitting",p:"Many older homes need upgrades for EV charging. We assess capacity, recommend upgrades, and handle all permitting and inspection. Load management can sometimes avoid costly panel upgrades. Our ICC certification means your installation meets the highest code compliance standards."},{h:"Smart Charging & Load Management",p:"Optimize charging times for lowest rates, manage power sharing between multiple EVs, and integrate with solar panel systems."},{h:"Multi-Vehicle Solutions",p:"Power-sharing solutions for households with multiple EVs. Whether single-car or multi-bay garage, we configure the optimal layout."}],
  b:["Tesla","ChargePoint","Grizzl-E","JuiceBox","Wallbox"],
  q:[{q:"How do I get the $2,500 ComEd EV charger rebate?",a:"ComEd customers who install a Level 2 charger on or after January 1, 2026 are eligible for up to $2,500 covering equipment and installation costs. As your ICC-certified installer, we ensure your project qualifies and help you submit the rebate application."},{q:"What does ICC-certified mean for my installation?",a:"ICC (International Code Council) certification means our installers meet the highest national standards for building and electrical code compliance. It ensures your EV charger installation is safe, code-compliant, and qualifies for utility rebate programs like ComEd's."},{q:"How long does installation take?",a:"Most installations complete in 4-8 hours. Panel upgrades may take 1-2 days. We handle all permitting and inspections."},{q:"Do I need a panel upgrade?",a:"Not always. Many homes have sufficient capacity. We assess and explore load management solutions first."},{q:"Will it significantly increase my electric bill?",a:"Expect $30-60 per month. Smart chargers charge during off-peak hours for lowest cost."},{q:"Is ComEd rebate funding limited?",a:"Yes — ComEd has allocated approximately $70 million across all EV rebate programs for 2026, and residential rebates are available on a first-come, first-served basis. We recommend scheduling your installation soon to secure your rebate."}]}},

  {id:"commercial-automation",t:"Commercial Automation",sh:"Conference room AV, office automation, commercial security, and building management for professional environments.",kw:"Commercial Automation Contractor Illinois",
  f:{i:"Bring smart automation to your commercial space — from executive offices and conference rooms to retail and multi-unit residential buildings.",
  s:[{h:"Conference Room AV",p:"One-touch systems handling video conferencing, presentations, audio, and lighting. Support for Zoom, Teams, and other platforms with professional cameras and displays."},{h:"Office-Wide Automation",p:"Automated lighting, climate optimization, motorized shades, and digital signage. Energy management reduces operating costs while maintaining comfort."},{h:"Commercial Security",p:"IP surveillance with analytics, badge readers, biometrics, visitor management. Full compliance with commercial codes and insurance requirements."},{h:"Multi-Dwelling Solutions",p:"Smart apartment buildings with unit-level automation, common area management, and centralized systems to attract premium tenants."}],
  b:["Crestron","Biamp","QSC","Shure","LG","Samsung","Verkada"],
  q:[{q:"Can you integrate with existing BMS?",a:"Yes. We work with BACnet, Modbus, and other protocols to integrate with your existing building management system."},{q:"Do you handle commercial permitting?",a:"Absolutely. We manage the entire process and coordinate all required inspections."},{q:"What's the ROI?",a:"Most projects achieve ROI within 2-4 years through energy savings, plus improved productivity and property value."}]}},

  {id:"data-center-services",t:"Data Center Services",sh:"Structured cabling, power distribution, cooling infrastructure, and rack buildouts for colocation and edge data centers.",kw:"Data Center Cabling Contractor Chicago IL",
  f:{i:"The digital economy runs on physical infrastructure. From hyperscale facilities to edge deployments, Abvolt delivers the precision low-voltage work that keeps data centers operational — structured cabling, power distribution, environmental monitoring, and access control at scale.",
  s:[{h:"Structured Cabling & Fiber Optics",p:"High-density Cat6a and single-mode/multi-mode fiber installations built to TIA-942 standards. We handle top-of-rack patching, cross-connects, backbone fiber trunks, and cable pathway management with meticulous labeling and documentation. Every run is certified and tested."},{h:"Cabinet & Rack Buildouts",p:"Complete rack deployments including PDU installation, cable management, blanking panels, and hot/cold aisle containment preparation. We configure cabinets to your specifications — from single racks to full row builds — with attention to airflow optimization and weight load distribution."},{h:"Power Distribution & Monitoring",p:"Installation of intelligent PDUs, busway tap-offs, remote power panels, and branch circuit monitoring. We integrate with DCIM platforms so your operations team has real-time visibility into power consumption, capacity, and redundancy status at every rack."},{h:"Environmental Monitoring & Security",p:"Sensor networks for temperature, humidity, water leak detection, and airflow monitoring at the rack level. Combined with biometric access control, IP camera surveillance, and cabinet-level locking systems to meet compliance requirements for SOC 2, HIPAA, and PCI DSS."}],
  b:["Panduit","Leviton","CommScope","Chatsworth Products","Vertiv","Raritan","APC"],
  q:[{q:"What standards do you build to?",a:"All work meets TIA-942 data center standards with BICSI-certified installers. We provide full test reports and as-built documentation."},{q:"Do you work in live environments?",a:"Yes. Our teams are experienced in hot-aisle/cold-aisle environments with active equipment. We follow strict change management protocols and coordinate with your NOC."},{q:"Can you handle large-scale deployments?",a:"Absolutely. We scale from single-rack edge deployments to multi-row buildouts. Our structured approach means consistent quality whether it's 5 racks or 500."},{q:"Do you provide ongoing maintenance?",a:"We offer maintenance contracts including scheduled cable audits, thermal imaging, and infrastructure health reports to prevent issues before they impact uptime."}]}},

  {id:"fiber-optic-solutions",t:"Fiber Optic Solutions",sh:"Single-mode and multi-mode fiber optic design, installation, splicing, testing, and certification for residential, commercial, and campus environments.",kw:"Fiber Optic Installation Contractor Chicago IL",
  f:{i:"Fiber optics is the backbone of modern connectivity. Whether you need a fiber run between buildings on an estate, a campus backbone linking multiple structures, or high-density fiber for a data center, Abvolt designs and installs fiber optic infrastructure built for the speed demands of today and the bandwidth requirements of tomorrow.",
  s:[{h:"Fiber Optic Design & Installation",p:"We design complete fiber optic pathways — from single residential runs connecting a main house to a guest cottage, to multi-strand campus backbones linking dozens of buildings. Every installation includes proper innerduct, pull boxes, splice enclosures, and bend-radius-compliant routing. We work with both single-mode fiber for long-distance, high-bandwidth needs and multi-mode for shorter building-to-building or riser applications."},{h:"Fusion Splicing & Termination",p:"Our BICSI-certified technicians perform precision fusion splicing with insertion loss under 0.1 dB per splice. We terminate with LC, SC, ST, and MPO/MTP connectors depending on your application. Every termination is inspected with a fiber microscope and tested with an OTDR to verify performance end-to-end."},{h:"Testing, Certification & Documentation",p:"Every fiber strand is tested with calibrated OTDR (Optical Time-Domain Reflectometer) equipment to map the entire link — verifying splice loss, connector loss, and overall attenuation. You receive a complete certification report with test results, as-built drawings, and a fiber management database. This documentation is essential for warranty, compliance, and future capacity planning."},{h:"Residential & Estate Fiber",p:"North Shore estates with detached garages, pool houses, guest cottages, and carriage houses benefit enormously from fiber. A single fiber run delivers gigabit-plus speeds across your property without the signal degradation of long copper runs. We install discreetly with buried conduit or aerial pathways, maintaining the aesthetic integrity of your grounds."}],
  b:["Corning","CommScope","Panduit","AFL","Leviton","Belden"],
  q:[{q:"Why fiber instead of copper?",a:"Fiber carries data at the speed of light over much longer distances without signal loss. A Cat6a copper cable maxes out at 328 feet for 10Gbps. Fiber can carry 100Gbps+ over miles. For any run over 300 feet, fiber is the right choice."},{q:"Is fiber optic fragile?",a:"Modern fiber cable is more durable than most people think. Armored and ruggedized options handle direct burial, aerial, and high-traffic environments. Once installed in proper conduit, fiber lasts 25+ years."},{q:"Can you add fiber to an existing property?",a:"Yes. We install fiber via buried conduit, existing pathways, or aerial runs. For estates, we use directional boring to bury conduit without disturbing landscaping."},{q:"What speeds does fiber support?",a:"Current single-mode fiber supports 100Gbps+ and is theoretically capable of petabit speeds as transceiver technology evolves. It's the most future-proof cabling you can install."}]}},

  {id:"tv-mounting-installation",t:"TV Mounting & Installation",sh:"Professional flat-screen TV mounting, cable concealment, and soundbar integration for a clean, cinematic experience in any room.",kw:"TV Mounting Installation North Shore IL",
  f:{i:"A beautifully mounted television transforms a room — but only when it's done right. Abvolt provides professional TV mounting and installation services across Chicago's North Shore, combining secure structural mounting with meticulous cable concealment and full integration into your smart home ecosystem.",
  s:[{h:"Secure Wall Mounting",p:"Every mount begins with a structural assessment. We locate studs, verify wall composition, and select the correct mounting hardware for your TV's size and weight. Articulating, tilting, fixed, and recessed mounts are available depending on your viewing preferences and wall type. Our installations handle displays from 32 inches to 98 inches across drywall, brick, stone, and concrete."},{h:"Cable Concealment & In-Wall Routing",p:"Exposed cables ruin the look of a mounted TV. We route HDMI, power, and network cables inside the wall using code-compliant in-wall rated wiring and power solutions. The result is a completely clean wall with zero visible wires — the way a luxury home should look."},{h:"Soundbar & Audio Integration",p:"A mounted TV deserves matching audio. We install and calibrate soundbars, integrate with your whole-home audio system, and run optical or HDMI-ARC connections through the wall. For dedicated viewing rooms, we pair your display with surround sound for a full cinematic experience."},{h:"Smart Home Integration & Calibration",p:"Your new TV integrates seamlessly into your Control4, Crestron, or Savant automation system. One-touch scenes dim the lights, lower the shades, and switch inputs automatically. We professionally calibrate picture settings for your room's lighting conditions, ensuring accurate color and optimal contrast."}],
  b:["Samsung","LG","Sony","Sanus","MantelMount","Sonos"],
  q:[{q:"Can you mount a TV on a stone or brick fireplace?",a:"Yes. We use masonry anchors and specialized hardware designed for stone, brick, and concrete surfaces. We also install above-fireplace articulating mounts that pull down for comfortable viewing angles."},{q:"How do you hide the cables?",a:"We route all cables inside the wall using code-compliant in-wall rated HDMI and power solutions. For stone or brick walls where in-wall routing isn't possible, we use paintable cable raceways for the cleanest possible look."},{q:"Do you handle the TV setup and calibration too?",a:"Absolutely. We unbox, mount, connect all sources, configure streaming apps, calibrate picture settings for your room, and integrate with your smart home system. You're watching TV the same day."},{q:"What size TVs can you mount?",a:"We mount displays from 32 to 98 inches. For larger displays like the Samsung 98-inch or LG 97-inch, we use reinforced mounting systems rated well above the TV's weight."}]}}
];

const AREAS = [
  {id:"lake-forest-il",n:"Lake Forest",tl:"Where Timeless Elegance Meets Modern Intelligence",d:"Lake Forest is renowned for its historic estates, tree-lined streets, and some of the most valuable real estate in Illinois. With homes often exceeding 8,000 sq ft, Lake Forest properties demand smart home systems that match their architectural grandeur.",pop:"19,497",inc:"$189,000+",hm:"$816,000+"},
  {id:"winnetka-il",n:"Winnetka",tl:"Sophisticated Technology for Winnetka's Finest",d:"Winnetka consistently ranks among America's wealthiest communities. The village's mix of grand historic homes and new construction provides ideal opportunities for both retrofit and ground-up smart home design.",pop:"12,579",inc:"$250,000+",hm:"$1.1M+"},
  {id:"highland-park-il",n:"Highland Park",tl:"Innovative Home Technology for Highland Park",d:"Highland Park blends cultural sophistication with residential luxury. From Ravinia-area estates to modern lakefront builds, our team serves with comprehensive smart home, security, and entertainment systems.",pop:"30,176",inc:"$160,000+",hm:"$650K+"},
  {id:"glencoe-il",n:"Glencoe",tl:"Discreet Luxury Technology for Glencoe Homes",d:"Glencoe's intimate village character attracts homeowners who value privacy and refined living. Our solutions emphasize discreet integration — hidden speakers, invisible controls, and unobtrusive security.",pop:"8,934",inc:"$220,000+",hm:"$900K+"},
  {id:"lake-bluff-il",n:"Lake Bluff",tl:"Our Hometown — Where Technology Meets Community",d:"Lake Bluff is home to Abvolt Automation's headquarters. We're proud to serve our local community with premium smart home services. As your neighbors, we're always just minutes away.",pop:"5,722",inc:"$140,000+",hm:"$520K+"},
  {id:"northbrook-il",n:"Northbrook",tl:"Smart Home Solutions for Northbrook Families",d:"Northbrook offers an appealing blend of suburban comfort and North Shore prestige. We design systems that grow with your needs, from focused security to comprehensive whole-home automation.",pop:"33,170",inc:"$120,000+",hm:"$490K+"},
  {id:"glenview-il",n:"Glenview",tl:"Advanced Home Technology for Glenview",d:"Glenview's growing community values modern convenience and security. Whether in The Glen or established neighborhoods, we deliver custom technology that enhances daily life.",pop:"47,218",inc:"$115,000+",hm:"$480K+"}
];

const BLOGS = [
  {id:"data-center-infrastructure-guide",t:"Why Data Center Infrastructure Is the Next Frontier for Low-Voltage Contractors",tg:"Data Centers",dt:"February 28, 2026",ex:"The explosion of AI, cloud computing, and edge deployments is creating unprecedented demand for skilled low-voltage contractors in data center construction and maintenance.",bd:[
    {y:"p",x:"The numbers are staggering. Global data center construction spending is projected to exceed $250 billion annually by 2028, driven by the insatiable demands of artificial intelligence, cloud computing, and the Internet of Things. Behind every ChatGPT query, every streaming movie, every autonomous vehicle decision is a physical data center — and those facilities need the same precision low-voltage work that powers luxury smart homes."},
    {y:"p",x:"At Abvolt, we recognized this shift early. The same structured cabling expertise, the same attention to cable management and labeling, the same understanding of network architecture that we bring to North Shore estates translates directly to data center environments. The scale changes. The standards tighten. But the craft is the same."},
    {y:"h",x:"The AI Boom Is a Construction Boom"},
    {y:"p",x:"Every major tech company is racing to build AI training and inference infrastructure. These facilities require massive fiber optic backbone installations, thousands of Cat6a drops, intelligent power distribution, and sophisticated environmental monitoring. A single hyperscale data center can contain over 50,000 servers — each one needing power, connectivity, and cooling."},
    {y:"p",x:"But it's not just hyperscale. Edge data centers — smaller facilities positioned closer to end users — are proliferating in suburban and urban locations. These 1-5 megawatt facilities need the same quality of cabling and infrastructure as their larger counterparts, just at a more manageable scale."},
    {y:"h",x:"What Data Center Work Actually Looks Like"},
    {y:"p",x:"Structured cabling in a data center environment means single-mode and multi-mode fiber trunks connecting rows of cabinets, high-density Cat6a patching within racks, and meticulous cable pathway management that maintains proper airflow in hot-aisle/cold-aisle configurations. Every cable is labeled, tested, certified, and documented in a cable management database."},
    {y:"p",x:"Power distribution involves installing intelligent PDUs in every cabinet, connecting to overhead busway or under-floor power feeds, and integrating remote monitoring so operations teams can track power draw at the circuit level. Environmental monitoring means deploying sensor networks for temperature, humidity, and water leak detection — the same sensors we use in luxury wine cellars, applied at industrial scale."},
    {y:"h",x:"Standards and Compliance Matter"},
    {y:"p",x:"Data center work is governed by TIA-942, the Telecommunications Infrastructure Standard for Data Centers. This covers everything from cable pathway design to grounding and bonding requirements. Compliance with SOC 2, HIPAA, and PCI DSS adds layers of physical security requirements including biometric access control, camera surveillance, and cabinet-level locking — all systems we install and integrate daily."},
    {y:"h",x:"Why Smart Home Contractors Are Uniquely Positioned"},
    {y:"p",x:"The skills gap in data center construction is real. Traditional electrical contractors understand high-voltage distribution but often lack structured cabling expertise. IT consultants understand network design but can't pull cable or terminate fiber. Low-voltage integrators like Abvolt sit at the intersection — we understand both the physical infrastructure and the technology it supports."},
    {y:"p",x:"Our experience designing resilient, redundant systems for homes where downtime is unacceptable translates to environments where uptime is measured in nines — 99.99% and beyond."},
    {y:"h",x:"The Opportunity Ahead"},
    {y:"p",x:"The data center construction pipeline shows no signs of slowing. The convergence of AI workloads, 5G edge computing, and the migration from on-premises IT to cloud and colocation means more facilities need to be built, expanded, and maintained. For contractors with the right skills, certifications, and attention to detail, this represents a significant growth opportunity."},
    {y:"p",x:"Abvolt is expanding our data center services division to meet this demand. Whether you're a colocation provider building out a new facility, an enterprise expanding your on-premises infrastructure, or a developer constructing purpose-built data center space, our team brings the same precision and quality that defines our residential work — at the scale your project demands."},
    {y:"q",x:[{q:"Does Abvolt work on data center projects?",a:"Yes. We provide structured cabling, fiber installation, rack buildouts, power distribution, and environmental monitoring for data centers of all sizes."},{q:"What certifications do your installers hold?",a:"Our team includes BICSI-certified technicians and OSHA-trained installers experienced in mission-critical environments."},{q:"Where do you serve for data center work?",a:"Our data center services cover the greater Chicagoland area and can extend to regional projects across the Midwest."}]},
  ]},
  {id:"smart-home-guide-lake-forest",t:"The Complete Guide to Smart Home Automation for Lake Forest Luxury Homes",tg:"Smart Home",dt:"February 20, 2026",ex:"Discover how Lake Forest homeowners are transforming their estates with intelligent automation that delivers convenience, security, and energy savings.",bd:[
    {y:"p",x:"Lake Forest, Illinois is home to some of the most magnificent residential properties on Chicago's North Shore. With sprawling estates and homes blending historic architecture with modern expectations, homeowners face unique challenges and opportunities with smart home automation."},
    {y:"p",x:"The demand for home automation in Lake Forest has surged. Homeowners who once viewed smart technology as a novelty now consider it essential infrastructure — as fundamental to a luxury home as quality plumbing or a well-designed kitchen."},
    {y:"h",x:"Why Lake Forest Homes Are Ideal for Smart Automation"},
    {y:"p",x:"Large square footage demands centralized control — nobody wants to walk through a 12,000 sq ft home to check the garage door. Multi-zone climate, distributed audio, and comprehensive security become practical necessities."},
    {y:"h",x:"Essential Systems for Lake Forest Smart Homes"},
    {y:"p",x:"The most impactful systems include lighting control with motorized shades, comprehensive security with IP surveillance, whole-home audio, and centralized climate management."},
    {y:"h",x:"Choosing the Right Automation Platform"},
    {y:"p",x:"For Lake Forest estates, we recommend Control4, Crestron, or Savant. Control4 offers excellent value and ecosystem. Crestron provides the most customizable enterprise-grade solution. Savant excels in Apple integration and UI design."},
    {y:"h",x:"The Investment: What to Expect"},
    {y:"p",x:"Smart home automation pays dividends in convenience, energy savings, property value, and insurance reductions. Lake Forest homeowners consistently report automation as one of the best investments in their properties."},
    {y:"q",x:[{q:"What is the first system most homeowners install?",a:"Lighting control — it delivers immediate daily impact and forms the foundation for expanding into full automation."},{q:"Can I start small and expand later?",a:"Absolutely. We design every system with scalability in mind."},{q:"Does automation increase property value?",a:"Yes. Studies show 3-5% value increases. In the luxury market, buyers increasingly expect integrated technology."}]},
  ]},
  {id:"security-systems-luxury-homes",t:"Best Security Systems for High-End Homes on the North Shore",tg:"Security",dt:"February 15, 2026",ex:"Why luxury North Shore properties need more than a basic alarm — and how professional-grade systems protect what matters most.",bd:[
    {y:"p",x:"The North Shore communities of Lake Forest, Winnetka, Highland Park, and Glencoe are among the most affluent in the country. The high-value properties demand security systems far beyond basic alarm panels and door sensors."},
    {y:"h",x:"Why Luxury Homes Need Professional Security"},
    {y:"p",x:"A 10,000+ sq ft estate with multiple entry points, detached structures, and valuable contents requires an entirely different approach."},
    {y:"h",x:"IP Cameras vs. Traditional CCTV"},
    {y:"p",x:"Modern IP cameras offer 4K resolution, AI-powered analytics that distinguish people from animals, cloud-local hybrid recording, and dramatically fewer false alerts compared to legacy systems."},
    {y:"h",x:"Integrated Security Ecosystem"},
    {y:"p",x:"The most effective systems integrate cameras, access control, smart locks, intercoms, perimeter detection, and environmental sensors into one unified platform."},
    {y:"h",x:"Vacation Home Considerations"},
    {y:"p",x:"Remote monitoring, automated occupancy simulation, environmental sensors, and cellular backup connectivity are essential for protecting properties that sit unoccupied."},
    {y:"q",x:[{q:"How many cameras does a North Shore estate need?",a:"Most luxury properties require 8-16 cameras. We conduct a thorough site assessment for optimal placement."},{q:"Can cameras be hidden?",a:"Yes. We balance deterrent visibility with aesthetic preservation based on your preferences."},{q:"What happens during a power outage?",a:"UPS battery backup and cellular failover keep security fully operational for hours."}]},
  ]},
  {id:"structured-wiring-estates",t:"Why Every Large Estate Needs Structured Wiring in 2026",tg:"Networking",dt:"February 10, 2026",ex:"Structured cabling is the invisible backbone of every smart home. Here's why it matters more than ever for North Shore luxury properties.",bd:[
    {y:"p",x:"Beneath every intelligent home lies a carefully planned network of cables. Structured wiring determines whether your smart home operates flawlessly or frustratingly."},
    {y:"h",x:"The Problem with Wireless-Only Homes"},
    {y:"p",x:"WiFi has limitations in large homes with thick walls and 50+ smart devices competing for bandwidth. Security cameras, 8K TVs, and gaming all suffer on wireless-only connections."},
    {y:"h",x:"What Structured Wiring Includes"},
    {y:"p",x:"Cat6a ethernet (10Gbps) to every room, fiber optic runs, HDMI distribution, speaker wiring, security camera conduit, and access control wiring — all terminating in a centralized equipment rack."},
    {y:"h",x:"Future-Proofing Your Investment"},
    {y:"p",x:"Bandwidth demands double every two years. Cat6a supports 10Gbps — far exceeding current needs but essential as 8K video and AI features become mainstream."},
    {y:"q",x:[{q:"How much cabling does a luxury home need?",a:"A 5,000-10,000 sq ft home typically needs 30-60 ethernet runs to support all devices."},{q:"Can I see or hear the cables?",a:"No. Everything runs through walls and ceilings. Only elegant wall plates are visible."},{q:"Can you organize existing messy wiring?",a:"Yes. We frequently clean up existing installations, replacing consumer equipment with enterprise solutions."}]},
  ]},
  {id:"ev-charger-north-shore",t:"EV Charger Installation in North Shore Illinois: What Homeowners Need to Know in 2026",tg:"EV Charging",dt:"February 5, 2026",ex:"Everything North Shore homeowners need to know about installing a Level 2 EV charger — including how to claim up to $2,500 in ComEd rebates through an ICC-certified installer.",bd:[
    {y:"p",x:"EV adoption on Chicago's North Shore has accelerated rapidly. Home charging has transitioned from novelty to necessity for luxury EV owners. And in 2026, ComEd is making it even more affordable — residential customers can claim up to $2,500 in rebates for Level 2 charger installations."},
    {y:"h",x:"Level 1 vs. Level 2: Why Level 2 Matters"},
    {y:"p",x:"Level 1 adds only 3-5 miles per hour. Level 2 delivers 25-50 miles per hour, fully charging most EVs overnight. For daily drivers, Level 2 is the only practical option."},
    {y:"h",x:"ComEd's 2026 EV Rebate: Up to $2,500 for Homeowners"},
    {y:"p",x:"ComEd announced approximately $70 million in EV rebates for 2026. For residential customers, anyone who installs a Level 2 charger on or after January 1, 2026 can claim up to $2,500 to cover equipment and installation costs. The program is first-come, first-served. Working with an ICC-certified installer like Abvolt ensures your installation meets all program requirements."},
    {y:"h",x:"Choosing the Right Charger"},
    {y:"p",x:"Tesla Wall Connector is the gold standard for Tesla owners. ChargePoint Home Flex offers universal J1772 compatibility. For multi-EV households, universal chargers serve any vehicle."},
    {y:"h",x:"Electrical Panel Assessment"},
    {y:"p",x:"A Level 2 charger requires a 40-60 amp dedicated circuit. Many older homes need panel upgrades, but load management solutions can sometimes avoid costly replacements."},
    {y:"q",x:[{q:"How do I claim the ComEd $2,500 rebate?",a:"Install a Level 2 charger through an ICC-certified installer like Abvolt, then submit your rebate application to ComEd. We guide you through the entire process."},{q:"How long does installation take?",a:"Most installations complete in 4-8 hours. Panel upgrades may take 1-2 days."},{q:"Can I charge two EVs at once?",a:"Yes. Power-sharing solutions intelligently distribute available power between multiple chargers."},{q:"Will it increase my electric bill much?",a:"Expect $30-60/month. Smart chargers charge during off-peak hours for lowest cost."}]},
  ]},
  {id:"lighting-automation-estates",t:"Lighting Automation for Large Estates: A Complete Guide",tg:"Lighting",dt:"January 28, 2026",ex:"How automated lighting transforms luxury living — energy savings, security, and effortless ambiance in every room.",bd:[
    {y:"p",x:"Lighting is arguably the most transformative element of home automation. It affects mood, productivity, sleep quality, security, and energy consumption."},
    {y:"h",x:"Beyond Basic Dimming"},
    {y:"p",x:"Tunable white technology adjusts color temperature throughout the day. Full-spectrum color allows dramatic accent lighting. Automated scenes transform your home's atmosphere with a single command."},
    {y:"h",x:"Motorized Shades: The Perfect Complement"},
    {y:"p",x:"Morning routines begin with shades rising and lights brightening. During the day, sensors adjust shades to maintain ambient light. At dusk, shades lower while evening scenes activate."},
    {y:"h",x:"Energy Savings"},
    {y:"p",x:"Lighting automation reduces consumption 20-30%. Smart climate control cuts heating/cooling costs 10-15%. For large estates, these savings compound substantially."},
    {y:"h",x:"Quality of Life"},
    {y:"p",x:"The most significant ROI is daily improvement — lights that adjust automatically, music that follows you, security that monitors while you sleep, climate that's always comfortable."},
    {y:"q",x:[{q:"Does automation increase resale value?",a:"Yes. 3-5% increases per NAR data. Homes without automation are increasingly perceived as dated."},{q:"What system offers best ROI?",a:"Lighting and security deliver fastest ROI through energy savings and insurance reductions."},{q:"How long do systems last?",a:"Quality hardware lasts 10-15+ years with regular software updates."}]},
  ]},
  {id:"whole-home-audio-design",t:"Whole-Home Audio: Designing the Perfect Multi-Room Sound System",tg:"Audio",dt:"January 12, 2026",ex:"From invisible speakers to outdoor entertainment — designing multi-room audio for North Shore luxury homes.",bd:[
    {y:"p",x:"Imagine your playlist following you room to room, jazz in the master suite while kids enjoy music downstairs, and crystal-clear outdoor sound — all invisible and effortless."},
    {y:"h",x:"Understanding Multi-Zone Audio"},
    {y:"p",x:"Independent zones play different sources simultaneously or group together. Typical zones: kitchen, master suite, office, bedrooms, bathrooms, patio, pool."},
    {y:"h",x:"Speaker Technology: Invisible is Beautiful"},
    {y:"p",x:"In-ceiling and in-wall speakers deliver exceptional performance while completely hidden. Some can be mudded and painted over, disappearing entirely."},
    {y:"h",x:"Outdoor Audio Done Right"},
    {y:"p",x:"Landscape speakers look like rocks or planters. Subterranean subwoofers deliver deep bass invisibly. Weather-resistant for Chicago's extreme seasons."},
    {y:"q",x:[{q:"Built-in vs Bluetooth speakers?",a:"Built-in provides consistent, high-quality sound throughout your home without batteries or moving speakers."},{q:"Can I use vinyl or CDs?",a:"Yes. We integrate turntables and disc players as sources distributed to any zone."},{q:"Best system for outdoors?",a:"Coastal Source and Sonance landscape speakers — specifically engineered for outdoor use and extreme weather."}]},
  ]},
  {id:"home-theater-north-shore",t:"How to Choose the Right Home Theater for Your North Shore Home",tg:"Home Theater",dt:"January 5, 2026",ex:"From media rooms to dedicated cinemas — designing the perfect home theater for North Shore luxury properties.",bd:[
    {y:"p",x:"A well-designed home theater is one of the most enjoyable investments. The technology choices determine whether you get a cinematic experience or an expensive disappointment."},
    {y:"h",x:"Media Room vs. Dedicated Theater"},
    {y:"p",x:"A media room is multipurpose with great AV. A dedicated theater is purpose-built with light control, acoustic treatment, tiered seating, and reference-grade equipment. Many North Shore homes include both."},
    {y:"h",x:"Audio: The Most Important Investment"},
    {y:"p",x:"Dolby Atmos with overhead channels creates three-dimensional sound. A well-designed 7.1.4 system with proper acoustics surpasses most commercial cinemas."},
    {y:"h",x:"Acoustic Treatment"},
    {y:"p",x:"Untreated rooms create standing waves and frequency anomalies no equipment can overcome. Professional acoustic design with absorption, diffusion, and bass trapping is transformative."},
    {y:"q",x:[{q:"What size room do I need?",a:"Ideally 15'x20' for two rows, but excellent single-row theaters work in 12'x15' spaces."},{q:"Can I watch regular TV?",a:"Yes. Modern theaters switch seamlessly between cable, streaming, gaming, and disc playback."},{q:"How do I sound-isolate from the house?",a:"Decoupled walls, isolated ceilings, solid-core doors with seals, and HVAC isolation."}]},
  ]},
  {id:"access-control-luxury",t:"Access Control for Luxury Properties: Beyond Smart Locks",tg:"Security",dt:"December 28, 2025",ex:"Modern access control goes far beyond doors. Integrated systems protect North Shore luxury properties comprehensively.",bd:[
    {y:"p",x:"Security begins at the perimeter. Comprehensive access control encompasses video verification, automated gates, biometrics, visitor management, and deep automation integration."},
    {y:"h",x:"Video Intercom: See Before You Open"},
    {y:"p",x:"HD video and two-way audio at every entry. See visitors on your phone, touchscreen, or any TV. Speak, unlock remotely, or ignore — from anywhere in the world."},
    {y:"h",x:"Managing Household Staff Access"},
    {y:"p",x:"Create individual profiles with specific permissions — certain doors, times, and days. Every entry logged with automation responses like zone-specific disarming."},
    {y:"h",x:"Integration with Home Automation"},
    {y:"p",x:"When you unlock the front door: lights activate, alarm disarms, playlist starts, thermostat adjusts. When the last person leaves: system arms, lights off, temperature adjusts."},
    {y:"q",x:[{q:"Are smart locks safe enough?",a:"Modern smart locks use AES encryption and meet commercial standards. Combined with video verification, they exceed traditional lock security."},{q:"What if power goes out?",a:"Battery backup lasts 6-12 months. Physical key override always available."},{q:"Can I see who entered my home?",a:"Every event logged with timestamp, ID, and associated camera footage."}]},
  ]},
  {id:"pre-wiring-builders-checklist",t:"New Construction Smart Home Pre-Wiring: The Builder's Checklist",tg:"New Build",dt:"December 20, 2025",ex:"The essential pre-wiring checklist for builders and homeowners planning technology in new North Shore construction.",bd:[
    {y:"p",x:"The most important decision in building a smart home is involving your integrator before the first wall goes up. Pre-wiring during construction costs a fraction of retrofit."},
    {y:"h",x:"When to Involve Your Integrator"},
    {y:"p",x:"During the architectural design phase — before blueprints are finalized. This allows proper planning for equipment closets, wire pathways, conduit, outlets, and structural considerations."},
    {y:"h",x:"The Essential Pre-Wire Checklist"},
    {y:"p",x:"Cat6a to every room, fiber for long runs, HDMI conduit, speaker wire everywhere, security camera conduit, access control wiring, shade wiring at every window, and thermostat wire for zone HVAC."},
    {y:"h",x:"Cost Savings of Pre-Wiring"},
    {y:"p",x:"Pre-wiring costs 40-60% less than retrofit. Beyond savings, pre-wired systems perform better with optimal cable routes and ideal component placement."},
    {y:"q",x:[{q:"How early should I contact an integrator?",a:"During the design phase before blueprints are finalized. Earlier involvement means better planning."},{q:"Can my electrician handle smart home wiring?",a:"Electricians handle high-voltage. Low-voltage (data, audio, video, automation) requires specialized knowledge. We work alongside your electrician."},{q:"What does pre-wiring cost?",a:"Typically adds 1-3% to building costs — a fraction of what retrofit would cost later."}]},
  ]},
  {id:"comed-ev-rebate-2026-guide",t:"ComEd's $2,500 EV Charger Rebate for 2026: Complete Guide for North Shore Homeowners",tg:"EV Charging",dt:"March 18, 2026",ex:"ComEd is offering up to $2,500 in rebates for residential Level 2 EV charger installations in 2026. Here's how North Shore homeowners can claim the full amount through an ICC-certified installer.",bd:[
    {y:"p",x:"If you've been putting off installing a home EV charger, 2026 may be the best year to act. ComEd announced approximately $70 million in EV rebates for 2026, and residential customers who install a Level 2 charger can claim up to $2,500 to cover equipment and installation costs."},
    {y:"h",x:"What the ComEd Rebate Covers"},
    {y:"p",x:"The residential rebate applies to Level 2 EV charger installations completed on or after January 1, 2026. It covers both the cost of the charging equipment itself and the professional installation labor."},
    {y:"h",x:"Why ICC Certification Matters for Your Rebate"},
    {y:"p",x:"ICC certification ensures your installer meets the highest national standards for code compliance. When you work with an ICC-certified contractor like Abvolt, your installation is guaranteed to meet every requirement the rebate program demands."},
    {y:"h",x:"The Bigger Picture: $70 Million Across All Programs"},
    {y:"p",x:"ComEd's 2026 EV investment goes well beyond residential chargers. The Business and Public Sector program offers more than $35 million for fleet EV purchases. The Make-Ready Rebate Program has over $29 million for site preparation costs."},
    {y:"h",x:"How to Maximize Your Savings"},
    {y:"p",x:"Stack the ComEd rebate with other available incentives. The federal tax credit for EV charger installations (Section 30C) can provide up to $1,000 for residential installations. Between ComEd, federal credits, and manufacturer promotions, the net cost can drop below $1,000 in many cases."},
    {y:"h",x:"Don't Wait — Funding Is Limited"},
    {y:"p",x:"ComEd's residential rebate pool is finite. Once the allocated funding is claimed, the program closes for the year. The smartest move is to schedule your installation now, while the full $2,500 is still available."},
    {y:"q",x:[{q:"Am I eligible for the ComEd EV rebate?",a:"If your home is served by ComEd and you install a Level 2 charger on or after January 1, 2026, you're likely eligible."},{q:"Can I combine the ComEd rebate with federal tax credits?",a:"Yes. The federal Section 30C credit can provide up to $1,000 in addition to the ComEd rebate."},{q:"How long does it take to receive the rebate?",a:"Most homeowners receive their rebate within 4-8 weeks of submitting a complete application."}]},
  ]},
  {id:"tv-mounting-guide-north-shore",t:"Professional TV Mounting for North Shore Homes: Why DIY Isn't Worth the Risk",tg:"TV Mounting",dt:"March 15, 2026",ex:"From stone fireplaces to hidden cable routing — why professional TV mounting is essential for luxury homes, and what to expect from the installation process.",bd:[
    {y:"p",x:"A wall-mounted television is one of those upgrades that looks deceptively simple. But in practice — especially in the large, architecturally detailed homes across Lake Forest, Winnetka, Highland Park, and Glencoe — professional mounting makes the difference between a stunning result and a costly mistake."},
    {y:"h",x:"The Risks of DIY TV Mounting"},
    {y:"p",x:"The most common DIY failures: TVs mounted into drywall without proper stud anchoring, exposed cables running down the wall, incorrect viewing heights, and damaged plaster in historic homes."},
    {y:"h",x:"Stone, Brick, and Fireplace Mounting"},
    {y:"p",x:"Many North Shore homeowners want their TV above the fireplace, which often means mounting into stone, brick, or a custom mantle. This requires masonry anchors, specialized drill bits, and knowledge of what's behind the facade."},
    {y:"h",x:"Cable Concealment: The Non-Negotiable"},
    {y:"p",x:"In a luxury home, visible cables are unacceptable. We route HDMI, power, and network cables inside the wall using code-compliant in-wall rated wiring."},
    {y:"h",x:"Integration with Your Smart Home"},
    {y:"p",x:"A professionally mounted TV becomes part of your home's automation ecosystem. We integrate with Control4, Crestron, or Savant so your TV responds to scenes."},
    {y:"h",x:"What a Professional Installation Includes"},
    {y:"p",x:"Structural assessment, mount selection, in-wall cable routing, recessed outlet installation, professional picture calibration, smart home integration, and a clean workspace. Most installations complete in 2-4 hours."},
    {y:"q",x:[{q:"How much does professional TV mounting cost?",a:"Projects typically range from $300-$800 depending on wall type, cable concealment complexity, and integration requirements."},{q:"Can you mount a TV without drilling into the wall?",a:"For situations where wall mounting isn't possible, we offer premium floor stands and furniture-integrated solutions."},{q:"What size TV should I get for my room?",a:"The general rule is viewing distance divided by 1.5 equals ideal screen size. For a 10-foot viewing distance, a 75-80 inch TV is ideal."}]},
  ]},
  {id:"smart-intercom-access-control-2026",t:"Smart Intercoms & Access Control for Multi-Unit Properties: A ButterflyMX & Modern Solutions Guide",tg:"Access Control",dt:"March 10, 2026",ex:"How smart intercom systems like ButterflyMX are transforming property access for multi-unit buildings and luxury estates on the North Shore.",bd:[
    {y:"p",x:"The front door experience sets the tone for any property — whether it's a luxury condominium building, a gated estate, or a multi-tenant commercial space. Traditional intercom systems are being replaced by smartphone-based access platforms."},
    {y:"h",x:"The ButterflyMX Advantage"},
    {y:"p",x:"As an authorized ButterflyMX dealer and installer, Abvolt deploys their video intercom systems for properties across the North Shore. ButterflyMX replaces outdated telephone entry systems with a sleek hardware panel and smartphone app."},
    {y:"h",x:"Beyond Buzzers: What Modern Access Control Looks Like"},
    {y:"p",x:"A comprehensive access control system in 2026 includes video intercoms at every entry point, smartphone-based credentialing, integration with property management software, delivery and guest management, license plate recognition, and elevator access control."},
    {y:"h",x:"Residential Estates: The Gated Entry Experience"},
    {y:"p",x:"For single-family luxury estates, smart intercoms solve a different set of problems. Housekeepers, landscapers, and contractors each receive unique access credentials with time-of-day restrictions."},
    {y:"h",x:"Ring Integration for Comprehensive Coverage"},
    {y:"p",x:"As an authorized Ring installer, we integrate Ring video doorbells and cameras into broader access control ecosystems. Ring provides an accessible, user-friendly layer for secondary entry points."},
    {y:"h",x:"Installation Considerations"},
    {y:"p",x:"Smart intercom installation requires proper network infrastructure, reliable power, and weatherproof mounting. For retrofit projects, existing intercom wiring can sometimes be repurposed."},
    {y:"q",x:[{q:"Can ButterflyMX work with my existing building wiring?",a:"In many cases, yes. ButterflyMX uses IP-based communication, so as long as your building has network connectivity to entry points, it can replace legacy systems."},{q:"Is smartphone-based access secure?",a:"Yes. Modern platforms use encrypted communication, multi-factor authentication, and can instantly revoke credentials."},{q:"Can I manage access for short-term rentals?",a:"Absolutely. Platforms like ButterflyMX integrate with Airbnb and property management systems to automatically issue and expire access codes."}]},
  ]},
];

// ─────────────────────────────────────────────
// HTML TEMPLATE HELPERS
// ─────────────────────────────────────────────
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;'); }
function escJson(s) { return s.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n'); }

function navHtml(activePage) {
  const links = [
    {href:'/about', label:'About', key:'about'},
    {href:'/services', label:'Services', key:'services'},
    {href:'/service-areas', label:'Areas', key:'areas'},
    {href:'/blog', label:'Insights', key:'blog'},
  ];
  return `<nav>
  <div class="ni">
    <a href="/"><img src="/abvolt-logo.png" alt="Abvolt Automation — Smart Home & Low-Voltage Integration" class="nl"></a>
    <div class="nk">
      ${links.map(l => `<a href="${l.href}"${activePage===l.key?' class="ac"':''}>${l.label}</a>`).join('\n      ')}
      <a href="tel:2243698752" class="np">${PH}</a>
      <a href="/contact" class="nc">Free Consultation</a>
    </div>
  </div>
</nav>`;
}

function footerHtml() {
  return `<footer>
  <div class="ctr">
    <div class="ftg">
      <div class="ftb">
        <a href="/"><img src="/abvolt-logo.png" alt="Abvolt Automation" style="height:30px;margin-bottom:8px"></a>
        <p>Premier smart home automation and low-voltage integration for luxury residences on Chicago's North Shore.</p>
        <address>
          <strong style="color:#fff">Abvolt Automation</strong><br>
          ${AD[0]}<br>${AD[1]}<br>
          <a href="tel:2243698752">${PH}</a><br>
          <a href="mailto:${EM}">${EM}</a>
        </address>
      </div>
      <div><h4>Services</h4><ul>${SVCS.map(s=>`<li><a href="/services/${s.id}">${s.t}</a></li>`).join('')}</ul></div>
      <div><h4>Service Areas</h4><ul>${AREAS.map(a=>`<li><a href="/service-areas/${a.id}">${a.n}, IL</a></li>`).join('')}</ul></div>
      <div><h4>Company</h4><ul><li><a href="/about">About Abvolt</a></li><li><a href="/blog">Insights &amp; Blog</a></li><li><a href="/contact">Contact Us</a></li></ul></div>
    </div>
    <div class="ftbt">
      <span>&copy; 2025 Abvolt Automation. All rights reserved.</span>
      <span>Licensed &amp; Insured Low-Voltage Contractor — Lake Bluff, Illinois</span>
    </div>
  </div>
</footer>`;
}

function ctaHtml() {
  return `<section class="cts">
  <div class="ctr">
    <h2>READY TO TRANSFORM YOUR HOME?</h2>
    <p>Schedule a complimentary consultation with our North Shore smart home specialists.</p>
    <a href="tel:2243698752" class="cph">${PH}</a>
    <a class="btn ba" href="/contact">Book Your Consultation</a>
  </div>
</section>`;
}

function faqSchema(questions) {
  if (!questions || !questions.length) return '';
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [${questions.map(q => `
    {"@type": "Question", "name": "${escJson(q.q)}", "acceptedAnswer": {"@type": "Answer", "text": "${escJson(q.a)}"}}`).join(',')}
  ]
}
</script>`;
}

function localBusinessSchema() {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "${BASE}/#business",
  "name": "Abvolt Automation",
  "description": "Premier smart home automation, security, and low-voltage integration for luxury homes on Chicago's North Shore.",
  "url": "${BASE}",
  "telephone": "+1-224-369-8752",
  "email": "${EM}",
  "image": "${BASE}/og-image.jpg",
  "logo": "${BASE}/abvolt-logo.png",
  "priceRange": "$$$",
  "address": {"@type": "PostalAddress", "streetAddress": "${AD[0]}", "addressLocality": "Lake Bluff", "addressRegion": "IL", "postalCode": "60044", "addressCountry": "US"},
  "geo": {"@type": "GeoCoordinates", "latitude": 42.2839, "longitude": -87.8400},
  "openingHoursSpecification": [
    {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00"},
    {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "14:00"}
  ],
  "areaServed": [${AREAS.map(a=>`{"@type":"City","name":"${a.n}"}`).join(',')}],
  "sameAs": [
    "https://www.houzz.com/professionals/home-automation-and-home-media/abvolt-pfvwus-pf~1389595410",
    "https://www.yelp.com/biz/abvolt-gurnee",
    "https://www.bbb.org/us/il/gurnee/profile/home-automation/abvolt-llc-0654-1000127698",
    "https://wiredandsmart.com"
  ]
}
</script>`;
}

function breadcrumbSchema(items) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [${items.map((item, i) => `
    {"@type": "ListItem", "position": ${i+1}, "name": "${escJson(item.name)}", "item": "${BASE}${item.url}"}`).join(',')}
  ]
}
</script>`;
}

function articleSchema(post) {
  return `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${escJson(post.t)}",
  "description": "${escJson(post.ex)}",
  "datePublished": "${new Date(post.dt).toISOString().split('T')[0]}",
  "author": {"@type": "Organization", "name": "Abvolt Automation", "url": "${BASE}"},
  "publisher": {"@type": "Organization", "name": "Abvolt Automation", "logo": {"@type": "ImageObject", "url": "${BASE}/abvolt-logo.png"}},
  "mainEntityOfPage": "${BASE}/blog/${post.id}"
}
</script>`;
}

function headHtml({title, description, canonicalPath, extraSchema = ''}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="geo.region" content="US-IL">
<meta name="geo.placename" content="Lake Bluff, Illinois">
<link rel="canonical" href="${BASE}${canonicalPath}">
<meta property="og:type" content="website">
<meta property="og:url" content="${BASE}${canonicalPath}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${BASE}/og-image.jpg">
<meta property="og:locale" content="en_US">
<meta property="og:site_name" content="Abvolt Automation">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${BASE}/og-image.jpg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#FAFAF8">
${localBusinessSchema()}
${extraSchema}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Bebas+Neue&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
</head>`;
}

// ─────────────────────────────────────────────
// PAGE GENERATORS
// ─────────────────────────────────────────────

function generateServicePage(svc) {
  const d = svc.f;
  const allFaqs = d.q || [];
  const extraSchema = faqSchema(allFaqs) + '\n' + breadcrumbSchema([
    {name:'Home', url:'/'},
    {name:'Services', url:'/services'},
    {name:svc.t, url:`/services/${svc.id}`}
  ]);

  return `${headHtml({
    title: `${svc.t} | Abvolt Automation — North Shore IL`,
    description: d.i.substring(0, 155) + '...',
    canonicalPath: `/services/${svc.id}`,
    extraSchema
  })}
<body>
${navHtml('services')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">${esc(svc.kw)}</div>
      <h1>${esc(svc.t.toUpperCase())}</h1>
      <p>${esc(d.i.substring(0, 200))}...</p>
      <a class="btn ba" href="/contact">Schedule a Consultation</a>
    </div>
  </section>

  <section class="sec sd"><div class="ctr"><div class="sdg">
    <div class="sdm">
      <p style="font-size:1.05rem;line-height:1.85">${esc(d.i)}</p>
      ${d.s.map(x => `<h2>${esc(x.h)}</h2>\n      <p>${esc(x.p)}</p>`).join('\n      ')}

      <h2>Brands We Install</h2>
      <p style="color:var(--am);font-family:var(--fh);font-weight:500">${d.b.join(' &bull; ')}</p>

      <div style="background:var(--bk);border:1px solid rgba(181,181,188,.06);padding:2rem;margin:2rem 0;border-radius:3px">
        <h3 style="font-family:var(--fh);color:var(--am);font-size:1.1rem;margin:0 0 1.2rem;font-weight:600">Frequently Asked Questions</h3>
        ${allFaqs.map(f => `<div style="margin-bottom:1.2rem"><div class="fq">Q: ${esc(f.q)}</div><div class="fa">${esc(f.a)}</div></div>`).join('\n        ')}
      </div>

      <h2>Service Areas</h2>
      <p>We provide ${svc.t.toLowerCase()} throughout Chicago's North Shore:</p>
      <ul>${AREAS.map(a => `<li><a href="/service-areas/${a.id}">${a.n}, IL</a></li>`).join('')}</ul>
    </div>
    <div class="sds">
      <div class="ssc"><h4>All Services</h4>${SVCS.map(s => `<a href="/services/${s.id}"${s.id===svc.id?' style="color:var(--am);font-weight:600"':''}>${s.t}</a>`).join('')}</div>
      <div class="ssc" style="background:linear-gradient(135deg,rgba(220,162,74,.08),rgba(220,162,74,.02));border-color:rgba(220,162,74,.15)">
        <h4>Free Consultation</h4>
        <p style="font-size:.88rem;color:var(--txl);line-height:1.65;margin-bottom:1rem">Discover how ${svc.t.toLowerCase()} can transform your home.</p>
        <a href="tel:2243698752" style="display:block;color:var(--am);font-family:var(--fa);font-size:1.3rem;margin-bottom:.75rem">${PH}</a>
        <a class="btn ba" href="/contact" style="width:100%;text-align:center;display:block;padding:.7rem">Get Started</a>
      </div>
    </div>
  </div></div></section>

  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateAreaPage(area) {
  const extraSchema = breadcrumbSchema([
    {name:'Home', url:'/'},
    {name:'Service Areas', url:'/service-areas'},
    {name:area.n, url:`/service-areas/${area.id}`}
  ]);

  return `${headHtml({
    title: `Smart Home Automation in ${area.n}, IL | Abvolt Automation`,
    description: area.d.substring(0, 155) + '...',
    canonicalPath: `/service-areas/${area.id}`,
    extraSchema
  })}
<body>
${navHtml('areas')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">Smart Home Services in ${esc(area.n)}</div>
      <h1>${esc(area.tl.toUpperCase())}</h1>
      <p>${esc(area.d)}</p>
      <a class="btn ba" href="/contact">Schedule a Consultation in ${esc(area.n)}</a>
    </div>
  </section>

  <section class="sec sd"><div class="ctr">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:3rem">
      <div class="wc"><div class="wn">${area.pop}</div><div class="wl">Population</div></div>
      <div class="wc"><div class="wn">${area.inc}</div><div class="wl">Median Income</div></div>
      <div class="wc"><div class="wn">${area.hm}</div><div class="wl">Median Home Value</div></div>
    </div>

    <div class="stag">Our Services in ${esc(area.n)}</div>
    <h2 class="stit" style="font-size:clamp(1.8rem,3vw,2.5rem)">COMPLETE SMART HOME & LOW-VOLTAGE SOLUTIONS</h2>
    <div class="lf" style="margin-top:2rem">
      ${SVCS.map(s => `<a href="/services/${s.id}" class="lfc"><h3>${esc(s.t)}</h3><p>${esc(s.sh.substring(0,100))}...</p></a>`).join('\n      ')}
    </div>
  </div></section>

  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateBlogPost(post) {
  const allFaqs = [];
  post.bd.forEach(b => { if (b.y === 'q') allFaqs.push(...b.x); });
  const extraSchema = (allFaqs.length ? faqSchema(allFaqs) + '\n' : '') +
    articleSchema(post) + '\n' +
    breadcrumbSchema([
      {name:'Home', url:'/'},
      {name:'Blog', url:'/blog'},
      {name:post.t, url:`/blog/${post.id}`}
    ]);

  const bodyContent = post.bd.map(b => {
    if (b.y === 'p') return `<p>${esc(b.x)}</p>`;
    if (b.y === 'h') return `<h2>${esc(b.x)}</h2>`;
    if (b.y === 'q') return `<div class="fqb"><h3 style="font-family:var(--fh);color:var(--am);font-size:1.1rem;margin:0 0 1rem;font-weight:600">Frequently Asked Questions</h3>${b.x.map(f=>`<div><div class="fq">Q: ${esc(f.q)}</div><div class="fa">${esc(f.a)}</div></div>`).join('')}</div>`;
    return '';
  }).join('\n      ');

  const related = BLOGS.filter(b => b.id !== post.id).slice(0, 3);

  return `${headHtml({
    title: `${post.t} | Abvolt Automation`,
    description: post.ex,
    canonicalPath: `/blog/${post.id}`,
    extraSchema
  })}
<body>
${navHtml('blog')}
<main>
  <section class="arh">
    <div class="ctr">
      <div class="stag">${esc(post.tg)}</div>
      <h1>${esc(post.t.toUpperCase())}</h1>
      <div class="arm"><span>${esc(post.dt)}</span><span>By Abvolt Automation</span><span>8 min read</span></div>
    </div>
  </section>

  <section class="sec sd"><div class="ctr"><div class="arb">
      ${bodyContent}

      <div class="ctb">
        <h3 style="font-family:var(--fh);color:var(--am);font-size:1.2rem;font-weight:600;margin:0 0 .5rem">Ready to Get Started?</h3>
        <p>Schedule a complimentary consultation with our North Shore specialists.</p>
        <a class="btn ba" href="/contact">Book Consultation</a>
      </div>

      <h2>Related Articles</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem">
        ${related.map(b => `<a href="/blog/${b.id}" class="bc" style="background:var(--bk);text-decoration:none"><div class="bb"><div class="bd">${esc(b.dt)}</div><h3>${esc(b.t)}</h3><div class="br">Read &rarr;</div></div></a>`).join('\n        ')}
      </div>
  </div></div></section>
</main>
${footerHtml()}
</body>
</html>`;
}

function generateServicesIndex() {
  const extraSchema = breadcrumbSchema([
    {name:'Home', url:'/'},
    {name:'Services', url:'/services'}
  ]);
  return `${headHtml({
    title: 'Smart Home & Low-Voltage Services | Abvolt Automation',
    description: 'Comprehensive automation, security, lighting, audio, networking, and EV charger installation services for luxury North Shore residences. ICC certified.',
    canonicalPath: '/services',
    extraSchema
  })}
<body>
${navHtml('services')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">Our Expertise</div>
      <h1>SMART HOME &amp; LOW-VOLTAGE SERVICES</h1>
      <p>Comprehensive automation, security, and technology solutions engineered for luxury North Shore residences.</p>
      <a class="btn ba" href="/contact">Get a Custom Quote</a>
    </div>
  </section>
  <section class="sec sd"><div class="ctr">
    <div class="sg">
      ${SVCS.map(s => `<a href="/services/${s.id}" class="sc2" style="text-decoration:none"><h3>${esc(s.t)}</h3><p>${esc(s.sh)}</p><span class="sl">Learn More &rarr;</span></a>`).join('\n      ')}
    </div>
  </div></section>
  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateAreasIndex() {
  const extraSchema = breadcrumbSchema([
    {name:'Home', url:'/'},
    {name:'Service Areas', url:'/service-areas'}
  ]);
  return `${headHtml({
    title: "Service Areas — Chicago's North Shore | Abvolt Automation",
    description: "Abvolt Automation serves Lake Forest, Winnetka, Highland Park, Glencoe, Lake Bluff, Northbrook, and Glenview with premium smart home and low-voltage services.",
    canonicalPath: '/service-areas',
    extraSchema
  })}
<body>
${navHtml('areas')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">Service Areas</div>
      <h1>SERVING CHICAGO'S NORTH SHORE</h1>
      <p>Headquartered in Lake Bluff, IL — expert smart home and low-voltage services for the North Shore's finest communities.</p>
    </div>
  </section>
  <section class="sec sd"><div class="ctr">
    <div class="ag" style="grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
      ${AREAS.map(a => `<a href="/service-areas/${a.id}" class="ac2" style="text-decoration:none"><h3>${esc(a.n)}</h3><p style="font-size:.85rem;color:var(--txl);margin:.4rem 0;line-height:1.6">${esc(a.d.substring(0,100))}...</p><span>Learn More &rarr;</span></a>`).join('\n      ')}
    </div>
  </div></section>
  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateBlogIndex() {
  const extraSchema = breadcrumbSchema([
    {name:'Home', url:'/'},
    {name:'Blog', url:'/blog'}
  ]);
  return `${headHtml({
    title: 'Insights & Blog | Abvolt Automation',
    description: 'Expert articles on smart home automation, security systems, EV chargers, structured wiring, and technology for luxury North Shore homes.',
    canonicalPath: '/blog',
    extraSchema
  })}
<body>
${navHtml('blog')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">Insights &amp; Resources</div>
      <h1>THE ABVOLT BLOG</h1>
      <p>Expert perspectives on smart home technology, security, and luxury living on the North Shore.</p>
    </div>
  </section>
  <section class="sec sd"><div class="ctr">
    <div class="bg">
      ${BLOGS.map(b => `<a href="/blog/${b.id}" class="bc" style="text-decoration:none"><div class="bt"><img src="/blog-thumb.png" alt="Abvolt Automation" style="width:120px;height:auto;opacity:.7;object-fit:contain" loading="lazy"><div class="btg">${esc(b.tg)}</div></div><div class="bb"><div class="bd">${esc(b.dt)}</div><h3>${esc(b.t)}</h3><p>${esc(b.ex)}</p><div class="br">Read Article &rarr;</div></div></a>`).join('\n      ')}
    </div>
  </div></section>
  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateAboutPage() {
  return `${headHtml({
    title: "About Abvolt Automation | North Shore's Premier Smart Home Integrator",
    description: "ICC-certified, licensed & insured smart home automation and low-voltage contractor headquartered in Lake Bluff, IL. Serving Chicago's North Shore.",
    canonicalPath: '/about'
  })}
<body>
${navHtml('about')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">About Us</div>
      <h1>THE ABVOLT STORY</h1>
      <p>Built on precision, driven by innovation, committed to delivering the most sophisticated smart home and low-voltage solutions on Chicago's North Shore.</p>
    </div>
  </section>
  <section class="sec sd"><div class="ctr">
    <div class="abg">
      <div class="abt">
        <h2>Our Mission</h2>
        <p>Abvolt Automation exists to bring the highest caliber of smart home technology and low-voltage integration to North Shore homeowners who refuse to compromise on quality. We believe every home deserves systems that are as reliable as they are intelligent, as beautiful as they are functional.</p>
        <h2>Our Approach</h2>
        <p>We take a consultative, design-driven approach to every project. Before recommending any technology, we invest time understanding how you live, what matters to your family, and what your property demands. The result is a custom-engineered system that feels intuitive from day one.</p>
        <h2>Our Team</h2>
        <p>Our team of certified integrators, designers, and engineers brings deep expertise across every low-voltage discipline. We hold manufacturer certifications from Control4, Lutron, Crestron, and other premium brands, ensuring every installation meets the highest standards.</p>
      </div>
    </div>
    <div class="vg">
      <div class="vc"><h3>Precision</h3><p>Every wire, every connection, every line of programming reflects our commitment to flawless execution.</p></div>
      <div class="vc"><h3>Reliability</h3><p>We build systems that perform day after day, year after year. Our maintenance plans keep everything running perfectly.</p></div>
      <div class="vc"><h3>Relationship</h3><p>We're your neighbors. Headquartered in Lake Bluff, we're invested in the communities we serve for the long term.</p></div>
    </div>
  </div></section>
  ${ctaHtml()}
</main>
${footerHtml()}
</body>
</html>`;
}

function generateContactPage() {
  return `${headHtml({
    title: 'Contact Us — Free Consultation | Abvolt Automation',
    description: "Schedule a complimentary smart home consultation with Abvolt Automation. Call (224) 369-8752 or request a quote online. Serving Chicago's North Shore.",
    canonicalPath: '/contact'
  })}
<body>
${navHtml('contact')}
<main>
  <section class="svh cbg"><div class="hbg"></div>
    <div class="ctr" style="position:relative;z-index:2">
      <div class="stag">Get In Touch</div>
      <h1>START YOUR PROJECT</h1>
      <p>Schedule a complimentary consultation with our North Shore smart home specialists.</p>
    </div>
  </section>
  <section class="sec sd"><div class="ctr"><div class="cog">
    <div>
      <div class="coi"><div><h4>Telephone</h4><p><a href="tel:2243698752" style="color:var(--am)">${PH}</a></p></div></div>
      <div class="coi"><div><h4>Email</h4><p><a href="mailto:${EM}" style="color:var(--am)">${EM}</a></p></div></div>
      <div class="coi"><div><h4>Location</h4><p>${AD[0]}<br>${AD[1]}</p></div></div>
      <div class="coi"><div><h4>Hours</h4><p>Mon&ndash;Fri: 8:00 AM &ndash; 6:00 PM<br>Sat: By Appointment<br>Sun: Closed</p></div></div>
    </div>
    <div class="cof">
      <h3>Request a Consultation</h3>
      <form action="https://formspree.io/f/mgoljkgb" method="POST">
        <div class="fr"><div class="fg"><label for="name">Name *</label><input type="text" id="name" name="name" placeholder="Your full name" required></div><div class="fg"><label for="email">Email *</label><input type="email" id="email" name="email" placeholder="you@email.com" required></div></div>
        <div class="fr"><div class="fg"><label for="phone">Phone</label><input type="tel" id="phone" name="phone" placeholder="(555) 123-4567"></div><div class="fg"><label for="service">Service Interest</label><select id="service" name="service"><option value="">Select a service...</option>${SVCS.map(s=>`<option value="${esc(s.t)}">${esc(s.t)}</option>`).join('')}</select></div></div>
        <div class="fg"><label for="location">Property Location</label><select id="location" name="location"><option value="">Select your area...</option>${AREAS.map(a=>`<option value="${esc(a.n)}, IL">${esc(a.n)}, IL</option>`).join('')}</select></div>
        <div class="fg"><label for="message">Tell Us About Your Project</label><textarea id="message" name="message" placeholder="Describe your project goals, property details, or any questions..."></textarea></div>
        <input type="hidden" name="_subject" value="New Inquiry — Abvolt Website">
        <button type="submit" class="btn ba" style="width:100%">Send Inquiry</button>
      </form>
    </div>
  </div></div></section>
</main>
${footerHtml()}
</body>
</html>`;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    {loc: '/', priority: '1.0', freq: 'monthly'},
    {loc: '/services', priority: '0.9', freq: 'monthly'},
    {loc: '/service-areas', priority: '0.8', freq: 'monthly'},
    {loc: '/blog', priority: '0.8', freq: 'weekly'},
    {loc: '/about', priority: '0.7', freq: 'monthly'},
    {loc: '/contact', priority: '0.7', freq: 'monthly'},
    {loc: '/security-system-installation', priority: '0.9', freq: 'monthly'},
    ...SVCS.map(s => ({loc: `/services/${s.id}`, priority: '0.9', freq: 'monthly'})),
    ...AREAS.map(a => ({loc: `/service-areas/${a.id}`, priority: '0.8', freq: 'monthly'})),
    ...BLOGS.map(b => ({loc: `/blog/${b.id}`, priority: '0.7', freq: 'monthly'})),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

function generateRobotsTxt() {
  return `# Abvolt Automation — abvoltautomation.com
# Last updated: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

Disallow: /admin/
Disallow: /private/
Disallow: /api/
Disallow: /*.json$

# AI Crawlers — welcome
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Googlebot
Allow: /

# Sitemap
Sitemap: ${BASE}/sitemap.xml

# Crawl-delay for aggressive crawlers
User-agent: AhrefsBot
Crawl-delay: 10

User-agent: SemrushBot
Crawl-delay: 10
`;
}

// ─────────────────────────────────────────────
// BUILD
// ─────────────────────────────────────────────
const OUT = path.join(__dirname, 'Abvolt_Automation_static');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
}

function build() {
  console.log('Building static site...');
  ensureDir(OUT);
  ensureDir(path.join(OUT, 'services'));
  ensureDir(path.join(OUT, 'service-areas'));
  ensureDir(path.join(OUT, 'blog'));

  // Service pages
  SVCS.forEach(svc => {
    const html = generateServicePage(svc);
    fs.writeFileSync(path.join(OUT, 'services', `${svc.id}.html`), html);
    console.log(`  ✓ services/${svc.id}.html`);
  });

  // Area pages
  AREAS.forEach(area => {
    const html = generateAreaPage(area);
    fs.writeFileSync(path.join(OUT, 'service-areas', `${area.id}.html`), html);
    console.log(`  ✓ service-areas/${area.id}.html`);
  });

  // Blog posts
  BLOGS.forEach(post => {
    const html = generateBlogPost(post);
    fs.writeFileSync(path.join(OUT, 'blog', `${post.id}.html`), html);
    console.log(`  ✓ blog/${post.id}.html`);
  });

  // Index pages
  fs.writeFileSync(path.join(OUT, 'services.html'), generateServicesIndex());
  console.log('  ✓ services.html');

  fs.writeFileSync(path.join(OUT, 'service-areas.html'), generateAreasIndex());
  console.log('  ✓ service-areas.html');

  fs.writeFileSync(path.join(OUT, 'blog.html'), generateBlogIndex());
  console.log('  ✓ blog.html');

  fs.writeFileSync(path.join(OUT, 'about.html'), generateAboutPage());
  console.log('  ✓ about.html');

  fs.writeFileSync(path.join(OUT, 'contact.html'), generateContactPage());
  console.log('  ✓ contact.html');

  // Sitemap & robots
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), generateSitemap());
  console.log('  ✓ sitemap.xml');

  fs.writeFileSync(path.join(OUT, 'robots.txt'), generateRobotsTxt());
  console.log('  ✓ robots.txt');

  // Summary
  const totalFiles = SVCS.length + AREAS.length + BLOGS.length + 5 + 2;
  console.log(`\nDone! Generated ${totalFiles} files in ${OUT}/`);
  console.log(`  ${SVCS.length} service pages`);
  console.log(`  ${AREAS.length} area pages`);
  console.log(`  ${BLOGS.length} blog posts`);
  console.log(`  5 index/static pages`);
  console.log(`  2 SEO files (sitemap.xml, robots.txt)`);
}

build();
