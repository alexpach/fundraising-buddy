// Curated display aliases. Original catalog research is never rewritten.
export const sectorOrder = ["AI", "Robotics & autonomy", "Hardware & electronics", "Semiconductors & computing", "Enterprise software", "Data & cloud infrastructure", "Developer tools", "Cybersecurity", "Fintech & insurance", "Crypto & Web3", "Healthcare", "Biotech & life sciences", "Climate & environment", "Energy", "Industrial & manufacturing", "Materials & chemicals", "Mobility & transportation", "Logistics & supply chain", "Space & aerospace", "Defense & security", "Food & agriculture", "Real estate & construction", "Consumer & retail", "Marketplaces & commerce", "Media & entertainment", "Education & work", "Telecom & connectivity", "Deep tech", "Multi-sector", "Unknown"];
const aliases:Record<string,string[]> = {
  "(aero)space": [
    "Space & aerospace"
  ],
  "10x hardware": [
    "Hardware & electronics"
  ],
  "3d": [
    "Semiconductors & computing"
  ],
  "5g": [
    "Telecom & connectivity"
  ],
  "ai": [
    "AI"
  ],
  "ai & analytics": [
    "AI"
  ],
  "ai & data science": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai & ml": [
    "AI"
  ],
  "ai & next generation internet": [
    "AI"
  ],
  "ai ml data": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai quantum": [
    "AI",
    "Semiconductors & computing"
  ],
  "ai applications": [
    "AI"
  ],
  "ai infrastructure": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai infrastructure and applications": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai ecosystem": [
    "AI"
  ],
  "ai enablement": [
    "AI"
  ],
  "ai in the physical world": [
    "AI",
    "Robotics & autonomy"
  ],
  "ai powered platforms": [
    "AI"
  ],
  "ai driven business solutions": [
    "AI",
    "Enterprise software"
  ],
  "ai first and ai enabled businesses": [
    "AI"
  ],
  "ai first technology stack": [
    "AI"
  ],
  "ai native applications": [
    "AI"
  ],
  "ai ml": [
    "AI"
  ],
  "access to healthcare": [
    "Healthcare"
  ],
  "advanced compute": [
    "Semiconductors & computing"
  ],
  "advanced computing & security": [
    "Semiconductors & computing"
  ],
  "advanced weapons": [
    "Defense & security"
  ],
  "aerospace": [
    "Space & aerospace"
  ],
  "agribusiness": [
    "Food & agriculture"
  ],
  "american dynamism": [
    "Unknown"
  ],
  "application software": [
    "Enterprise software"
  ],
  "artificial intelligence": [
    "AI"
  ],
  "augmentation": [
    "Healthcare"
  ],
  "automation & industrial ai": [
    "AI",
    "Industrial & manufacturing"
  ],
  "automotive": [
    "Mobility & transportation"
  ],
  "autonomous machines": [
    "Robotics & autonomy"
  ],
  "autonomous technology & robotics": [
    "Robotics & autonomy"
  ],
  "autonomy": [
    "Robotics & autonomy"
  ],
  "b2b": [
    "Unknown"
  ],
  "b2b saas": [
    "Enterprise software"
  ],
  "b2b software": [
    "Enterprise software"
  ],
  "b2b and b2c technology, including ai, b2b saas, devops, fintech, ecommerce and retail, health, edtech, climate, and transport": [
    "AI",
    "Enterprise software",
    "Developer tools",
    "Fintech & insurance",
    "Healthcare",
    "Climate & environment",
    "Mobility & transportation",
    "Consumer & retail",
    "Marketplaces & commerce",
    "Education & work"
  ],
  "b2b tech": [
    "Unknown"
  ],
  "b2b technologies": [
    "Unknown"
  ],
  "b2b technology": [
    "Unknown"
  ],
  "b2b to b2c": [
    "Unknown"
  ],
  "b2b b2c services": [
    "Unknown"
  ],
  "b2b enterprise software": [
    "Enterprise software"
  ],
  "big data cloud solutions": [
    "Data & cloud infrastructure"
  ],
  "bio": [
    "Biotech & life sciences"
  ],
  "bioit": [
    "Biotech & life sciences"
  ],
  "blockchain": [
    "Crypto & Web3"
  ],
  "building construction": [
    "Real estate & construction"
  ],
  "built environment": [
    "Real estate & construction"
  ],
  "business & energy efficiency": [
    "Energy"
  ],
  "business cloud applications & infrastructure": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "c5isr": [
    "Defense & security"
  ],
  "carbon management": [
    "Climate & environment"
  ],
  "children & youth": [
    "Unknown"
  ],
  "cleantech": [
    "Climate & environment"
  ],
  "cleantech & planet positive": [
    "Climate & environment"
  ],
  "climate": [
    "Climate & environment"
  ],
  "climate tech": [
    "Climate & environment"
  ],
  "climate tech & industrial tech": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "climate and sustainability": [
    "Climate & environment"
  ],
  "climatetech": [
    "Climate & environment"
  ],
  "cloud infrastructure": [
    "Data & cloud infrastructure"
  ],
  "compute": [
    "Semiconductors & computing"
  ],
  "computer related": [
    "Unknown"
  ],
  "contech": [
    "Real estate & construction"
  ],
  "connectivity": [
    "Telecom & connectivity"
  ],
  "construction & real estate": [
    "Real estate & construction"
  ],
  "consumer": [
    "Consumer & retail"
  ],
  "consumer & commerce": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  "consumer & prosumer": [
    "Consumer & retail"
  ],
  "consumertech": [
    "Consumer & retail"
  ],
  "cosmetics": [
    "Consumer & retail"
  ],
  "crypto web3": [
    "Crypto & Web3"
  ],
  "cyber": [
    "Cybersecurity"
  ],
  "cyber security": [
    "Cybersecurity"
  ],
  "cybersecurity": [
    "Cybersecurity"
  ],
  "cybersecurity & defense": [
    "Cybersecurity",
    "Defense & security"
  ],
  "cybertech": [
    "Cybersecurity"
  ],
  "data & infrastructure": [
    "Data & cloud infrastructure"
  ],
  "data, ml, and ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "deep tech": [
    "Deep tech"
  ],
  "deeptech": [
    "Deep tech"
  ],
  "deeptech: microelectronics, photonics, digitalization": [
    "Hardware & electronics",
    "Semiconductors & computing",
    "Enterprise software",
    "Deep tech"
  ],
  "defence technologies": [
    "Defense & security"
  ],
  "defense & security": [
    "Defense & security"
  ],
  "defense tech": [
    "Defense & security"
  ],
  "devtools and infrastructure": [
    "Developer tools"
  ],
  "developer platforms": [
    "Developer tools"
  ],
  "developer tools & data": [
    "Data & cloud infrastructure",
    "Developer tools"
  ],
  "diagnostics": [
    "Healthcare",
    "Multi-sector"
  ],
  "digital assets": [
    "Crypto & Web3"
  ],
  "digital assets & fintech innovation": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "digital first": [
    "Unknown"
  ],
  "digital health": [
    "Healthcare"
  ],
  "digital solutions": [
    "Enterprise software"
  ],
  "digital technologies & agriculture (private equity)": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "digital transformation": [
    "Enterprise software"
  ],
  "distributed ledger": [
    "Crypto & Web3"
  ],
  "distribution": [
    "Logistics & supply chain"
  ],
  "diversified technology": [
    "Multi-sector"
  ],
  "e commerce": [
    "Marketplaces & commerce"
  ],
  "economic infrastructure": [
    "Unknown"
  ],
  "edtech": [
    "Education & work"
  ],
  "edge & data infrastructure": [
    "Data & cloud infrastructure"
  ],
  "efficient buildings & infrastructure": [
    "Real estate & construction"
  ],
  "electronics & compute": [
    "Hardware & electronics",
    "Semiconductors & computing"
  ],
  "enabling technologies": [
    "Unknown"
  ],
  "energy": [
    "Energy"
  ],
  "energy & electrification": [
    "Energy"
  ],
  "energy transition": [
    "Energy"
  ],
  "energy and climatetech": [
    "Climate & environment",
    "Energy"
  ],
  "energytech": [
    "Energy"
  ],
  "enterprise": [
    "Enterprise software"
  ],
  "enterprise & cloud": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "enterprise & frontier technologies": [
    "Enterprise software",
    "Deep tech"
  ],
  "enterprise software": [
    "Enterprise software"
  ],
  "european tech": [
    "Unknown"
  ],
  "fintech": [
    "Fintech & insurance"
  ],
  "fintech & legaltech": [
    "Enterprise software",
    "Fintech & insurance"
  ],
  "financial services": [
    "Fintech & insurance"
  ],
  "financial technology": [
    "Fintech & insurance"
  ],
  "fintech & crypto": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "fintech & insurtech": [
    "Fintech & insurance"
  ],
  "food & agriculture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "food and agriculture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "food as medicine": [
    "Healthcare",
    "Food & agriculture"
  ],
  "foodtech": [
    "Food & agriculture"
  ],
  "frontier": [
    "Deep tech"
  ],
  "frontier tech": [
    "Deep tech"
  ],
  "frontier technologies": [
    "Deep tech"
  ],
  "future of work": [
    "Education & work"
  ],
  "future of work, retail & living": [
    "Consumer & retail",
    "Education & work"
  ],
  "games": [
    "Media & entertainment"
  ],
  "gaming": [
    "Media & entertainment"
  ],
  "genomic revolution & biotech": [
    "Biotech & life sciences"
  ],
  "global resilience & energy": [
    "Energy"
  ],
  "government & defense": [
    "Defense & security"
  ],
  "hrtech": [
    "Enterprise software",
    "Education & work"
  ],
  "hard tech": [
    "Deep tech"
  ],
  "hardware & deep tech": [
    "Hardware & electronics",
    "Deep tech"
  ],
  "health": [
    "Healthcare"
  ],
  "health & bio": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "health & food": [
    "Healthcare",
    "Food & agriculture"
  ],
  "health tech": [
    "Healthcare"
  ],
  "health and biotech": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "healthtech": [
    "Healthcare"
  ],
  "healthcare": [
    "Healthcare"
  ],
  "healthcare bio longevity": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "healthcare life sciences": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "human (health, medicine, and wellness)": [
    "Healthcare"
  ],
  "humanos": [
    "Healthcare"
  ],
  "it": [
    "Unknown"
  ],
  "it infrastructure": [
    "Data & cloud infrastructure"
  ],
  "it services & software": [
    "Enterprise software"
  ],
  "identity and security": [
    "Cybersecurity"
  ],
  "industrial": [
    "Industrial & manufacturing"
  ],
  "industrial autonomy": [
    "Robotics & autonomy",
    "Industrial & manufacturing"
  ],
  "industrial biotechnology": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial tech + life science tools": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial technology": [
    "Industrial & manufacturing"
  ],
  "industrials": [
    "Industrial & manufacturing"
  ],
  "industry": [
    "Industrial & manufacturing"
  ],
  "industry & automation": [
    "Industrial & manufacturing"
  ],
  "industry & deeptech": [
    "Industrial & manufacturing",
    "Deep tech"
  ],
  "infra & dev ops": [
    "Developer tools"
  ],
  "infrastructure": [
    "Unknown"
  ],
  "infrastructure & security": [
    "Cybersecurity",
    "Data & cloud infrastructure"
  ],
  "infrastructure ai": [
    "AI"
  ],
  "infrastructure software": [
    "Data & cloud infrastructure"
  ],
  "insurtech": [
    "Fintech & insurance"
  ],
  "intelligence (ai, advanced computing, and quantum)": [
    "AI",
    "Semiconductors & computing"
  ],
  "internet technology": [
    "Unknown"
  ],
  "iot": [
    "Hardware & electronics"
  ],
  "iot and edge computing": [
    "Hardware & electronics",
    "Data & cloud infrastructure"
  ],
  "legaltech": [
    "Enterprise software"
  ],
  "life science": [
    "Biotech & life sciences"
  ],
  "life sciences": [
    "Biotech & life sciences"
  ],
  "life sciences & healthtech": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "life sciences & ehealth": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "life tech": [
    "Unknown"
  ],
  "lifestyle": [
    "Consumer & retail"
  ],
  "logistics": [
    "Logistics & supply chain"
  ],
  "logistics & supply chain": [
    "Logistics & supply chain"
  ],
  "longevity": [
    "Healthcare"
  ],
  "machine assist": [
    "Robotics & autonomy"
  ],
  "manufacturing": [
    "Industrial & manufacturing"
  ],
  "manufacturing & industrials": [
    "Industrial & manufacturing"
  ],
  "manufacturing & warehousing": [
    "Industrial & manufacturing",
    "Logistics & supply chain",
    "Real estate & construction"
  ],
  "marketplaces": [
    "Marketplaces & commerce"
  ],
  "marketplaces & consumer": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  "materials": [
    "Materials & chemicals"
  ],
  "materials & packaging": [
    "Materials & chemicals"
  ],
  "media": [
    "Media & entertainment"
  ],
  "media & gaming": [
    "Media & entertainment"
  ],
  "medical life sciences health related": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "medical devices": [
    "Healthcare"
  ],
  "medical technology": [
    "Healthcare"
  ],
  "mittelstand transformation": [
    "Unknown"
  ],
  "mobile technologies": [
    "Unknown"
  ],
  "mobility": [
    "Mobility & transportation"
  ],
  "mobility & automotive": [
    "Mobility & transportation"
  ],
  "mobility transportation": [
    "Mobility & transportation"
  ],
  "mobility and urbanization": [
    "Mobility & transportation",
    "Real estate & construction"
  ],
  "new frontiers": [
    "Unknown"
  ],
  "new markets": [
    "Unknown"
  ],
  "next gen communications": [
    "Telecom & connectivity"
  ],
  "next generation semiconductors": [
    "Semiconductors & computing"
  ],
  "other frontier": [
    "Deep tech"
  ],
  "plg saas": [
    "Enterprise software"
  ],
  "physical ai": [
    "AI",
    "Robotics & autonomy"
  ],
  "physical ai & robotics": [
    "AI",
    "Robotics & autonomy"
  ],
  "physical world intelligence": [
    "Robotics & autonomy"
  ],
  "planet (sustainability, energy, novel materials, and space utilisation)": [
    "Climate & environment",
    "Energy",
    "Materials & chemicals",
    "Space & aerospace"
  ],
  "power & propulsion": [
    "Energy"
  ],
  "proptech": [
    "Real estate & construction"
  ],
  "quantum": [
    "Semiconductors & computing"
  ],
  "quantum computing": [
    "Semiconductors & computing"
  ],
  "real estate and proptech": [
    "Real estate & construction"
  ],
  "real estate": [
    "Real estate & construction"
  ],
  "regtech": [
    "Fintech & insurance"
  ],
  "regulated industries": [
    "Industrial & manufacturing"
  ],
  "robotics": [
    "Robotics & autonomy"
  ],
  "robotics advanced materials": [
    "Robotics & autonomy",
    "Materials & chemicals"
  ],
  "saas": [
    "Enterprise software"
  ],
  "saas & infrastructure": [
    "Enterprise software"
  ],
  "sector agnostic (venture capital, growth equity)": [
    "Multi-sector"
  ],
  "semiconductors": [
    "Semiconductors & computing"
  ],
  "sensors & pnt": [
    "Hardware & electronics"
  ],
  "sexual & reproductive health": [
    "Healthcare"
  ],
  "simulation": [
    "Semiconductors & computing"
  ],
  "smart enterprise": [
    "Enterprise software"
  ],
  "software": [
    "Enterprise software"
  ],
  "software infrastructure and foundation models": [
    "AI",
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "software ai": [
    "AI",
    "Enterprise software"
  ],
  "space & defense": [
    "Space & aerospace",
    "Defense & security"
  ],
  "space & defense innovation": [
    "Space & aerospace",
    "Defense & security"
  ],
  "space tech": [
    "Space & aerospace"
  ],
  "spacetech": [
    "Space & aerospace"
  ],
  "spatial computing": [
    "Semiconductors & computing"
  ],
  "sports": [
    "Media & entertainment"
  ],
  "supply chain & manufacturing tech": [
    "Industrial & manufacturing",
    "Logistics & supply chain"
  ],
  "sustainability": [
    "Climate & environment"
  ],
  "sustainable & healthy cities": [
    "Healthcare",
    "Climate & environment"
  ],
  "sustainable construction": [
    "Climate & environment",
    "Real estate & construction"
  ],
  "sustainable energy": [
    "Climate & environment",
    "Energy"
  ],
  "sustainable production and consumption": [
    "Climate & environment"
  ],
  "sustainable tech & climate solutions": [
    "Climate & environment"
  ],
  "sustainable agriculture": [
    "Climate & environment",
    "Food & agriculture",
    "Media & entertainment"
  ],
  "sustainable food": [
    "Climate & environment",
    "Food & agriculture"
  ],
  "sustainable materials": [
    "Climate & environment",
    "Materials & chemicals"
  ],
  "tech": [
    "Unknown"
  ],
  "tech enabled services": [
    "Enterprise software"
  ],
  "telecom": [
    "Telecom & connectivity"
  ],
  "therapeutic products": [
    "Biotech & life sciences"
  ],
  "therapeutics": [
    "Biotech & life sciences"
  ],
  "tourism": [
    "Consumer & retail"
  ],
  "transportation & logistics": [
    "Mobility & transportation",
    "Logistics & supply chain"
  ],
  "transportation & mobility": [
    "Mobility & transportation"
  ],
  "urbantech": [
    "Real estate & construction"
  ],
  "vertical ai": [
    "AI"
  ],
  "vertical saas": [
    "Enterprise software"
  ],
  "vertical software": [
    "Enterprise software"
  ],
  "waste and circularity": [
    "Climate & environment"
  ],
  "water & wastewater": [
    "Climate & environment"
  ],
  "watertech": [
    "Climate & environment"
  ],
  "web3": [
    "Crypto & Web3"
  ],
  "web3 & blockchain": [
    "Crypto & Web3"
  ],
  "xr metaverse": [
    "Media & entertainment"
  ],
  "academic spinouts": [
    "Deep tech"
  ],
  "access control": [
    "Defense & security"
  ],
  "activist investing": [
    "Unknown"
  ],
  "advanced industrial systems": [
    "Industrial & manufacturing"
  ],
  "advanced manufacturing": [
    "Industrial & manufacturing"
  ],
  "advanced materials": [
    "Materials & chemicals"
  ],
  "ag food": [
    "Food & agriculture"
  ],
  "aging biology": [
    "Biotech & life sciences"
  ],
  "agri tech": [
    "Food & agriculture"
  ],
  "agriculture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "agrifood": [
    "Food & agriculture"
  ],
  "agritech": [
    "Food & agriculture"
  ],
  "agtech": [
    "Food & agriculture"
  ],
  "ai infra": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "air mobility": [
    "Mobility & transportation"
  ],
  "all industries (innostarterfonds: no sector focus)": [
    "Industrial & manufacturing",
    "Multi-sector"
  ],
  "applied big data ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "applied sciences": [
    "Deep tech"
  ],
  "aquatic robots": [
    "Robotics & autonomy"
  ],
  "asset management": [
    "Fintech & insurance"
  ],
  "automate and digitize the physical world": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "automated workflows": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "automation": [
    "Industrial & manufacturing"
  ],
  "automation and productivity": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "automotive manufacturing": [
    "Industrial & manufacturing",
    "Mobility & transportation"
  ],
  "autonomous systems": [
    "Robotics & autonomy"
  ],
  "autonomous driving": [
    "Robotics & autonomy",
    "Mobility & transportation"
  ],
  "autonomous vehicles": [
    "Robotics & autonomy",
    "Mobility & transportation"
  ],
  "aviation": [
    "Space & aerospace"
  ],
  "b2b marketplaces": [
    "Marketplaces & commerce"
  ],
  "banking": [
    "Fintech & insurance"
  ],
  "banking software": [
    "Enterprise software",
    "Fintech & insurance"
  ],
  "big data": [
    "Data & cloud infrastructure"
  ],
  "bio + healthcare": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "biology": [
    "Biotech & life sciences"
  ],
  "biomanufacturing": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "biopharma": [
    "Biotech & life sciences"
  ],
  "biopharmaceuticals": [
    "Biotech & life sciences"
  ],
  "biotech": [
    "Biotech & life sciences"
  ],
  "biotech tools and technologies": [
    "Biotech & life sciences"
  ],
  "biotechnology": [
    "Biotech & life sciences"
  ],
  "blockchain applications": [
    "Crypto & Web3"
  ],
  "blockchain infrastructure": [
    "Crypto & Web3"
  ],
  "brands": [
    "Consumer & retail"
  ],
  "built world real estate technology": [
    "Real estate & construction"
  ],
  "built world": [
    "Real estate & construction"
  ],
  "business services": [
    "Enterprise software"
  ],
  "business software": [
    "Enterprise software"
  ],
  "buyouts": [
    "Unknown"
  ],
  "buyouts rollups": [
    "Unknown"
  ],
  "capital markets infrastructure": [
    "Fintech & insurance"
  ],
  "car development": [
    "Mobility & transportation"
  ],
  "carbon economy": [
    "Climate & environment"
  ],
  "care": [
    "Healthcare"
  ],
  "care delivery": [
    "Healthcare"
  ],
  "cell and gene therapy": [
    "Biotech & life sciences"
  ],
  "chemistry": [
    "Materials & chemicals"
  ],
  "circular economy": [
    "Climate & environment"
  ],
  "circularity and new materials": [
    "Climate & environment",
    "Materials & chemicals"
  ],
  "clean technologies": [
    "Climate & environment"
  ],
  "clean energy": [
    "Energy"
  ],
  "climate + sustainability": [
    "Climate & environment"
  ],
  "climate and energy tech": [
    "Climate & environment",
    "Energy"
  ],
  "climate solutions": [
    "Climate & environment"
  ],
  "climate energy": [
    "Climate & environment",
    "Energy"
  ],
  "cloud": [
    "Data & cloud infrastructure"
  ],
  "commerce": [
    "Marketplaces & commerce"
  ],
  "commercial open source (>commit)": [
    "Developer tools"
  ],
  "communications": [
    "Telecom & connectivity"
  ],
  "community led": [
    "Unknown"
  ],
  "compliance": [
    "Enterprise software"
  ],
  "compliance tech": [
    "Cybersecurity"
  ],
  "computational biology": [
    "Biotech & life sciences"
  ],
  "computer science": [
    "Unknown"
  ],
  "computer vision": [
    "AI"
  ],
  "conglomerate": [
    "Unknown"
  ],
  "construction": [
    "Real estate & construction"
  ],
  "construction tech": [
    "Real estate & construction"
  ],
  "construction technology": [
    "Real estate & construction"
  ],
  "consumer apps": [
    "Consumer & retail"
  ],
  "consumer brands": [
    "Consumer & retail"
  ],
  "consumer internet": [
    "Consumer & retail"
  ],
  "consumer marketplaces": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  "consumer platforms": [
    "Consumer & retail"
  ],
  "consumer software": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "consumer tech": [
    "Consumer & retail"
  ],
  "consumer technology": [
    "Consumer & retail"
  ],
  "consumer health": [
    "Healthcare",
    "Consumer & retail"
  ],
  "consumer retail": [
    "Consumer & retail"
  ],
  "consumerized enterprise": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "content": [
    "Media & entertainment"
  ],
  "conviction led": [
    "Unknown"
  ],
  "cpg": [
    "Consumer & retail"
  ],
  "creative technologies": [
    "Media & entertainment"
  ],
  "creator economy": [
    "Media & entertainment"
  ],
  "credit": [
    "Unknown"
  ],
  "critical minerals": [
    "Materials & chemicals"
  ],
  "cross border payments": [
    "Fintech & insurance"
  ],
  "crypto": [
    "Crypto & Web3"
  ],
  "culture": [
    "Media & entertainment"
  ],
  "data": [
    "Data & cloud infrastructure"
  ],
  "data & ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "data analytics": [
    "Data & cloud infrastructure"
  ],
  "data driven healthcare": [
    "Data & cloud infrastructure",
    "Healthcare"
  ],
  "data infrastructure": [
    "Data & cloud infrastructure"
  ],
  "data intelligence": [
    "Data & cloud infrastructure"
  ],
  "data services": [
    "Data & cloud infrastructure"
  ],
  "decarbonization": [
    "Climate & environment"
  ],
  "decentralization": [
    "Crypto & Web3"
  ],
  "deep physics": [
    "Deep tech"
  ],
  "deep technology": [
    "Deep tech"
  ],
  "deep tech software": [
    "Enterprise software",
    "Deep tech"
  ],
  "defense": [
    "Defense & security"
  ],
  "defense and security": [
    "Defense & security"
  ],
  "defi": [
    "Crypto & Web3"
  ],
  "design and development tools": [
    "Developer tools"
  ],
  "dev tools": [
    "Developer tools"
  ],
  "developer tools": [
    "Developer tools"
  ],
  "developer tools and infrastructure": [
    "Developer tools"
  ],
  "devices": [
    "Hardware & electronics"
  ],
  "devops": [
    "Developer tools"
  ],
  "digital": [
    "Unknown"
  ],
  "digital biology": [
    "Biotech & life sciences"
  ],
  "digital lifestyle": [
    "Consumer & retail"
  ],
  "digital media": [
    "Media & entertainment"
  ],
  "digital sales and services": [
    "Marketplaces & commerce"
  ],
  "digital startups": [
    "Unknown"
  ],
  "digital identity": [
    "Cybersecurity"
  ],
  "digital infrastructure": [
    "Data & cloud infrastructure"
  ],
  "digitalization": [
    "Enterprise software"
  ],
  "disruptive innovation": [
    "Unknown"
  ],
  "distressed debt": [
    "Unknown"
  ],
  "diversified": [
    "Multi-sector"
  ],
  "drones": [
    "Defense & security"
  ],
  "drug discovery": [
    "Biotech & life sciences"
  ],
  "drug discovery tools": [
    "Biotech & life sciences"
  ],
  "drug delivery": [
    "Biotech & life sciences"
  ],
  "dual use": [
    "Defense & security"
  ],
  "dual use & defence (e2d fund)": [
    "Defense & security"
  ],
  "dual use hardware": [
    "Hardware & electronics",
    "Defense & security"
  ],
  "e commerce and marketplaces": [
    "Marketplaces & commerce"
  ],
  "e health": [
    "Healthcare"
  ],
  "early stage": [
    "Unknown"
  ],
  "ecology, digitalization and social responsibility (innoventurefonds)": [
    "Enterprise software",
    "Climate & environment"
  ],
  "education": [
    "Education & work"
  ],
  "electric vehicles": [
    "Mobility & transportation"
  ],
  "electrification": [
    "Energy"
  ],
  "electronics": [
    "Hardware & electronics"
  ],
  "emerging technologies": [
    "Unknown"
  ],
  "emerging markets": [
    "Unknown"
  ],
  "energy and infrastructure sustainability": [
    "Climate & environment",
    "Energy"
  ],
  "energy equipment": [
    "Energy"
  ],
  "energy services": [
    "Energy"
  ],
  "energy sustainability": [
    "Climate & environment",
    "Energy"
  ],
  "energy tech": [
    "Energy"
  ],
  "energy technology": [
    "Energy"
  ],
  "energy cleantech": [
    "Climate & environment",
    "Energy"
  ],
  "energy hardware": [
    "Hardware & electronics",
    "Energy"
  ],
  "energy storage": [
    "Energy"
  ],
  "energy climate": [
    "Climate & environment",
    "Energy"
  ],
  "engineering": [
    "Industrial & manufacturing"
  ],
  "enterprise saas": [
    "Enterprise software"
  ],
  "enterprise and consumer technology": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "enterprise risk management": [
    "Enterprise software",
    "Cybersecurity"
  ],
  "enterprise technology": [
    "Enterprise software"
  ],
  "enterprise ai": [
    "AI",
    "Enterprise software"
  ],
  "enterprise cloud": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "enterprise it": [
    "Enterprise software"
  ],
  "entertainment": [
    "Media & entertainment"
  ],
  "ev": [
    "Mobility & transportation"
  ],
  "evtol": [
    "Mobility & transportation"
  ],
  "exa scale computing": [
    "Semiconductors & computing"
  ],
  "experience": [
    "Unknown"
  ],
  "fin tech": [
    "Fintech & insurance"
  ],
  "finance": [
    "Fintech & insurance"
  ],
  "financial technologies": [
    "Fintech & insurance"
  ],
  "financial wellness": [
    "Fintech & insurance",
    "Healthcare"
  ],
  "fintech and infrastructure": [
    "Fintech & insurance"
  ],
  "fintech crypto": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "fintech insurtech": [
    "Fintech & insurance"
  ],
  "fleet": [
    "Mobility & transportation"
  ],
  "food": [
    "Food & agriculture"
  ],
  "food ag": [
    "Food & agriculture"
  ],
  "food and beverage": [
    "Food & agriculture"
  ],
  "food beverage": [
    "Food & agriculture"
  ],
  "food systems": [
    "Food & agriculture"
  ],
  "food tech": [
    "Food & agriculture"
  ],
  "founder coaching": [
    "Unknown"
  ],
  "franchise brands": [
    "Consumer & retail"
  ],
  "fraud risk": [
    "Fintech & insurance"
  ],
  "frontier infrastructure": [
    "Data & cloud infrastructure"
  ],
  "frontier models": [
    "AI"
  ],
  "frontier technology": [
    "Deep tech"
  ],
  "fund management": [
    "Unknown"
  ],
  "future of commerce": [
    "Marketplaces & commerce"
  ],
  "gene therapy": [
    "Biotech & life sciences"
  ],
  "generalist": [
    "Multi-sector"
  ],
  "generalist growth": [
    "Multi-sector"
  ],
  "generative media": [
    "Media & entertainment"
  ],
  "generative ai": [
    "AI"
  ],
  "genomics": [
    "Biotech & life sciences"
  ],
  "graphics": [
    "Semiconductors & computing"
  ],
  "greenhouse tech": [
    "Food & agriculture"
  ],
  "grid": [
    "Energy"
  ],
  "ground robots": [
    "Robotics & autonomy"
  ],
  "growth capital": [
    "Unknown"
  ],
  "growth equity": [
    "Unknown"
  ],
  "hard science": [
    "Deep tech"
  ],
  "hardtech": [
    "Deep tech"
  ],
  "hardware": [
    "Hardware & electronics"
  ],
  "hardware enabled solutions": [
    "Hardware & electronics"
  ],
  "hardware manufacturing": [
    "Hardware & electronics",
    "Industrial & manufacturing"
  ],
  "health and wellness": [
    "Healthcare"
  ],
  "health technology": [
    "Healthcare"
  ],
  "health wellness": [
    "Healthcare"
  ],
  "healthcare information technology and services": [
    "Healthcare"
  ],
  "healthcare tools": [
    "Healthcare"
  ],
  "healthcare it": [
    "Healthcare"
  ],
  "healthspan": [
    "Healthcare"
  ],
  "healthtech + services": [
    "Healthcare"
  ],
  "high growth companies": [
    "Unknown"
  ],
  "high tech growth": [
    "Unknown"
  ],
  "holdings": [
    "Unknown"
  ],
  "horticulture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "hospitality": [
    "Consumer & retail"
  ],
  "housing": [
    "Real estate & construction"
  ],
  "hpc": [
    "Semiconductors & computing"
  ],
  "human experiences": [
    "Media & entertainment"
  ],
  "ict": [
    "Telecom & connectivity"
  ],
  "immersive technologies": [
    "Media & entertainment"
  ],
  "impact": [
    "Unknown"
  ],
  "industrial biotech": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial decarbonisation": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "industrial digitalisation and automation": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "industrial edge": [
    "Data & cloud infrastructure",
    "Industrial & manufacturing"
  ],
  "industrial innovation": [
    "Industrial & manufacturing"
  ],
  "industrial problems": [
    "Industrial & manufacturing"
  ],
  "industrial tech": [
    "Industrial & manufacturing"
  ],
  "industrial ai": [
    "AI",
    "Industrial & manufacturing"
  ],
  "industrial automation": [
    "Industrial & manufacturing"
  ],
  "industrial decarbonization": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "industrial iot": [
    "Hardware & electronics",
    "Industrial & manufacturing"
  ],
  "industrial software": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "industry agnostic": [
    "Industrial & manufacturing",
    "Multi-sector"
  ],
  "industry software": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "industrytech": [
    "Industrial & manufacturing"
  ],
  "information technology": [
    "Unknown"
  ],
  "infra tooling": [
    "Data & cloud infrastructure"
  ],
  "innovation": [
    "Unknown"
  ],
  "innovative approaches to new and existing industries": [
    "Industrial & manufacturing"
  ],
  "insurance": [
    "Fintech & insurance"
  ],
  "insuretech": [
    "Fintech & insurance"
  ],
  "intelligence": [
    "Unknown"
  ],
  "intelligent collaboration": [
    "Enterprise software"
  ],
  "interactive media": [
    "Media & entertainment"
  ],
  "internet": [
    "Unknown"
  ],
  "investment bank": [
    "Fintech & insurance"
  ],
  "ip driven": [
    "Unknown"
  ],
  "israel": [
    "Unknown"
  ],
  "it media": [
    "Media & entertainment"
  ],
  "it services": [
    "Enterprise software"
  ],
  "japan corridor": [
    "Unknown"
  ],
  "labour infrastructure": [
    "Education & work"
  ],
  "law enforcement tech": [
    "Defense & security"
  ],
  "learning": [
    "Education & work"
  ],
  "legal tech": [
    "Enterprise software"
  ],
  "life sciences and technology": [
    "Biotech & life sciences"
  ],
  "liquid assets": [
    "Unknown"
  ],
  "listed infrastructure": [
    "Unknown"
  ],
  "logistics supply chain": [
    "Logistics & supply chain"
  ],
  "logtech": [
    "Logistics & supply chain"
  ],
  "long term equity": [
    "Unknown"
  ],
  "machine learning": [
    "AI"
  ],
  "manufacturing, supply chain and logistics technology": [
    "Industrial & manufacturing",
    "Logistics & supply chain"
  ],
  "manufacturing tech": [
    "Industrial & manufacturing"
  ],
  "maritime": [
    "Mobility & transportation"
  ],
  "marketplace": [
    "Marketplaces & commerce"
  ],
  "materials science": [
    "Materials & chemicals"
  ],
  "materials transition": [
    "Materials & chemicals"
  ],
  "media tech": [
    "Media & entertainment"
  ],
  "medical technologies": [
    "Healthcare"
  ],
  "medtech": [
    "Healthcare",
    "Education & work"
  ],
  "mental health": [
    "Healthcare"
  ],
  "mid cap": [
    "Unknown"
  ],
  "mobile": [
    "Unknown"
  ],
  "mobile apps": [
    "Unknown"
  ],
  "mobility and logistics": [
    "Mobility & transportation",
    "Logistics & supply chain"
  ],
  "money fintech": [
    "Fintech & insurance"
  ],
  "national security": [
    "Defense & security"
  ],
  "network effect businesses": [
    "Unknown"
  ],
  "new space": [
    "Space & aerospace"
  ],
  "new energy": [
    "Energy"
  ],
  "new materials": [
    "Materials & chemicals"
  ],
  "niche manufacturing and service businesses": [
    "Industrial & manufacturing"
  ],
  "nordic growth": [
    "Unknown"
  ],
  "nuclear fusion": [
    "Energy"
  ],
  "oceans": [
    "Climate & environment"
  ],
  "oncology": [
    "Biotech & life sciences"
  ],
  "online entertainment": [
    "Media & entertainment"
  ],
  "operating partner": [
    "Unknown"
  ],
  "other": [
    "Unknown"
  ],
  "payments": [
    "Fintech & insurance"
  ],
  "people technology": [
    "Education & work"
  ],
  "pharma": [
    "Biotech & life sciences"
  ],
  "pharmaceuticals": [
    "Biotech & life sciences"
  ],
  "physical economy": [
    "Industrial & manufacturing"
  ],
  "physical products converging with the internet": [
    "Hardware & electronics"
  ],
  "physical science": [
    "Deep tech"
  ],
  "physical security": [
    "Defense & security"
  ],
  "physics": [
    "Deep tech"
  ],
  "pipe": [
    "Unknown"
  ],
  "placement agent": [
    "Unknown"
  ],
  "planetary health": [
    "Healthcare",
    "Climate & environment"
  ],
  "platform": [
    "Unknown"
  ],
  "point of sale": [
    "Marketplaces & commerce"
  ],
  "precision medicine": [
    "Healthcare"
  ],
  "preferred securities": [
    "Unknown"
  ],
  "privacy": [
    "Cybersecurity"
  ],
  "private equity": [
    "Unknown"
  ],
  "private credit": [
    "Unknown"
  ],
  "private markets": [
    "Unknown"
  ],
  "process automation": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "productivity": [
    "Enterprise software"
  ],
  "professional services": [
    "Enterprise software"
  ],
  "prop tech": [
    "Real estate & construction"
  ],
  "property management": [
    "Real estate & construction"
  ],
  "public sector": [
    "Unknown"
  ],
  "public equities": [
    "Unknown"
  ],
  "public safety": [
    "Defense & security"
  ],
  "quantitative investing": [
    "Unknown"
  ],
  "quantum communications": [
    "Semiconductors & computing",
    "Telecom & connectivity"
  ],
  "quantum materials": [
    "Semiconductors & computing",
    "Materials & chemicals"
  ],
  "quantum networks": [
    "Semiconductors & computing",
    "Telecom & connectivity"
  ],
  "quantum sensing": [
    "Semiconductors & computing",
    "Hardware & electronics"
  ],
  "quantum supply chain": [
    "Semiconductors & computing"
  ],
  "quantum technology": [
    "Semiconductors & computing"
  ],
  "real estate and construction technology": [
    "Real estate & construction"
  ],
  "real estate technology": [
    "Real estate & construction"
  ],
  "real assets": [
    "Unknown"
  ],
  "real estate construction": [
    "Real estate & construction"
  ],
  "real world ai": [
    "AI",
    "Robotics & autonomy"
  ],
  "regional development": [
    "Unknown"
  ],
  "regional development fund": [
    "Unknown"
  ],
  "regulatory": [
    "Unknown"
  ],
  "reits": [
    "Real estate & construction"
  ],
  "reproductive longevity": [
    "Healthcare"
  ],
  "research tools": [
    "Deep tech"
  ],
  "residential services": [
    "Real estate & construction"
  ],
  "resilience and adaptation": [
    "Climate & environment"
  ],
  "restaurant": [
    "Food & agriculture"
  ],
  "retail": [
    "Consumer & retail"
  ],
  "retail technology": [
    "Consumer & retail"
  ],
  "revenue based financing": [
    "Unknown"
  ],
  "risk management": [
    "Unknown"
  ],
  "rna therapeutics": [
    "Biotech & life sciences"
  ],
  "robotics autonomous systems": [
    "Robotics & autonomy"
  ],
  "royalty finance": [
    "Fintech & insurance"
  ],
  "royalty financing": [
    "Unknown"
  ],
  "safety": [
    "Defense & security"
  ],
  "scalable infrastructure": [
    "Unknown"
  ],
  "science and technology": [
    "Deep tech"
  ],
  "sector agnostic": [
    "Multi-sector"
  ],
  "sector agnostic: portfolio spans sectors, stages, and regions": [
    "Multi-sector"
  ],
  "security": [
    "Defense & security"
  ],
  "selective software and consumer": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "semiconductor": [
    "Semiconductors & computing"
  ],
  "sensing": [
    "Hardware & electronics"
  ],
  "sensors": [
    "Hardware & electronics"
  ],
  "services": [
    "Unknown"
  ],
  "services as software": [
    "Enterprise software"
  ],
  "silicon": [
    "Semiconductors & computing"
  ],
  "skilled trades": [
    "Industrial & manufacturing"
  ],
  "small cap": [
    "Unknown"
  ],
  "small mid cap equities": [
    "Unknown"
  ],
  "smart agents": [
    "AI"
  ],
  "smart spaces": [
    "Real estate & construction"
  ],
  "smart buildings": [
    "Real estate & construction"
  ],
  "smart city": [
    "Real estate & construction"
  ],
  "smart energy": [
    "Energy"
  ],
  "smart home": [
    "Hardware & electronics"
  ],
  "smart infrastructure": [
    "Unknown"
  ],
  "sme lending": [
    "Fintech & insurance"
  ],
  "social impact": [
    "Unknown"
  ],
  "software and saas": [
    "Enterprise software"
  ],
  "software beyond the screen": [
    "Enterprise software"
  ],
  "software infrastructure": [
    "Data & cloud infrastructure"
  ],
  "software driven hardware": [
    "Hardware & electronics",
    "Enterprise software"
  ],
  "software driven startups": [
    "Enterprise software"
  ],
  "software it": [
    "Enterprise software"
  ],
  "space": [
    "Space & aerospace"
  ],
  "space and aerospace": [
    "Space & aerospace"
  ],
  "special situations": [
    "Unknown"
  ],
  "specialty finance": [
    "Fintech & insurance"
  ],
  "sports and entertainment": [
    "Media & entertainment"
  ],
  "sports tech": [
    "Media & entertainment"
  ],
  "storage": [
    "Energy"
  ],
  "strategy advisory": [
    "Unknown"
  ],
  "supply chain": [
    "Logistics & supply chain"
  ],
  "sustainability (energy, cleantech, foodtech, mobility)": [
    "Climate & environment",
    "Energy",
    "Mobility & transportation",
    "Food & agriculture"
  ],
  "sustainability tech": [
    "Climate & environment"
  ],
  "sustainability services": [
    "Climate & environment"
  ],
  "sustainable industrial innovation": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "swiss smes": [
    "Unknown"
  ],
  "synthetic biology": [
    "Biotech & life sciences"
  ],
  "tax tech": [
    "Enterprise software"
  ],
  "team productivity and collaboration": [
    "Enterprise software"
  ],
  "tech enabled consumer": [
    "Consumer & retail"
  ],
  "techbio": [
    "Biotech & life sciences"
  ],
  "technology": [
    "Unknown"
  ],
  "technology enabled sectors": [
    "Unknown"
  ],
  "technology startups": [
    "Unknown"
  ],
  "technology based ventures": [
    "Unknown"
  ],
  "technology enabled business services": [
    "Enterprise software"
  ],
  "technology enabled companies": [
    "Unknown"
  ],
  "technology growth": [
    "Unknown"
  ],
  "telco": [
    "Telecom & connectivity"
  ],
  "telco and it cloud infrastructure": [
    "Data & cloud infrastructure",
    "Telecom & connectivity"
  ],
  "textile manufacturing": [
    "Industrial & manufacturing"
  ],
  "the cfo stack": [
    "Fintech & insurance"
  ],
  "tmt": [
    "Telecom & connectivity",
    "Media & entertainment"
  ],
  "transport mobility": [
    "Mobility & transportation"
  ],
  "transportation": [
    "Mobility & transportation"
  ],
  "travel": [
    "Consumer & retail"
  ],
  "trusttech": [
    "Cybersecurity"
  ],
  "uas": [
    "Defense & security"
  ],
  "uk smes": [
    "Unknown"
  ],
  "utilities": [
    "Energy"
  ],
  "venture capital": [
    "Unknown"
  ],
  "venture debt": [
    "Unknown"
  ],
  "vertical saas & ai": [
    "AI",
    "Enterprise software"
  ],
  "vertical and horizontal software": [
    "Enterprise software"
  ],
  "vertical technologies": [
    "Unknown"
  ],
  "voice technology": [
    "AI"
  ],
  "vr": [
    "Media & entertainment"
  ],
  "water": [
    "Climate & environment"
  ],
  "wealth and asset management": [
    "Fintech & insurance"
  ],
  "wellness": [
    "Healthcare"
  ],
  "women led": [
    "Unknown"
  ],
  "womens health": [
    "Healthcare"
  ],
  "work": [
    "Education & work"
  ],
  "work technology": [
    "Education & work"
  ],
  "workwear": [
    "Consumer & retail"
  ]
};
const normalize=(value:string)=>value.toLowerCase().replace(/[-_/]+/g,' ').replace(/\s+/g,' ').trim();
export function sectorValues(value:unknown):string[] {
  const raw=Array.isArray(value)?value:typeof value==='string'?[value]:[];
  const found=new Set(raw.flatMap(item=>{
    const text=String(item);
    const canonical=sectorOrder.find(name=>normalize(name)===normalize(text));
    return canonical?[canonical]:aliases[normalize(text)]||['Unknown'];
  }));
  return sectorOrder.filter(name=>found.has(name));
}
