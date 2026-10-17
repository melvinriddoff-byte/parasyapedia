import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { siteConfig } from '@/config/site';
import type { BriefPrefill, WorkType } from '@/types';
import { CloseIcon } from '@/components/ui/Icons/Icons';
import { useBodyLock } from '@/hooks/useBodyLock';
import { cx } from '@/utils/cx';
import './BriefForm.css';

type BriefType = WorkType | 'Not sure yet';
type Status = 'idle' | 'sending' | 'sent' | 'failed';
const TYPES: BriefType[] = ['Brand film', 'AI ad', 'Short-form content', 'Not sure yet'];

/**
 * Contact form. Submitting posts the details to the studio inbox through FormSubmit
 * (no backend of our own). If that fails, the visitor falls back to email or copy.
 * Can be pre-filled through router state.
 */
export function BriefForm() {
  const location = useLocation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState<BriefType>('Not sure yet');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  // Pre-fill when arriving from a project modal ("Brief us on this").
  useEffect(() => {
    const prefill = location.state as BriefPrefill | null;
    if (!prefill) return;
    if (prefill.type) setType(prefill.type);
    if (prefill.message !== undefined) {
      setMessage(prefill.message);
      const timer = window.setTimeout(() => {
        const area = messageRef.current;
        if (!area) return;
        area.focus();
        area.setSelectionRange(area.value.length, area.value.length);
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [location.key, location.state]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending') return;
    if (!name.trim()) {
      setError('Add your name so we know who to reply to.');
      return;
    }
    if (!contact.trim()) {
      setError('Add an email or WhatsApp number so we can reply.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New project enquiry: ${type} from ${name.trim()}`,
          _template: 'table',
          _captcha: 'false',
          Name: name.trim(),
          Contact: contact.trim(),
          'Project type': type,
          Idea: message.trim() || '(No brief yet)',
        }),
      });
      const result = (await response.json()) as { success?: boolean | string };
      const ok = response.ok && String(result.success) === 'true';
      setStatus(ok ? 'sent' : 'failed');
      if (ok) {
        setName('');
        setContact('');
        setMessage('');
        setType('Not sure yet');
      }
    } catch {
      setStatus('failed');
    }
  };

  const open = status !== 'idle';
  const closePopup = () => {
    if (status !== 'sending') setStatus('idle');
  };

  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, status]);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="brief-name">Your name</label>
        <input
          type="text"
          id="brief-name"
          autoComplete="name"
          placeholder="Anjali Menon"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="brief-contact">Email or WhatsApp</label>
        <input
          type="text"
          id="brief-contact"
          autoComplete="email"
          placeholder="you@brand.com or +91 …"
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      </div>
      <div className="field">
        <span className="lbl" id="brief-type-label">
          What do you need?
        </span>
        <div className="types" role="radiogroup" aria-labelledby="brief-type-label">
          {TYPES.map((option, index) => (
            <span key={option} className="type-option">
              <input
                type="radio"
                name="type"
                id={`brief-type-${index}`}
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
              />
              <label htmlFor={`brief-type-${index}`}>{option}</label>
            </span>
          ))}
        </div>
      </div>
      <div className="field">
        <label htmlFor="brief-message">Your idea</label>
        <textarea
          id="brief-message"
          ref={messageRef}
          placeholder="What is the product, who is it for, and where will the ad play?"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <p className="err" role="alert">
        {error}
      </p>
      <div>
        <Button type="submit" variant="dark">
          Send
        </Button>
      </div>
      <div
        className={cx('bf-modal', open && 'open')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bf-popup-title"
        aria-hidden={!open}
        onClick={(event) => {
          if (event.target === event.currentTarget) closePopup();
        }}
      >
        <div className="bf-dialog" aria-live="polite">
          {status !== 'sending' && (
            <button
              type="button"
              className="bf-close"
              ref={closeRef}
              aria-label="Close"
              onClick={closePopup}
            >
              <CloseIcon />
            </button>
          )}
          <span className="spaced">
            {status === 'sent' ? 'Sent' : status === 'failed' ? 'Not sent' : 'Sending'}
          </span>
          <h3 id="bf-popup-title">
            {status === 'sent'
              ? 'Thank you. Your brief is in.'
              : status === 'failed'
                ? 'That did not go through.'
                : 'Sending your brief…'}
          </h3>
          <p>
            {status === 'sent'
              ? 'It has reached our inbox. We will reply on the contact you gave us.'
              : status === 'failed'
                ? `Please try again, or write to us at ${siteConfig.email}.`
                : 'Hold on a moment.'}
          </p>
        </div>
      </div>
    </form>
  );
}
