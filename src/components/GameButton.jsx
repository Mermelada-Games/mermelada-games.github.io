import React, { useRef, useEffect } from "react";

export default function GameButton({ link, text }) {
  const buttonRef = useRef(null);

  const handleClick = async (e) => {
    if (link && link.startsWith("/")) {
      e.preventDefault();
      const container = buttonRef.current.closest('.game-container');
      if (typeof window.forceShowHeader === 'function') {
        window.forceShowHeader();
      }
      const originalHeaderScrollListener = window.headerScrollListener;
      if (window.headerScrollListener) {
        window.removeEventListener('scroll', window.headerScrollListener);
      }
      const spacer = document.querySelector('.games-scroll-spacer');
      let spacerActivated = false;
      if (container) {
        const header = document.querySelector('.header-responsive');
        const headerHeight = header ? header.offsetHeight : 0;
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        const containerBottom = container.getBoundingClientRect().bottom + window.scrollY;
        const spaceBelow = document.body.scrollHeight - containerBottom;
        const atBottom = Math.abs(window.scrollY + window.innerHeight - document.body.scrollHeight) < 2;
        if ((containerTop - headerHeight) > window.scrollY && (spaceBelow < (containerTop - headerHeight - window.scrollY) || atBottom)) {
          if (spacer) {
            spacer.classList.add('active');
            spacerActivated = true;
            await new Promise((res) => setTimeout(res, 100));
            const newContainerTop = container.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: newContainerTop - headerHeight,
              behavior: "smooth"
            });
            await new Promise((res) => setTimeout(res, 500));
            if (spacer && spacerActivated) spacer.classList.remove('active');
            if (originalHeaderScrollListener) {
              window.addEventListener('scroll', originalHeaderScrollListener);
            }
            window.location.href = link;
            return;
          }
        }
        window.scrollTo({
          top: containerTop - headerHeight,
          behavior: "smooth"
        });
        await new Promise((res) => setTimeout(res, 500));
      }
      if (spacer && spacerActivated) spacer.classList.remove('active');
      if (originalHeaderScrollListener) {
        window.addEventListener('scroll', originalHeaderScrollListener);
      }
      window.location.href = link;
    }
  };
  
  const isExternal = link && !link.startsWith("/");

  return (
    <a
      ref={buttonRef}
      href={link}
      onClick={handleClick}
      className="inline-block px-6 py-2 bg-[var(--palette-2)] text-white rounded-xl text-base font-bold no-underline shadow-md transition-all duration-200 ease-in-out hover:bg-[var(--palette-3)] hover:scale-105 active:scale-95"
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {text}
    </a>
  );
}
