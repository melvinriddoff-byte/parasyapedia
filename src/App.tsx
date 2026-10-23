import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout/Layout';
import { ProjectModalProvider } from '@/context/ProjectModalContext';
import { ToastProvider } from '@/context/ToastContext';
import { TransitionProvider } from '@/context/TransitionContext';
import { About } from '@/pages/About/About';
import { Contact } from '@/pages/Contact/Contact';
import { Home } from '@/pages/Home/Home';
import { NotFound } from '@/pages/NotFound/NotFound';
import { Services } from '@/pages/Services/Services';
import { Testimonials } from '@/pages/Testimonials/Testimonials';
import { Works } from '@/pages/Works/Works';

/**
 * Providers wrap the router tree:
 *   Toast         small messages ("Brief copied")
 *   Transition    the orange "scene cut" between pages
 *   ProjectModal  the project details dialog
 */
export function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <TransitionProvider>
          <ProjectModalProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="products" element={<Navigate to="/services" replace />} />
                <Route path="works" element={<Works />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ProjectModalProvider>
        </TransitionProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
