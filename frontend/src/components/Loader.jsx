import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const STATUS_STEPS = ["Initializing", "Loading modules", "Connecting DB", "Ready"];

const Loader = ({ onComplete }) => {
  const rootRef = useRef(null);
  const circleRef = useRef(null);
  const boltIconRef = useRef(null);
  const boltWrapRef = useRef(null);
  const brandRef = useRef(null);
  const barTrackRef = useRef(null);
  const barFillRef = useRef(null);
  const statusRef = useRef(null);
  const cornersRef = useRef([]);
  const mp1Ref = useRef(null);
  const mp2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      spawnParticles();
      runTimeline();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const spawnParticles = () => {
    const root = rootRef.current;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      const size = Math.random() * 3 + 1.5;
      Object.assign(p.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#eab308",
        top: "50%",
        left: "50%",
        pointerEvents: "none",
        opacity: 0,
        zIndex: 1,
      });
      root.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 110;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      const delay = 0.9 + Math.random() * 0.3;

      gsap.fromTo(
        p,
        { x: 0, y: 0, opacity: 0, scale: 0 },
        {
          x: tx,
          y: ty,
          opacity: Math.random() * 0.55 + 0.15,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          delay,
          onComplete: () => {
            gsap.to(p, {
              opacity: 0,
              y: ty - 20,
              duration: 1.2 + Math.random() * 0.6,
              ease: "power1.in",
              delay: Math.random() * 0.4,
              onComplete: () => p.remove(),
            });
          },
        }
      );
    }
  };

  const runTimeline = () => {
    const circle = circleRef.current;
    const CIRCUMFERENCE = 2 * Math.PI * 34;

    gsap.set(circle, { strokeDashoffset: CIRCUMFERENCE });

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          gsap.to(rootRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: onComplete,
          });
        }
      },
    });

    tl
      .to(cornersRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.06,
      })

      .to([mp1Ref.current, mp2Ref.current], {
        opacity: 1,
        duration: 0.4,
        ease: "power1.out",
      }, "-=0.1")

      .fromTo(
        boltWrapRef.current,
        { scale: 0.5, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: "back.out(1.8)" },
        "-=0.1"
      )

      .to(circle, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
      }, "-=0.3")

      .to(boltIconRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(2)",
      })

      .fromTo(
        boltIconRef.current,
        { scale: 1 },
        { scale: 1.18, yoyo: true, repeat: 1, duration: 0.18, ease: "power1.inOut" }
      )

      .fromTo(
        brandRef.current,
        { opacity: 0, y: 14, letterSpacing: "0.2em" },
        { opacity: 1, y: 0, letterSpacing: "-0.04em", duration: 0.55, ease: "power3.out" },
        "-=0.1"
      )

      .to(barTrackRef.current, { opacity: 1, duration: 0.3 }, "-=0.2")

      .to(statusRef.current, { opacity: 1, duration: 0.25 }, "-=0.1")

      .to(barFillRef.current, {
        width: "33%",
        duration: 0.45,
        ease: "power2.out",
        onStart: () => {
          if (statusRef.current) statusRef.current.textContent = STATUS_STEPS[1];
        },
      })

      .to(barFillRef.current, {
        width: "66%",
        duration: 0.45,
        ease: "power2.out",
        onStart: () => {
          if (statusRef.current) statusRef.current.textContent = STATUS_STEPS[2];
        },
      })

      .to(barFillRef.current, {
        width: "100%",
        duration: 0.5,
        ease: "power3.out",
        onStart: () => {
          if (statusRef.current) statusRef.current.textContent = STATUS_STEPS[3];
        },
      })

      .to(boltIconRef.current, {
        rotation: 15,
        yoyo: true,
        repeat: 3,
        duration: 0.08,
        ease: "none",
      })

      .to(
        brandRef.current,
        { scale: 1.04, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.inOut" },
        "-=0.2"
      )

      .to([mp1Ref.current, mp2Ref.current], { opacity: 0, duration: 0.3 }, "+=0.2");
  };

  return (
    <div
      ref={rootRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      {[
        { top: 20, left: 20, borderWidth: "1px 0 0 1px" },
        { top: 20, right: 20, borderWidth: "1px 1px 0 0" },
        { bottom: 20, left: 20, borderWidth: "0 0 1px 1px" },
        { bottom: 20, right: 20, borderWidth: "0 1px 1px 0" },
      ].map((style, i) => (
        <div
          key={i}
          ref={(el) => (cornersRef.current[i] = el)}
          style={{
            position: "absolute",
            width: 14,
            height: 14,
            borderColor: "rgba(234,179,8,0.18)",
            borderStyle: "solid",
            opacity: 0,
            ...style,
          }}
        />
      ))}

      <span
        ref={mp1Ref}
        style={{
          position: "absolute",
          top: 36,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(234,179,8,0.3)",
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        Loading systems
      </span>
      <span
        ref={mp2Ref}
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(234,179,8,0.3)",
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        MERN Stack
      </span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          ref={boltWrapRef}
          style={{
            position: "relative",
            width: 72,
            height: 72,
            marginBottom: 32,
            opacity: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1.5px solid rgba(234,179,8,0.18)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: "50%",
              border: "1px solid rgba(234,179,8,0.1)",
            }}
          />
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            viewBox="0 0 72 72"
            fill="none"
          >
            <circle
              ref={circleRef}
              cx="36"
              cy="36"
              r="34"
              stroke="#eab308"
              strokeWidth="1.5"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={`${2 * Math.PI * 34}`}
              strokeLinecap="round"
            />
          </svg>
          <svg
            ref={boltIconRef}
            viewBox="0 0 24 24"
            fill="#eab308"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 28,
              height: 28,
              opacity: 0,
            }}
          >
            <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
          </svg>
        </div>

        <div
          ref={brandRef}
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#fff",
            opacity: 0,
            marginBottom: 28,
            whiteSpace: "nowrap",
          }}
        >
          Fitness<span style={{ color: "#eab308", fontStyle: "italic" }}>Tracker</span>
        </div>

        <div
          ref={barTrackRef}
          style={{
            width: 220,
            height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
            overflow: "hidden",
            marginBottom: 16,
            opacity: 0,
          }}
        >
          <div
            ref={barFillRef}
            style={{
              height: "100%",
              width: "0%",
              background: "#eab308",
              borderRadius: 2,
            }}
          />
        </div>

        <span
          ref={statusRef}
          style={{
            fontFamily: "system-ui, sans-serif",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            opacity: 0,
          }}
        >
          {STATUS_STEPS[0]}
        </span>
      </div>
    </div>
  );
};

export default Loader;