import React from "react";

export default function LanguageSwitcher({ lang }) {
  const languages = [
    { code: "en", label: "EN" },
    { code: "ca", label: "CA" },
    { code: "es", label: "ES" }
  ];

  function getNewPath(code) {
    const path = window.location.pathname;
    if (/^\/(en|ca|es)/.test(path)) {
      return path.replace(/^\/(en|ca|es)/, `/${code}`);
    } else {
      return `/${code}${path}`;
    }
  }

  function handleClick() {
    const idx = languages.findIndex(l => l.code === lang);
    const next = languages[(idx + 1) % languages.length];
    window.location.href = getNewPath(next.code);
  }

  const current = languages.find(l => l.code === lang) || languages[0];

  return (
    <button className="lang-cycler" onClick={handleClick} title="Change language">
      {current.label}
      <style>{`
        .lang-cycler {
          color: var(--text-color);
          font-weight: bold;
          background: none;
          border: 1px solid var(--text-color);
          border-radius: 4px;
          padding: 0.2em 0.7em;
          cursor: pointer;
          min-width: 2.5em;
        }
      `}</style>
    </button>
  );
}
