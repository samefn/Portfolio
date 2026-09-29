import { useState } from 'react';
import { profile } from '../data/profile.js';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { label: 'LinkedIn', icon: 'bi-linkedin', href: profile.social.linkedin, handle: 'santiago-moreno-echeverria' },
    { label: 'GitHub', icon: 'bi-github', href: profile.social.github, handle: 'samefn' },
    { label: 'WhatsApp', icon: 'bi-whatsapp', href: `https://wa.me/${profile.phoneRaw}`, handle: profile.phone },
    { label: 'itch.io', icon: 'bi-controller', href: profile.social.itch, handle: 'samefn' },
  ].filter((c) => c.href);

  return (
    <section id="contacto" className="section section-alt" aria-labelledby="contacto-title">
      <div className="container">
        <div className="contact-panel" data-reveal>
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-lg-7">
              <p className="eyebrow">04 — Contacto</p>
              <h2 id="contacto-title" className="contact-title">
                ¿Tienes un proyecto en mente? <span className="text-gradient">Hablemos.</span>
              </h2>

              <div className="contact-email">
                <a href={`mailto:${profile.email}`} className="email-link">
                  <i className="bi bi-envelope" aria-hidden="true" /> {profile.email}
                </a>
                <button type="button" className="btn-icon" onClick={copyEmail} aria-label="Copiar correo">
                  <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} aria-hidden="true" />
                </button>
                <span className="copy-feedback" role="status">{copied ? 'Correo copiado' : ''}</span>
              </div>
              <a href={`tel:+${profile.phoneRaw}`} className="phone-link">
                <i className="bi bi-telephone" aria-hidden="true" /> {profile.phone}
              </a>
            </div>

            <div className="col-lg-5">
              <div className="brand-card" aria-label="Tarjeta de presentación">
                <img src="/icons/sme-white.svg" alt="Logo SME" className="brand-card-logo" width="220" height="84" />
                <div className="brand-card-info">
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
                <span className="brand-card-stripe" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="row g-3 mt-3">
            {channels.map((c) => (
              <div key={c.label} className="col-12 col-md-6 col-xl-4">
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="channel-card">
                  <i className={`bi ${c.icon}`} aria-hidden="true" />
                  <span>
                    <strong>{c.label}</strong>
                    <small>{c.handle}</small>
                  </span>
                  <i className="bi bi-arrow-up-right ms-auto" aria-hidden="true" />
                  <span className="visually-hidden"> (se abre en una pestaña nueva)</span>
                </a>
              </div>
            ))}
          </div>

          <a href={profile.cv} download className="btn-neon mt-4">
            <i className="bi bi-file-earmark-arrow-down" aria-hidden="true" /> Descargar CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
