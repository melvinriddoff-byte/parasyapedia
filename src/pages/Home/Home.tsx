import { CtaBand } from '@/components/ui/CtaBand/CtaBand';
import { ClientsStrip } from './sections/ClientsStrip/ClientsStrip';
import { Hero } from './sections/Hero/Hero';
import { Process } from './sections/Process/Process';
import { Ticker } from './sections/Ticker/Ticker';
import { WhatWeMake } from './sections/WhatWeMake/WhatWeMake';

/** One job: get the visitor to send a brief. Testimonials return here once real, permissioned quotes exist. */
export function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Process />
      <WhatWeMake />
      <ClientsStrip />
      <CtaBand lines={['Got a product?', 'Send a brief.']} label="Send a brief" direct />
    </>
  );
}
