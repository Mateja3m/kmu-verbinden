import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import News from '../News';
import { vi } from 'vitest';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => ({
          not: () => ({
            data: [
              {
                id: '1',
                title: 'Test News 1',
                content: 'Test content 1',
                slug: 'test-news-1',
                published_at: '2024-01-01T00:00:00Z',
                meta_description: 'Test description 1',
                image_url: 'test1.jpg'
              },
              {
                id: '2',
                title: 'Test News 2',
                content: 'Test content 2',
                slug: 'test-news-2',
                published_at: '2024-01-02T00:00:00Z',
                meta_description: 'Test description 2',
                image_url: 'test2.jpg'
              }
            ],
            error: null
          })
        })
      })
    })
  }
}));

// Mock Navigation and Footer components
vi.mock('@/components/Navigation', () => ({
  default: () => <div data-testid="navigation">Navigation</div>
}));

vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

describe('News Page', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderNews = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <News />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient.clear();
  });

  it('renders the news page with header', async () => {
    renderNews();
    expect(screen.getByText('KMU News')).toBeInTheDocument();
    expect(screen.getByText('Aktuelle Nachrichten und Insights für Schweizer KMU')).toBeInTheDocument();
  });

  it('renders navigation and footer', () => {
    renderNews();
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('displays news posts', async () => {
    renderNews();
    const post1 = await screen.findByText('Test News 1');
    const post2 = await screen.findByText('Test News 2');
    expect(post1).toBeInTheDocument();
    expect(post2).toBeInTheDocument();
  });

  it('displays meta descriptions', async () => {
    renderNews();
    const description1 = await screen.findByText('Test description 1');
    const description2 = await screen.findByText('Test description 2');
    expect(description1).toBeInTheDocument();
    expect(description2).toBeInTheDocument();
  });

  it('formats dates correctly', async () => {
    renderNews();
    // Note: The actual formatted date string will depend on the locale
    const date = await screen.findByText(/Januar 2024/);
    expect(date).toBeInTheDocument();
  });
});