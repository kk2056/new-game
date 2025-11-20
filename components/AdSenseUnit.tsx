import React, { useEffect, useRef } from 'react';
import { AdConfig } from '../types';

interface AdSenseUnitProps {
  config: AdConfig;
  className?: string;
  label?: string; // For debugging/layout visualization
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({ config, className, label }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // In a real environment, we push to adsbygoogle.
    // In a dev environment (localhost) or without a valid domain, this might throw errors or show blank.
    // We wrap it in try-catch to prevent app crashes.
    if (adRef.current && !initialized.current) {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            initialized.current = true;
        } catch (error) {
            console.error("AdSense push error:", error);
        }
    }
  }, [config]);

  return (
    <div className={`w-full overflow-hidden bg-slate-800/50 flex flex-col items-center justify-center border border-slate-700 rounded-lg ${className}`}>
      {/* Label for Visual Debugging - remove in production if desired, though users won't see it if ad loads */}
      <span className="text-xs text-slate-500 py-1 uppercase tracking-widest mb-1">Advertisement ({label})</span>
      
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client={config.client}
        data-ad-slot={config.slot}
        data-ad-format={config.format}
        data-full-width-responsive={config.responsive ? "true" : "false"}
      />
    </div>
  );
};