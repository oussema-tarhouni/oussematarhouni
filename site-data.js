/* ============================================================
   site-data.js
   Single source of truth for all editable content on the site.
   - DEFAULT_DATA: the fallback content (what ships with the site)
   - loadData() / saveData(): read/write the live copy from
     localStorage (key: "portfolio_data") so the admin dashboard
     can edit the site without touching HTML.
   - exportData() / importData(): move data between browsers, or
     bake current edits back into this file permanently.
   ============================================================ */

const DEFAULT_DATA = {
  hero: {
    eyebrow: "Computer Science Student",
    titleLine1: "The only way to do great work",
    titleLine2: "is to love what you do",
    quoteAttribution: "Steve Jobs",
    sub: "Building high-performance systems with strong computer science fundamentals",
    terminal: {
      name: "Oussama Tarhouni",
      role: "Computer Science Student",
      focus: "Programming Languages, Operating Systems",
      stack: "C · C++ · Python · Git · GitHub · Html · CSS · Angular · Php · MySQL",
      status: "Open to internships"
    }
  },
  about: {
    heading: "Learning by doing. Building by design.",
    paragraph: "I'm a Computer Science student interested in systems programming and how software works under the hood—from memory management to OS fundamentals. Most of what I know, I've learned by building: small tools in C, scripts that automate the boring parts of my coursework, and a Linux setup I've broken and rebuilt more times than I can count. I'm currently looking for an internship where I can apply that curiosity to real problems.",
    tags: ["C / C++", "Linux", "Git", "Angular", "Python", "Php", "MySQL"],
    photo: ""
  },
  skills: {
    hard: [
      {
        icon: "chevron",
        title: "Systems & low-level",
        desc: "Memory management, processes, and the fundamentals of how an OS runs your code — mostly explored through C.",
        tags: ["C", "C++", "Linux", "Makefiles"]
      },
      {
        icon: "lines",
        title: "Software fundamentals",
        desc: "Data structures, algorithms, and problem solving — the coursework core, kept sharp with practice.",
        tags: ["Data Structures", "Algorithms", "Python"]
      },
      {
        icon: "check",
        title: "Tools & workflow",
        desc: "Comfortable living in the terminal — version control, shell scripting, and a Linux environment I maintain myself.",
        tags: ["Git", "Bash", "Vim", "Docker"]
      }
    ],
    soft: [
      {
        icon: "lines",
        title: "Communication",
        desc: "Explaining technical ideas clearly, whether in code reviews, TA office hours, or team discussions.",
        tags: ["Teaching", "Documentation", "Collaboration"]
      },
      {
        icon: "check",
        title: "Self-directed learning",
        desc: "Comfortable picking up new tools and concepts independently — most of what I know came from building things on my own.",
        tags: ["Curiosity", "Problem solving", "Adaptability"]
      }
    ]
  },
  projects: [
    { category: "Systems", title: "Custom shell in C", desc: "A Unix-like command shell built from scratch, supporting piping, redirection, and job control.", link: "#", image: "", status: "Completed", skills: ["C", "Linux", "Makefiles"] },
    { category: "Tools", title: "Dotfiles & environment", desc: "A version-controlled Linux setup — window manager config, shell aliases, and scripts I use daily, managed with Git.", link: "#", image: "", status: "Completed", skills: ["Linux", "Git", "Bash", "Vim"] },
    { category: "Coursework", title: "Memory allocator", desc: "A simplified malloc/free implementation exploring heap management and fragmentation.", link: "#", image: "", status: "In Progress", skills: ["C", "Data Structures", "Algorithms"] },
    { category: "Coursework", title: "DS & algorithms library in C++", desc: "A small C++ library implementing core data structures (linked lists, trees, hash maps) and classic algorithms from scratch, with unit tests.", link: "#", image: "", status: "Completed", skills: ["C++", "Data Structures", "Algorithms"] },
    { category: "Tools", title: "Coursework automation scripts", desc: "Python + Bash scripts that automate repetitive coursework tasks — batch-testing assignments, renaming/organizing files, and generating submission reports.", link: "#", image: "", status: "Completed", skills: ["Python", "Bash"] },
    { category: "Web", title: "This portfolio site", desc: "A hand-built portfolio with a matching admin dashboard for editing content, version-controlled and deployed from GitHub.", link: "#", image: "", status: "Completed", skills: ["Html", "CSS", "Git", "GitHub"] },
    { category: "Web", title: "Angular task manager", desc: "A single-page task manager built with Angular — components, services, and routing — to learn the framework beyond tutorials.", link: "#", image: "", status: "In Progress", skills: ["Angular"] },
    { category: "Web", title: "PHP + MySQL student records system", desc: "A CRUD web app for managing student records, with a PHP backend and a MySQL database, built to apply PHP and SQL fundamentals.", link: "#", image: "", status: "Not Started", skills: ["Php", "MySQL"] },
    { category: "Tools", title: "Dockerized dev environment", desc: "A Docker setup that reproduces my Linux dev environment in a container, so coursework projects build the same way anywhere.", link: "#", image: "", status: "Not Started", skills: ["Docker", "Linux"] }
  ],
  education: [
    { when: "2023 — 2027 (expected)", degree: "B.Sc. in Computer Science", org: "Your University", desc: "Relevant coursework: Data Structures & Algorithms, Operating Systems, Computer Architecture, Discrete Mathematics." }
  ],
  experience: [
    { when: "Summer 2025", title: "Software Engineering Intern", org: "Company Name", bullets: ["Contributed to an internal tool used by the engineering team.", "Fixed bugs and wrote tests in an existing C++ codebase."] },
    { when: "2024 — Present", title: "Teaching Assistant, Intro to Programming", org: "Your University", bullets: ["Held weekly office hours and lab sessions for first-year students.", "Graded assignments and helped debug student code."] }
  ],
  contact: {
    intro: "Open to internships, collaborations, or just talking about systems programming. Reach out however's easiest.",
    email: "oussematarhouni9@gmail.com",
    githubUrl: "#",
    githubLabel: "github.com/yourhandle",
    linkedinUrl: "https://www.linkedin.com/in/oussema-tarhouni/",
    linkedinLabel: "linkedin.com/in/oussema-tarhouni"
  },
  footer: {
    blurb: "Computer science student focused on systems programming — C, C++, and the Linux terminal, exploring what happens below the abstraction layer.",
    status: "Open to internships",
    location: "Monastir, Tunisia",
    languages: "Arabic · English · French",
    year: "2026"
  }
};

const STORAGE_KEY = "portfolio_data";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    const parsed = JSON.parse(raw);
    // shallow-merge so new default fields aren't lost after an older save
    return deepMerge(structuredClone(DEFAULT_DATA), parsed);
  } catch (e) {
    console.warn("Could not read saved site data, using defaults.", e);
    return structuredClone(DEFAULT_DATA);
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Could not save site data.", e);
    return false;
  }
}

function resetData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

function exportData(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "portfolio-data.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function deepMerge(base, override) {
  if (Array.isArray(base)) return Array.isArray(override) ? override : base;
  if (typeof base === "object" && base !== null) {
    const out = { ...base };
    for (const key in base) {
      if (override && key in override) out[key] = deepMerge(base[key], override[key]);
    }
    return out;
  }
  return override !== undefined ? override : base;
}
