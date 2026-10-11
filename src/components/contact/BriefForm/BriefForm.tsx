import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button/Button';
import { siteConfig, whatsappUrl } from '@/config/site';
import { useToast } from '@/context/ToastContext';
import type { BriefPrefill, WorkType } from '@/types';
import { copyText } from '@/utils/clipboard';
import './BriefForm.css';

type BriefType = WorkType | 'Not sure yet';
const TYPES: BriefType[] = ['Brand film', 'AI ad', 'Short-form content', 'Not sure yet'];

/**
 * Contact form with no backend: it prepares the brief and lets the visitor send it
 * by email or WhatsApp (or copy it). Can be pre-filled through router state.
 */
export function BriefForm() {
  const location = useLocation();
  const toast = useToast();
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState<BriefType>('Not sure yet');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [brief, setBrief] = useState<string | null>(null);

  // Pre-fill when arriving from a project modal ("Brief us on this").
  useEffect(() => {
    const prefill = location.state as BriefPrefill | null;
    if (!prefill) return;
    if (prefill.type) setType(prefill.type);
    if (prefill.message !== undefined) {
      setMessage(prefill.message);
      setBrief(null);
      const timer = window.setTimeout(() => {
        const area = messageRef.current;
        if (!area) return;
        area.focus();
        area.setSelectionRange(area.value.length, area.value.length);
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [location.key, location.state]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      setError('Add your name so we know who to reply to.');
      return;
    }
    if (!contact.trim()) {
      setError('Add an email or WhatsApp number so we can reply.');
      return;
    }
    setError('');
    setBrief(
      `Hi ${siteConfig.name},\n\nI am ${name.trim()}.\nProject type: ${type}\n\n${
        message.trim() || '(No brief yet. Let us talk.)'
      }\n\nReach me on: ${contact.trim()}`,
    );
  };

  const copyBrief = async () => {
    const ok = await copyText(brief ?? '');
    toast(ok ? 'Brief copied' : 'Could not copy. Use the email button.');
  };

  if (brief !== null) {
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `New project: ${type}`,
    )}&body=${encodeURIComponent(brief)}`;

    return (
      <div className="result" aria-live="polite">
        <h3>Your brief is ready.</h3>
        <p>Choose how to send it to us.</p>
        <div className="result-actions">
          <Button href={mailto}>Send by email</Button>
          {whatsappUrl && (
            <Button href={`${whatsappUrl}?text=${encodeURIComponent(brief)}`} variant="line">
              Send on WhatsApp
            </Button>
          )}
          <Button variant="line" onClick={copyBrief}>
            Copy brief
          </Button>
          <Button variant="line" onClick={() => setBrief(null)}>
            Edit brief
          </Button>
        </div>
      </div>
    );
  }

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
          Prepare my brief
        </Button>
      </div>
    </form>
  );
}
