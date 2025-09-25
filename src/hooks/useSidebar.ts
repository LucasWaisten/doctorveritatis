import { useState, useEffect } from 'react';

interface UseSidebarOptions {
  defaultOpen?: boolean;
  mobileDefaultOpen?: boolean;
  breakpoint?: number;
}

export function useSidebar({
  defaultOpen = true,
  mobileDefaultOpen = false,
  breakpoint = 768
}: UseSidebarOptions = {}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < breakpoint;
      setIsMobile(mobile);
      
      if (mobile) {
        setIsOpen(mobileDefaultOpen);
      } else {
        setIsOpen(defaultOpen);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [defaultOpen, mobileDefaultOpen, breakpoint]);

  const toggle = () => setIsOpen(!isOpen);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    isMobile,
    toggle,
    open,
    close
  };
}
