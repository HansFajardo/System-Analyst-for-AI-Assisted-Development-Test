// fetchFlashcards.js
import { supabase } from '../supabaseClient';

export async function fetchFlashcards() {
  const [flashcards, setFlashcards] = useState([]);

  const { data, error } = await supabase
    .from('flashcards')
    .select('*');

  if (error) {
    console.error('Error fetching flashcards:', error);
    return [];
  }

  return data;
}
