import { TitleReveal } from '@/components/ui/TitleReveal/TitleReveal';
import { DirectorViewfinder } from './DirectorViewfinder/DirectorViewfinder';
import './Process.css';

const STEPS = [
  {
    who: 'You send',
    title: 'a short brief',
    text: 'A few lines about the product and the moment, plus product photos or a logo. No finished brief needed.',
  },
  {
    who: 'We write',
    title: 'the prompt and storyboard',
    text: 'A director turns your brief into prompts and a frame-by-frame storyboard for the film, ad or reel.',
  },
  {
    who: 'You approve',
    title: 'the frames',
    text: 'Every frame is checked against your real pack, colours and logo. Nothing moves to the cut until you sign it off.',
  },
  {
    who: 'We deliver',
    title: 'the final cut',
    text: 'Sized for Reels, feeds and web, with captions or voice in Malayalam, Hindi, Tamil, Arabic or English.',
  },
];

/** How a brief becomes a film: the four stages, each heading opening with who owns that stage. */
export function Process() {
  return (
    <section className="sec s-light process">
      <div className="wrap">
        <div className="process-head">
          <div>
            <TitleReveal lines={['From brief', 'to final cut.']} className="h2" />
            <p className="lede">
              AI generates every shot. A person directs the look, and you approve each stage before the next
              one starts.
            </p>
          </div>
          <figure className="process-vf">
            <DirectorViewfinder />
            <figcaption>Illustrated concept</figcaption>
          </figure>
        </div>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li key={step.who}>
              <span className="step-n" aria-hidden="true">
                {index + 1}
              </span>
              <h3>
                {step.who} {step.title}
              </h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
