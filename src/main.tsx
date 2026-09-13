import { StrictMode, useEffect, useId, useState, type FocusEvent, type MouseEvent, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

interface ApplicationDefinition {
  id: string;
  shortcut: number;
  name: string;
  description: string;
  url?: string;
  enabled: boolean;
  category: string;
}

const applications: ApplicationDefinition[] = [
  {
    id: 'cesa',
    shortcut: 1,
    name: 'Controle de Ativos',
    description: 'Controle de entrada e saída de ativos.',
    url: 'https://cesa.nexeron.online',
    enabled: true,
    category: 'Operação',
  },
  {
    id: 'inventario',
    shortcut: 2,
    name: 'Inventário',
    description: 'Organização e acompanhamento de coletores.',
    url: 'https://gc.nexeron.online',
    enabled: false,
    category: 'Operação',
  },
];

function HelpTooltip({ content, label, onClick }: { content: string; label: string; onClick?: (event: MouseEvent<HTMLButtonElement>) => void }) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  function closeWhenFocusLeaves(event: FocusEvent<HTMLSpanElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
  }

  return (
    <span className="help-tooltip help-tooltip--top" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onBlur={closeWhenFocusLeaves}>
      <button type="button" className="help-dot" aria-label={label} aria-expanded={open} aria-describedby={open ? tooltipId : undefined} onFocus={() => setOpen(true)} onClick={(event) => { setOpen(true); onClick?.(event); }}>i</button>
      {open && <span id={tooltipId} className="help-tooltip__content" role="tooltip">{content}</span>}
    </span>
  );
}

function useApplicationShortcuts() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return;
      if (event.target instanceof HTMLElement && event.target.isContentEditable) return;

      const application = applications.find((item) => item.shortcut === Number(event.key));
      if (!application || !application.enabled || !application.url) return;
      event.preventDefault();
      window.location.assign(application.url);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

function BrandMark() {
  return <div className="brand-mark brand-mark--compact"><div className="brand-mark__symbol"><img src="/Imagens/logo_pumacajamar.png" alt="Gestão Puma Cajamar" /></div><div><div className="brand-mark__title">GESTÃO PUMA</div><div className="brand-mark__place">CAJAMAR</div></div></div>;
}

function PartnerLogos() {
  return <div className="partner-logos" aria-label="Marcas do ecossistema"><div className="partner-logos__puma"><img src="/Imagens/logo_puma.png" alt="Puma" /></div><span className="partner-logos__divider" aria-hidden="true" /><img className="partner-logos__intralog" src="/Imagens/logo_intralog.png" alt="Intralog" /></div>;
}

function ApplicationCard({ application }: { application: ApplicationDefinition }) {
  const content = <><span className="application-card__number" aria-label={`Atalho ${application.shortcut}`}>{application.shortcut}</span><span className="application-card__separator" aria-hidden="true" /><div className="application-card__body"><div><p className="application-card__category">{application.category}</p><h2>{application.name}</h2></div>{application.enabled ? <HelpTooltip content={application.description} label={`Informações sobre ${application.name}`} onClick={(event) => { event.preventDefault(); event.stopPropagation(); }} /> : <span className="application-card__coming-soon">Em breve</span>}</div>{!application.enabled && <span className="application-card__arrow" aria-hidden="true">→</span>}</>;

  if (!application.enabled || !application.url) return <div className="application-card application-card--disabled" role="listitem" aria-disabled="true">{content}</div>;
  return <a className="application-card application-card--active" role="listitem" href={application.url} aria-label={`Abrir ${application.name}`}>{content}</a>;
}

function ApplicationGrid() {
  return <div className="application-list" aria-label="Aplicações disponíveis" role="list">{applications.map((application) => <ApplicationCard key={application.id} application={application} />)}{[3, 4].map((shortcut) => <div className="application-card application-card--placeholder" role="listitem" aria-disabled="true" key={shortcut}><span className="application-card__number">{shortcut}</span><span className="application-card__separator" aria-hidden="true" /><span className="application-card__placeholder-label">Nova aplicação</span><span className="application-card__arrow" aria-hidden="true">→</span></div>)}</div>;
}

function PortalArtwork() {
  return <aside className="portal-artwork" aria-label="Identidade visual Puma"><div className="portal-artwork__grid" aria-hidden="true" /><div className="portal-artwork__diagonal portal-artwork__diagonal--one" aria-hidden="true" /><div className="portal-artwork__diagonal portal-artwork__diagonal--two" aria-hidden="true" /><div className="portal-artwork__glow" aria-hidden="true" /><img className="portal-artwork__panther" src="/Imagens/pantera_cesa.png" alt="" /><div className="portal-artwork__caption"><span>FORÇA</span><span>EM CADA</span><span>OPERAÇÃO.</span><i aria-hidden="true" /></div></aside>;
}

function PortalApp() {
  useApplicationShortcuts();
  return <div className="app-shell app-shell--portal-home"><header className="site-header"><BrandMark /><PartnerLogos /></header><main><div className="home-page"><div className="portal-home__grid"><section className="portal-home__copy" aria-labelledby="page-title"><div className="eyebrow"><span className="eyebrow__bar" /> Ambiente corporativo</div><h1 id="page-title">Escolha uma<br /><em>aplicação.</em></h1><p className="portal-home__lead">Acesse rapidamente as ferramentas da operação.</p><section className="portal-home__applications" aria-label="Aplicações disponíveis"><ApplicationGrid /></section></section><PortalArtwork /></div></div></main><footer className="site-footer"><div className="site-footer__identity"><span>Gestão Puma Cajamar</span><span className="site-footer__separator" aria-hidden="true" /><span>Portal de aplicações internas</span></div><span className="site-footer__motto">Movimento que entrega mais <i aria-hidden="true" /></span></footer></div>;
}

function ErrorBoundary({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(<StrictMode><ErrorBoundary><PortalApp /></ErrorBoundary></StrictMode>);
