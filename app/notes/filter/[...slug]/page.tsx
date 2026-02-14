import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client';

interface Props {
  params: {
    slug?: string[];
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = params;

  const selectedTag = slug?.[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, selectedTag ?? 'all'],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        
        tag: selectedTag === 'all' ? undefined : selectedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
